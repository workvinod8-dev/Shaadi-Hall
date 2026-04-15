/* ============================================================
   SHAADI VENUE - Firebase Configuration
   ============================================================
   
   ⚠️  SETUP INSTRUCTIONS:
   1. Go to https://console.firebase.google.com/
   2. Create a new project (e.g., "shaadi-hall")
   3. Enable Authentication → Email/Password sign-in
   4. Create Firestore Database (start in test mode)
   5. Enable Firebase Storage
   6. Go to Project Settings → Your apps → Web app → SDK setup
   7. Copy your config object and paste it below, replacing the placeholder values
   ============================================================ */

// ── PASTE YOUR FIREBASE CONFIG HERE ──
const firebaseConfig = {
  apiKey:            "AIzaSyDyUn5EqZ3lZdjsqr_f_DYhc1fd8CZvYdg",
  authDomain:        "shaadi-venue-web.firebaseapp.com",
  projectId:         "shaadi-venue-web",
  storageBucket:     "shaadi-venue-web.firebasestorage.app",
  messagingSenderId: "1003275659792",
  appId:             "1:1003275659792:web:725fc884866b6e1fd6b895",
  measurementId:     "G-9BFE41FYNG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export services (used throughout the app)
const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// Enable offline persistence (optional but nice for mobile)
db.enablePersistence({ synchronizeTabs: true })
  .catch(err => {
    if (err.code === 'failed-precondition') {
      console.log('Multiple tabs open — offline persistence disabled.');
    } else if (err.code === 'unimplemented') {
      console.log('Browser does not support offline persistence.');
    }
  });

/* ============================================================
   FIRESTORE COLLECTIONS STRUCTURE
   ============================================================

   /users/{userId}
     - uid: string
     - name: string
     - email: string
     - phone: string
     - role: "admin" | "vendor" | "customer"
     - createdAt: timestamp
     - isActive: boolean

   /halls/{hallId}
     - name: string
     - city: string
     - locality: string
     - address: string
     - mapsLink: string
     - price: number          (per function)
     - capacity: number        (persons)
     - description: string
     - amenities: string[]
     - isAC: boolean
     - hasParking: boolean
     - roomsCount: number
     - hasDining: boolean
     - isIndoor: boolean
     - isVeg: boolean
     - coverImage: string      (URL)
     - gallery: string[]       (URLs)
     - isAvailable: boolean
     - isFeatured: boolean
     - rating: number
     - reviewCount: number
     - createdAt: timestamp
     - updatedAt: timestamp

   /vendors/{vendorId}
     - uid: string             (linked Firebase user)
     - name: string
     - category: string        (catering|decoration|photography|...)
     - city: string
     - phone: string
     - email: string
     - description: string
     - packages: object[]      [{name, price, details}]
     - serviceAreas: string[]
     - profileImage: string
     - gallery: string[]
     - isApproved: boolean
     - isActive: boolean
     - rating: number
     - createdAt: timestamp

   /bookings/{bookingId}
     - customerId: string
     - customerName: string
     - customerPhone: string
     - customerEmail: string
     - hallId: string
     - hallName: string
     - eventDate: string
     - eventType: string
     - guestCount: number
     - status: "pending"|"confirmed"|"cancelled"
     - notes: string
     - createdAt: timestamp
     - updatedAt: timestamp

   /enquiries/{enquiryId}
     - customerName: string
     - phone: string
     - email: string
     - hallId: string
     - hallName: string
     - message: string
     - status: "new"|"read"|"replied"
     - createdAt: timestamp

   /cities/{cityId}
     - name: string
     - state: string
     - hallCount: number
     - isActive: boolean
     - coverImage: string

   /reviews/{reviewId}
     - hallId: string
     - userId: string
     - userName: string
     - rating: number
     - comment: string
     - createdAt: timestamp

   /favorites/{favoriteId}
     - userId: string
     - hallId: string
     - createdAt: timestamp
   ============================================================ */
