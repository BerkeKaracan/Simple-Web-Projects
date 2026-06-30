# Premium Contact Form (PHP & JS)

A modern, split-layout contact form demonstrating basic client-server communication. The frontend is built with Vanilla JavaScript and Tailwind CSS (via CDN), while the backend relies on a simple PHP script to process form submissions.

## Features

- **Modern UI:** Split-layout design with glassmorphism elements and gradient backgrounds.
- **Asynchronous Submission:** Uses the Fetch API to send data without reloading the page.
- **Backend Validation:** Basic PHP script to catch POST requests and return JSON responses.
- **Dynamic Feedback:** Loading states and success/error messages handled via JavaScript.

## ⚠️ Important Note Regarding Deployment

This project contains traditional server-side scripting (`process.php`). Therefore, it **will not function fully** on serverless hosting platforms like Vercel, Netlify, or GitHub Pages. It requires a standard PHP environment (like Apache, Nginx, or a local PHP server) to process the form data.

## Local Development

To run and test this project locally, open your terminal in the project directory and start the built-in PHP server:

```bash
php -S localhost:8000
```

Then, open http://localhost:8000 in your browser.
