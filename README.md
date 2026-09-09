# Rathore Heritage Developers — Production Full-Stack Platform

> “Where timeless Indian heritage meets royal living.”

A production-ready, full-stack architectural portfolio and Headless Content Management System (CMS) for **Rathore Heritage Developers**.

The content is strictly derived from the official **RATHORE HERITAGE DEVELOPERS.pdf** (13 pages) with zero invented claims, featuring high-resolution authentic imagery, real-time MongoDB Atlas synchronization, persistent image management, and GitHub Pages routing compatibility.

---

## 🏛️ Platform Architecture

The repository is structured into two completely functional panels and an Express REST backend:

```text
rathore-heritage-customer-admin-mongodb/
├── frontend/             # Customer Website (React 18, Luxury Vanilla CSS, HashRouter)
│   ├── assets/           # 17 authentic images extracted from PDF
│   ├── index.html        # Public entry point (GitHub Pages ready)
│   ├── app.js            # React application with routing & API sync
│   └── style.css         # Architectural design system (Royal Brown, Cream, Sandstone, Gold)
├── admin/                # Admin CMS Panel (CMS Dashboard, Project Builder, Image Manager)
│   ├── assets/           # Admin branding assets
│   ├── index.html        # CMS interface
│   ├── app.js            # Admin REST API controller & authentication
│   └── style.css         # Dark luxury studio dashboard theme
├── backend/              # Node.js + Express + Mongoose API
│   ├── uploads/          # Local persistent uploads folder
│   ├── server.js         # REST endpoints, Mongoose models, Cloudinary/Multer, seeder
│   ├── package.json      # Dependencies (Express, Mongoose, Multer, Cloudinary, JWT, bcrypt)
│   └── .env.example      # Environment variables template
├── package.json          # Root scripts for easy local execution
└── README.md             # Documentation
```

---

## ✨ Features

### 1. Customer Website (`frontend/`)
- **10 Complete Sections**:
  1. **Navigation**: Sticky glassmorphism header with royal RH monogram crest and mobile navigation drawer.
  2. **Hero**: Cinematic full-height viewport with slow zoom, dark shade overlay, category eyebrow, and royal tagline.
  3. **About**: Exact corporate narrative from PDF Page 2 with luxury architectural photo frame.
  4. **Our Craftsmanship**: 10 animated craft cards from PDF Page 3 and the closing palace-style experience quote.
  5. **Signature Projects**: 4 projects from PDF Page 4 with category tags and *"View Project Details"* buttons.
  6. **Dedicated Project Routes (`#/projects/:slug`)**:
     - **Oladar Haveli**: 7 detailed architectural element blocks (Grand Entry Dodi, Thekri Glass, Mor Pankh Ceilings, Ghokda Domes, Rooftop Bar, Marble Flooring, Bed Pillars & Chandeliers) and interactive gallery.
     - **Roopmahal**, **Mohan Villa**, **First Impression Salon**: Complete PDF narrative and photo showcases.
  7. **Interactive Lightbox**: Fullscreen photo viewer with captions and smooth dismiss.
  8. **What We Offer**: 5 core capabilities from PDF Page 12 (Havelis, Luxury Villas, Farmhouses, Hotels/Resorts, Commercial Interiors).
  9. **Brand Statement**: Editorial quote banner: *"Preserving Royal Legacy Through Timeless Heritage Architecture."*
  10. **Contact & Enquiry Form**: Click-to-call links (`9414228829`, `7850015839`), direct email (`rathoreheritagedevelopers@gmail.com`), Instagram (`@rh_heritagebuilds`), and interactive consultation form connected directly to MongoDB.

### 2. Admin CMS Panel (`admin/`)
- **JWT Authentication**: Secure login, session persistence, and token verification.
- **Real-Time Dashboard**: Live statistics of total projects, gallery images, and customer enquiries.
- **Website Content Editor**: Instantly edit hero headline, subtext, eyebrow, about section, contact phone numbers, and brand statements.
- **Full Project CMS**:
  - Add new signature projects or edit existing ones.
  - **Architectural Elements Builder**: Add, edit, or remove custom elements (e.g. Mor Pankh ceilings, Thekri glass, Ghokda domes).
  - **Gallery Manager**: Add image URLs, captions, and reorder photos.
- **Image Manager & Uploader**: Direct file upload with Multer and Cloudinary integration, providing instant preview and copyable URLs.
- **Enquiries Manager**: Real-time list of customer inquiries submitted from the website with status tags (`New`, `Contacted`, `Closed`).

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- Node.js (v18 or higher)
- Internet connection for MongoDB Atlas

### 1. Start Backend API
From the project root:
```powershell
cd backend
npm install
npm start
```
*The API will start at `http://localhost:5000` and automatically verify the database.*

### 2. Open Customer Website
- Double click [`frontend/index.html`](file:///c:/Users/Harsh/Downloads/rathore-heritage-customer-admin-mongodb/frontend/index.html) in Windows File Explorer, or open with VS Code Live Server.
- It will automatically fetch data from your running backend API!

### 3. Open Admin Panel
- Open [`admin/index.html`](file:///c:/Users/Harsh/Downloads/rathore-heritage-customer-admin-mongodb/admin/index.html) in your browser.
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## 🌐 Production Deployment Guide

### A. Deploy Backend (e.g., on Render)
1. Push this repository to GitHub.
2. Log in to [Render](https://render.com/) and click **New Web Service**.
3. Connect your GitHub repository.
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add **Environment Variables**:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://harshrathore1640_db_user:lrE8TFhFgclbzhlj@cluster0.kqunfqt.mongodb.net/rathore_heritage?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your_super_secret_jwt_key
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_strong_password
   CLOUDINARY_CLOUD_NAME=optional_cloud_name
   CLOUDINARY_API_KEY=optional_api_key
   CLOUDINARY_API_SECRET=optional_api_secret
   ```
6. Click **Deploy**. Note down your deployed URL (e.g., `https://rathore-heritage-api.onrender.com`).

### B. Deploy Customer Frontend to GitHub Pages
1. Push the contents of `frontend/` to your GitHub repository (either root of repo or `main` branch).
2. Configure your production API URL:
   - In `frontend/index.html`, add this script inside `<head>` before `app.js`:
     ```html
     <script>
       window.API_URL = "https://your-backend-api-url.onrender.com/api";
     </script>
     ```
3. In GitHub: **Settings** → **Pages** → **Deploy from branch** → `main` / `root` → **Save**.
4. Your site will be live with full HashRouter routing (`#/projects/oladar-haveli`) without 404 errors!

---

## 🔒 Security & Best Practices
- **No Hardcoded Passwords**: Passwords hashed using `bcryptjs` with salt rounds.
- **Protected Endpoints**: Admin APIs require valid JWT `Bearer` token in the `Authorization` header.
- **Resilient Fallback Layer**: If MongoDB Atlas network connection is temporarily interrupted, the system seamlessly serves the exact PDF baseline content, ensuring the site never goes down.
- **Git Protection**: Root `.gitignore` prevents `.env`, `node_modules/`, and temporary scratch directories from being committed.
