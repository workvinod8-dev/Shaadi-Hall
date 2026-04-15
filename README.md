# 🏛️ ShaadiVenue — Marriage Hall Booking Platform
### Vijayapura, Karnataka | Built with HTML + CSS + JS + Firebase

---

## 📁 Complete File Structure

```
shaadi-venue/
├── index.html                  ← Homepage
├── halls.html                  ← All halls listing
├── hall-details.html           ← Individual hall page + enquiry
├── vendors.html                ← Vendors listing
├── about.html                  ← About page
├── contact.html                ← Contact page
│
├── admin-login.html            ← Admin login
├── admin-dashboard.html        ← Admin overview
├── admin-halls.html            ← Add/Edit/Delete halls
├── admin-vendors.html          ← Approve/manage vendors
├── admin-bookings.html         ← View bookings + enquiries
├── admin-users.html            ← All users
│
├── vendor-login.html           ← Vendor login + register
├── vendor-dashboard.html       ← Vendor home
├── vendor-profile.html         ← Edit profile + packages
├── vendor-bookings.html        ← View leads/enquiries
│
├── customer-login.html         ← Customer login + register
├── customer-dashboard.html     ← My bookings + favourites
│
├── css/
│   ├── style.css               ← Main site styles
│   ├── admin.css               ← Admin panel styles
│   ├── vendor.css              ← Vendor panel styles
│   └── customer.css            ← Customer panel styles
│
└── js/
    ├── firebase-config.js      ← ⚠️ Firebase keys go here
    ├── seed-data.js            ← Sample Vijayapura data
    ├── auth.js                 ← Login/register/role guard
    ├── main.js                 ← Navbar, toast, utilities
    ├── halls.js                ← Halls listing + filters
    ├── vendors.js              ← Vendors listing
    ├── booking.js              ← Hall detail + enquiry form
    ├── admin.js                ← Admin CRUD operations
    └── vendor.js               ← Vendor + customer JS
```

---

## 🔥 Step 1 — Firebase Setup

### 1.1 Create Firebase Project
1. Go to → https://console.firebase.google.com/
2. Click **"Add project"** → Name it `shaadi-venue`
3. Disable Google Analytics (optional) → Create project

### 1.2 Enable Authentication
1. In Firebase console → **Authentication** → Get started
2. Click **Sign-in method** tab
3. Enable **Email/Password** → Save

### 1.3 Create Firestore Database
1. Go to **Firestore Database** → Create database
2. Choose **"Start in test mode"** (for development)
3. Select a region (e.g., `asia-south1` for India)
4. Click Done

### 1.4 Create Firebase Storage
1. Go to **Storage** → Get started
2. Start in test mode → Done

### 1.5 Get Your Config Keys
1. Go to **Project Settings** (⚙️ gear icon)
2. Scroll to **"Your apps"** → Click **Web** icon (`</>`)
3. Register app with nickname `shaadi-venue-web`
4. Copy the `firebaseConfig` object

### 1.6 Paste Config in Your Project
Open `js/firebase-config.js` and replace:
```javascript
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",           // ← paste here
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
};
```

---

## 🌱 Step 2 — Seed Sample Data

After setting up Firebase:

1. Open `index.html` in your browser (via local server — see Step 3)
2. Open browser Console → **F12** → **Console tab**
3. Run:
```javascript
seedData()
```
This will add all 12 Vijayapura halls + 6 vendors + 4 cities to Firestore.

---

## 👑 Step 3 — Create Admin User

In the same browser console on `index.html`:
```javascript
createAdminUser("admin@youremail.com", "yourpassword123", "Admin Name")
```

Then go to → `admin-login.html` and sign in.

---

## 🖥️ Step 4 — Run Locally

**Option A — VS Code Live Server (Recommended)**
1. Install VS Code extension: **Live Server**
2. Right-click `index.html` → **"Open with Live Server"**
3. Site opens at `http://127.0.0.1:5500`

**Option B — Python HTTP Server**
```bash
cd shaadi-venue
python3 -m http.server 8080
# Open http://localhost:8080
```

