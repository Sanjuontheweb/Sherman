## The feel

Sherman is an online store that is calm and uncluttered. There are no banner walls or crowded grids, just a small set of products shown with room around them. The warm cream-and-dark-wine palette keeps things easy on the eyes, and one coral accent marks what matters: the price, the add-to-list button, the next step.

Opening a product gives you a large image, a clear name and price, and little else. Tracking an order is just as plain, with a progress bar and a line. Sellers get the same treatment, with a dashboard that fits on one screen and a short, guided form for listing a product.

And an Admin account to ride through the website with ease.

## 🚀 Features & Functionality

* **Full-Stack Product Creation** 
  Sellers can upload new products through a dedicated form that handles text, numerical data, and image files simultaneously. The frontend parses complex data (like keyword arrays and rating objects) into `FormData`, which is securely processed and saved by the backend.
* **Interactive Seller Dashboard**
  A personalized portal where sellers can manage their inventory. It features a custom-built, responsive product carousel that uses CSS transforms and local state management for smooth, GPU-accelerated horizontal sliding between product cards.
* **Secure Data Isolation** 
  Products are strictly bound to their creators. The system silently injects the seller's unique `uid` (via local storage) into upload payloads, ensuring that when a seller logs into their dashboard, the backend filters the data so they only ever see their own items.

## 🛠️ Technical Implementation

* **Backend (Node.js / Express):** 
It should first connect to a mongodb cluster, for the app to start working.
  * Uses `multer` for handling `multipart/form-data` and securely routing uploaded images to a public static folder.
  * Employs ES Module path resolution to correctly serve static assets across different router files.
  * Utilizes a lightweight, local JSON-based database (`products.json`, `users.json`) with strict parsing and error handling for persistent storage.
* **Frontend (TypeScript / Vanilla JS):** 
  * Class-based component architecture (`SellProduct.ts`, `SellerDashboard.ts`) for modular DOM rendering and event binding.
  * Client-side validation for file types (enforcing `.png`) and dynamic UI updates without page reloads.
  * Custom state tracking (`currentIndex`) to synchronize the DOM viewport, sidebar lists, and navigation buttons for the carousel interface.

* **Authentication & Role Management**
Integrated with Firebase Authentication for secure user registration and login. Client-side sessions are managed via `localStorage` (tracking the user's `role`), which acts as a gatekeeper to protect restricted routes like the dashboard.
* **Synchronized User Database**
Upon successful Firebase registration, user profiles and roles are automatically synchronized with a lightweight backend database (`users.json`), enabling role-based access control (such as isolating seller data from standard users or admins).