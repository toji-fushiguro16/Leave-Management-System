// ===== Constants =====
const STORAGE_KEY = 'leaveRequests';

// ===== DOM Elements =====
const leaveForm = document.getElementById('leaveForm');
const leaveTableBody = document.getElementById('leaveTableBody');
const emptyMessage = document.getElementById('emptyMessage');
const formMessage = document.getElementById('formMessage');

// Dashboard counters
const totalCount = document.getElementById('totalCount');
const approvedCount = document.getElementById('approvedCount');
const pendingCount = document.getElementById('pendingCount');
const rejectedCount = document.getElementById('rejectedCount');

// ===== LocalStorage Helpers =====

// Load all leave requests from localStorage
function getLeaveRequests() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save leave requests to localStorage
function saveLeaveRequests(requests) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

// Generate a unique ID for each request
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ===== Validation =====

// Check that all form fields are filled and dates are valid
function validateForm(formData) {
  const fields = ['employeeName', 'employeeId', 'leaveType', 'startDate', 'endDate', 'reason'];

  for (const field of fields) {
    if (!formData[field] || formData[field].trim() === '') {
      return { valid: false, message: 'Please fill in all fields.' };
    }
  }

  if (formData.endDate < formData.startDate) {
    return { valid: false, message: 'End date cannot be before start date.' };
  }

  return { valid: true, message: '' };
}

// Show a message below the form (success or error)
function showFormMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = 'message ' + type;

  // Clear message after 3 seconds
  setTimeout(function () {
    formMessage.textContent = '';
    formMessage.className = 'message';
  }, 3000);
}

// ===== CRUD Operations =====

// Add a new leave request
function addLeaveRequest(formData) {
  const requests = getLeaveRequests();

  const newRequest = {
    id: generateId(),
    employeeName: formData.employeeName.trim(),
    employeeId: formData.employeeId.trim(),
    leaveType: formData.leaveType,
    startDate: formData.startDate,
    endDate: formData.endDate,
    reason: formData.reason.trim(),
    status: 'Pending'
  };

  requests.unshift(newRequest);
  saveLeaveRequests(requests);
}

// Update the status of a leave request
function updateStatus(id, newStatus) {
  const requests = getLeaveRequests();
  const request = requests.find(function (r) { return r.id === id; });

  if (request) {
    request.status = newStatus;
    saveLeaveRequests(requests);
  }
}

// Delete a leave request
function deleteLeaveRequest(id) {
  const requests = getLeaveRequests();
  const filtered = requests.filter(function (r) { return r.id !== id; });
  saveLeaveRequests(filtered);
}

// ===== Dashboard =====

// Update the dashboard stat cards
function updateDashboard() {
  const requests = getLeaveRequests();

  totalCount.textContent = requests.length;
  approvedCount.textContent = requests.filter(function (r) { return r.status === 'Approved'; }).length;
  pendingCount.textContent = requests.filter(function (r) { return r.status === 'Pending'; }).length;
  rejectedCount.textContent = requests.filter(function (r) { return r.status === 'Rejected'; }).length;
}

// ===== Table Rendering =====

// Build the HTML for a single table row
function createTableRow(request) {
  const row = document.createElement('tr');

  const isPending = request.status === 'Pending';

  row.innerHTML =
    '<td>' + escapeHtml(request.employeeName) + '</td>' +
    '<td>' + escapeHtml(request.employeeId) + '</td>' +
    '<td>' + escapeHtml(request.leaveType) + '</td>' +
    '<td>' + request.startDate + '</td>' +
    '<td>' + request.endDate + '</td>' +
    '<td>' + escapeHtml(request.reason) + '</td>' +
    '<td><span class="status status-' + request.status.toLowerCase() + '">' + request.status + '</span></td>' +
    '<td class="actions">' +
      '<button class="btn btn-approve" data-action="approve" data-id="' + request.id + '"' +
        (isPending ? '' : ' disabled') + '>Approve</button>' +
      '<button class="btn btn-reject" data-action="reject" data-id="' + request.id + '"' +
        (isPending ? '' : ' disabled') + '>Reject</button>' +
      '<button class="btn btn-delete" data-action="delete" data-id="' + request.id + '">Delete</button>' +
    '</td>';

  return row;
}

// Prevent HTML injection in displayed text
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Render the full leave requests table
function renderTable() {
  const requests = getLeaveRequests();
  leaveTableBody.innerHTML = '';

  if (requests.length === 0) {
    emptyMessage.classList.remove('hidden');
    return;
  }

  emptyMessage.classList.add('hidden');

  requests.forEach(function (request) {
    leaveTableBody.appendChild(createTableRow(request));
  });
}

// Refresh both the table and dashboard
function refreshUI() {
  renderTable();
  updateDashboard();
}

// ===== Event Handlers =====

// Handle form submission
leaveForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = {
    employeeName: document.getElementById('employeeName').value,
    employeeId: document.getElementById('employeeId').value,
    leaveType: document.getElementById('leaveType').value,
    startDate: document.getElementById('startDate').value,
    endDate: document.getElementById('endDate').value,
    reason: document.getElementById('reason').value
  };

  const validation = validateForm(formData);

  if (!validation.valid) {
    showFormMessage(validation.message, 'error');
    return;
  }

  addLeaveRequest(formData);
  leaveForm.reset();
  showFormMessage('Leave application submitted successfully!', 'success');
  refreshUI();
});

// Handle Approve, Reject, and Delete button clicks (event delegation)
leaveTableBody.addEventListener('click', function (event) {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.getAttribute('data-action');
  const id = button.getAttribute('data-id');

  if (action === 'approve') {
    updateStatus(id, 'Approved');
  } else if (action === 'reject') {
    updateStatus(id, 'Rejected');
  } else if (action === 'delete') {
    if (confirm('Are you sure you want to delete this leave request?')) {
      deleteLeaveRequest(id);
    } else {
      return;
    }
  }

  refreshUI();
});

// ===== Initialize =====
refreshUI();
