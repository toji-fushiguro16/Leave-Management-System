# Leave Management System

A simple, single-page web application to apply for and manage employee leave requests. Built with plain HTML, CSS, and JavaScript — no frameworks or libraries required.

## Features

- **Apply for leave** — Submit requests with employee details, leave type, dates, and reason
- **Form validation** — Ensures all fields are filled and dates are valid
- **Dashboard** — Shows total, approved, pending, and rejected request counts
- **Status management** — Approve or reject pending requests
- **Delete requests** — Remove any leave request from the list
- **Persistent storage** — Data is saved in browser LocalStorage
- **Responsive design** — Works on desktop, tablet, and mobile

## How to Run

### Option 1: Open directly (easiest)
1. Download or clone this project folder.
2. Double-click `index.html` to open it in your browser.
3. No server or installation needed — everything works offline.

### Option 2: Run with a local server
```bash
python -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

### Option 3: Live demo on GitHub Pages
After uploading to GitHub, enable **GitHub Pages** (Settings → Pages → Source: main branch) to get a live URL like:
```
https://your-username.github.io/lms/
```
Share this link with your professor — no download required.

## Upload to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (name it `lms` or `leave-management-system`).
2. Upload these 4 files to the repository:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. Enable **GitHub Pages** for a live demo:
   - Go to **Settings → Pages**
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch and **/ (root)** folder
   - Click **Save**
   - Your live site will be at: `https://YOUR-USERNAME.github.io/lms/`

## Share with Professor

Send your professor:
- **GitHub repo link** — for source code review
- **GitHub Pages link** — for live demo (no download needed)

Example message:
> Here is my Leave Management System project.
> - Source code: https://github.com/YOUR-USERNAME/lms
> - Live demo: https://YOUR-USERNAME.github.io/lms/

## Project Structure

```
lms/
├── index.html    # Main page (form, dashboard, table)
├── style.css     # Styling (blue & white theme)
├── script.js     # Application logic
└── README.md     # This file
```

## Usage

1. Fill in the **Apply for Leave** form with your details.
2. Click **Apply Leave** to submit.
3. View your request in the table below with a **Pending** status.
4. Use **Approve** or **Reject** to change the status.
5. Use **Delete** to remove a request permanently.

## Leave Types

- Casual
- Sick
- Earned

## Technologies Used

- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript (ES5-compatible)
- LocalStorage API

## Browser Support

Works in all modern browsers that support LocalStorage (Chrome, Firefox, Edge, Safari).
