# 📌 Bookmark Saver

A robust, production-ready web application designed to save, manage, and persistently store your favorite web links. Built with a focus on clean code, edge-case handling, and modern React architectures using Next.js.

## 🌍 Live Demo & Deployment

This project is seamlessly deployed on **Vercel** with CI/CD integration.  
**Check out the live application:** [Bookmark Saver Live](#) *(Replace with your actual Vercel link)*

---

## ✨ Core Features & Technical Highlights

- **Persistent Client-Side Storage:** Utilizes browser `localStorage` to ensure data retention across sessions, providing a seamless user experience without requiring a backend database.
- **Hydration Error Mitigation:** Next.js Server-Side Rendering (SSR) often conflicts with client-side APIs like `localStorage`. This project implements a custom `isMounted` lifecycle pattern to flawlessly bridge SSR and CSR, entirely eliminating React hydration mismatches.
- **Smart URL Sanitization:** Automatically parses user input. If a user enters a domain without a protocol (e.g., `google.com`), the system automatically prepends `https://`, preventing broken application states and faulty anchor tags.
- **Secure External Routing:** Implements strict security measures for external links by combining `target="_blank"` with `rel="noopener noreferrer"`, protecting the application against reverse tabnabbing vulnerabilities.
- **Dynamic State Management:** Real-time UI rendering and state mutations for adding, filtering, and removing bookmarks without page reloads.

## 🛠️ Tech Stack

- **Core:** [Next.js](https://nextjs.org/) (App Router architecture)
- **Library:** [React](https://react.dev/) (Functional Components, Hooks)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type checking and interfaces)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first responsive design)
- **Linting:** ESLint & Next.js Core Vitals

---

## 🚀 Local Development Setup

To run this project locally, execute the following commands in your terminal:

```bash
# 1. Clone the repository
git clone [https://github.com/BerkeKaracan/Simple-Web-Projects.git]

# 2. Navigate to the workspace
cd bookmark-saver

# 3. Install dependencies (npm or pnpm)
npm install

# 4. Start the development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🧠 Architecture Decisions & Developer Notes

**Why the `isMounted` pattern?**
During the development phase, reading from `localStorage` directly inside the initial state or a synchronous effect caused Next.js to throw a `Hydration failed` error because the server HTML did not match the client HTML. By introducing an `isMounted` boolean state and conditionally rendering the main tree (or delaying the fetch), we enforce that the component only reads browser-specific APIs after the initial mount, keeping the React tree perfectly synced.

**URL Validation:**
Instead of forcing the user to type perfect URLs and showing annoying error messages, the application takes a "UX-first" approach by silently correcting the input format under the hood before pushing it to the state array.