**Option C — Node.js `serve`**
```bash
npm install -g serve
serve shaadi-venue
# Open http://localhost:3000
```

> ⚠️ **Do NOT open HTML files directly** (file://) — Firebase auth requires HTTP/HTTPS.

---

## 🚀 Step 5 — Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting in your project folder
cd shaadi-venue
firebase init hosting

# When prompted:
# - Select your Firebase project
# - Public directory: . (dot = current folder)
# - Single page app: No
# - Overwrite index.html: No

# Deploy
firebase deploy
```

Your site will be live at: `https://YOUR_PROJECT_ID.web.app`

---

## 👤 User Roles

| Role | Login Page | Dashboard |
|------|-----------|-----------|
| Admin | `admin-login.html` | `admin-dashboard.html` |
| Vendor | `vendor-login.html` | `vendor-dashboard.html` |
| Customer | `customer-login.html` | `customer-dashboard.html` |

---

## 🗄️ Firestore Collections

| Collection | Purpose |
|-----------|---------|
| `users` | All user accounts + roles |
| `halls` | Marriage hall listings |
| `vendors` | Wedding service vendors |
| `bookings` | Booking requests from customers |
| `enquiries` | Contact/enquiry forms |
| `favorites` | Customer saved halls |
| `cities` | City directory |
| `contacts` | Contact page submissions |

---

## 🔒 Firestore Security Rules (Production)

Replace test mode rules with these in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public read for halls and vendors
    match /halls/{id} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /vendors/{id} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && (
        resource.data.uid == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
    }

    // Anyone can write enquiries/bookings
    match /enquiries/{id} { allow read, write: if true; }
    match /bookings/{id}  { allow read, write: if request.auth != null; }
    match /contacts/{id}  { allow create: if true; allow read: if false; }

    // Users can read their own document
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Favorites — owner only
    match /favorites/{id} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }

    // Cities — public read, admin write
    match /cities/{id} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 🎨 Customisation

### Change Colours
Edit `css/style.css` → `:root` section:
```css
--crimson:  #8B1A1A;   /* Main brand colour */
--gold:     #C8960C;   /* Accent gold */
--cream:    #FFF9F0;   /* Background */
```

### Add More Cities
In Firestore console → `cities` collection → Add document with fields:
`name`, `state`, `hallCount`, `isActive`, `coverImage`

### Add More Hall Data
- Use the Admin panel → `admin-halls.html` → "Add Hall" button
- Or run `seedData()` again (add new entries to `vijayapuraHalls` array in `seed-data.js`)

---

## 📱 Features Summary

### Public Website
- ✅ Homepage with hero, search, featured halls, vendors, CTA
- ✅ Hall listing with filters (city, AC, price, capacity, sort)
- ✅ Hall detail page with gallery, amenities, enquiry form
- ✅ Vendors listing with category filters
- ✅ About & Contact pages

### Admin Panel
- ✅ Secure admin login
- ✅ Dashboard with live stats
- ✅ Add/Edit/Delete halls (with all fields)
- ✅ Approve/manage vendors
- ✅ View & action bookings + enquiries
- ✅ User directory

### Vendor Panel
- ✅ Vendor login + registration
- ✅ Dashboard with stats
- ✅ Full profile editor + package pricing
- ✅ View all wedding enquiries as leads

### Customer Panel
- ✅ Customer login + registration
- ✅ My bookings with status
- ✅ Saved favourite halls
- ✅ Direct enquiry submission from hall pages

---

## ❓ Troubleshooting

**"Firebase app not initialized"**
→ Check that your config keys in `firebase-config.js` are correct

**"Missing or insufficient permissions"**
→ Firestore is in test mode — run `seedData()` again or check rules

**"Cannot open file:// in browser"**
→ Use a local server (Live Server, Python, or `serve`)

**Halls not loading**
→ Run `seedData()` from browser console on index.html

---

*Built with ❤️ for Vijayapura, Karnataka*
