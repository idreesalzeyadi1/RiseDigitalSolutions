# RiseDigital Solutions — Website

A full website built with React + Tailwind CSS + Firebase. It includes 3 portals:
**Public site**, **Intern Portal**, and **Admin Panel**.

---

## 1. Running the Project (Local Development)

```bash
npm install
npm run dev
```

The website will open in your browser at `http://localhost:5173`.

To create a production build:
```bash
npm run build
```
The output goes into the `dist/` folder — you can upload this folder to any hosting
(Firebase Hosting, Vercel, Netlify).

---

## 2. Firebase Setup (REQUIRED — do this first)

Right now the project has **placeholder Firebase keys**. To save/fetch real data:

### Step A — Create a Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Add Project" → give it a name (e.g. `risedigital-solutions`) → create it

### Step B — Add a Web App
1. In the Project Overview, click the `</>` (Web) icon
2. Give the app a nickname → "Register App"
3. Copy the `firebaseConfig` object you're given

### Step C — Update the Config File
Open `src/firebase/config.js` and replace the values in the `firebaseConfig` object with
your real keys:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "risedigital-solutions.firebaseapp.com",
  projectId: "risedigital-solutions",
  storageBucket: "risedigital-solutions.appspot.com",
  messagingSenderId: "...",
  appId: "...",
};
```

### Step D — Enable Authentication
1. Firebase Console → **Build → Authentication → Get Started**
2. In the "Sign-in method" tab, enable **Email/Password**

### Step E — Create Firestore Database
1. Firebase Console → **Build → Firestore Database → Create Database**
2. Choose "Start in production mode" (or test mode, for development)
3. Choose a region (closest to your users)

### Step F — Firestore Security Rules
For ease of development, you can use these rules (Firestore → Rules tab):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /serviceHireRequests/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /internshipApplications/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /contactMessages/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /enrollments/{doc} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
    match /tasks/{doc} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /certificates/{doc} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /courses/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /testimonials/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

> **Note:** These rules are simple (they let any logged-in user read/write) so the app works
> right away. Before going live, tighten them up — only allow admin-role users to write to
> tasks/certificates (using custom claims or a role check), and only let regular users see
> their own data.

---

## 3. How to Create an Admin Account

The admin panel (`/admin`) needs a special account whose Firestore `users/{uid}` document has
`role: "admin"`.

**Option 1 — Sign up, then manually change the role:**
1. Temporarily use the `/signup` page to create an account
2. Firebase Console → Firestore → `users` collection → find that user's document
3. Change the `role` field's value from `"student"` to `"admin"`

**Option 2 — Directly from the Firebase Console:**
1. Authentication → Add User (email/password) — you'll get a UID
2. Firestore → `users` collection → create a new document, with ID = that same UID
3. Fields: `name`, `email`, `role: "admin"`

Then log in at the `/admin` route with that same email/password.

---

## 4. Creating Intern Accounts (Automated)

Since applying for an internship doesn't require signup, once the admin **Accepts** an
application in `/admin/internship-applications`, a **"Create Intern Account"** button appears
next to it. Clicking it:

1. Automatically creates a Firebase Auth account for the candidate (using their applied email)
2. Creates their Firestore `users/{uid}` document with `role: "intern"` and their chosen domain
3. Generates a temporary password and shows it to you once in a popup (e.g. `Rise-7f3k9a`) —
   copy it into the offer letter you send manually via Gmail

The admin's own session is never affected by this — it uses a separate, temporary Firebase app
instance behind the scenes so you stay logged into the admin panel throughout.

> **Note:** The temporary password is shown only once and is not stored anywhere in the app.
> If you lose it before sending the offer letter, you'll need to reset the intern's password
> from the Firebase Console (Authentication → find the user → "Reset password").
> Recommend the candidate change their password after their first login.

After this, the candidate can log in at `/login` and will automatically land on their intern
portal (`/intern/dashboard`).

---

## 5. Project Structure

```
src/
├── components/
│   ├── layout/        Navbar, Footer, PublicLayout, DashboardLayout
│   ├── ui/             Button, Icons, SectionHeading
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx    login/signup/logout logic
├── firebase/
│   └── config.js           PUT YOUR FIREBASE KEYS HERE
├── data/
│   └── siteData.js        Services, courses, testimonials (static/mock data)
├── pages/
│   ├── public/              Home, Services, Academy, Internships, About, Contact, Login, Signup
│   ├── student/               StudentDashboard
│   ├── intern/                  InternDashboard, InternTasks, InternCertificate
│   └── admin/                     AdminLogin, AdminDashboard, ServiceRequests, ManageCourses,
│                                   Enrollments, InternshipApplications, ManageInterns,
│                                   Certificates, Testimonials
└── App.jsx               All routes are defined here
```

## 6. Routes Reference

| Route | Access |
|---|---|
| `/` | Public — Homepage |
| `/services`, `/services/:slug` | Public — Services + detail pages (Hire Us form) |
| `/academy`, `/academy/:courseId` | Public — Courses (Enroll requires signup) |
| `/internships`, `/internships/apply` | Public — Apply form (no login needed) |
| `/about`, `/contact` | Public |
| `/login`, `/signup` | Public — student signup |
| `/student/dashboard` | Student only |
| `/intern/dashboard`, `/intern/tasks`, `/intern/certificate` | Intern only |
| `/admin` | Admin login |
| `/admin/dashboard` + sub-pages | Admin only |

---

## 7. Design / Brand

- **Colors**: Navy (`#0A1F44`) + Bright Blue gradient (`#2563EB` to `#3B9EFF`) — taken directly
  from your logo (Tailwind theme tokens inside the `@theme` block in `src/index.css`)
- **Fonts**: Poppins (headings) + Inter (body)
- **Logo files**: `public/assets/logo-circle.png` (favicon/square use),
  `public/assets/logo-horizontal.png` (navbar/footer)
- **Service/course images**: imported from `src/assets/` (e.g. `web.jpg`, `app.jpg`, `seo.jpg`,
  `digitalmarketing.jpg`) via `src/data/siteData.js` — replace these files with your own
  images using the same filenames

---

## 8. Next Steps (Suggestions)

- Make the Firestore Security Rules production-ready (role-based checks)
- If you want a real payment gateway, you can integrate the JazzCash/EasyPaisa API
- Connect the admin's course management to the public Academy page (currently Academy shows
  static data — `src/data/siteData.js`)
- Deploy with Firebase Hosting: `firebase init hosting` then `firebase deploy`
