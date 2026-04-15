/* ============================================================
   SHAADI VENUE - Vendor Module JS
   ============================================================ */

let vendorData = null;
let vendorDocId = null;

// ── Vendor Login ──
async function vendorLogin(event) {
  event.preventDefault();
  const email    = document.getElementById("vendor-email").value.trim();
  const password = document.getElementById("vendor-password").value;
  const btn      = event.target.querySelector("button[type=submit]");
  btn.disabled   = true; btn.textContent = "Signing in...";
  try {
    const { user } = await AuthModule.login(email, password, "vendor");
    showToast("Welcome back! 🎉");
    setTimeout(() => window.location.href = "vendor-dashboard.html", 800);
  } catch (err) {
    showToast(err.message, "error");
    btn.disabled = false; btn.textContent = "Sign In";
  }
}

// ── Vendor Register ──
async function vendorRegister(event) {
  event.preventDefault();
  const name     = document.getElementById("vr-name").value.trim();
  const email    = document.getElementById("vr-email").value.trim();
  const phone    = document.getElementById("vr-phone").value.trim();
  const password = document.getElementById("vr-password").value;
  const category = document.getElementById("vr-category").value;
  const btn      = event.target.querySelector("button[type=submit]");
  btn.disabled   = true; btn.textContent = "Creating account...";
  try {
    const user = await AuthModule.register(name, email, password, phone, "vendor");
    // Create vendor document
    await db.collection("vendors").add({
      uid: user.uid, name, email, phone, category,
      city: "Vijayapura", description: "", packages: [], serviceAreas: [],
      profileImage: "", gallery: [],
      isApproved: false, isActive: true, rating: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast("Registration submitted! Awaiting admin approval.");
    setTimeout(() => window.location.href = "vendor-dashboard.html", 1200);
  } catch (err) {
    showToast(err.message, "error");
    btn.disabled = false; btn.textContent = "Register";
  }
}

// ── Init Vendor Dashboard ──
async function initVendorDashboard() {
  const { user } = await AuthModule.requireRole("vendor", "vendor-login.html");
  const data = await AuthModule.getCurrentUserData();
  if (data) {
    const nameEl = document.getElementById("vendor-name");
    if (nameEl) nameEl.textContent = data.name;
  }
  // Load vendor profile from vendors collection
  const snap = await db.collection("vendors").where("uid", "==", user.uid).limit(1).get();
  if (!snap.empty) {
    const doc = snap.docs[0];
    vendorData  = doc.data();
    vendorDocId = doc.id;
    renderVendorDashboard();
  }
}

function renderVendorDashboard() {
  if (!vendorData) return;
  const statusEl = document.getElementById("vendor-status");
  if (statusEl) {
    statusEl.textContent = vendorData.isApproved ? "Approved ✅" : "Pending Approval ⏳";
    statusEl.className   = `status-badge ${vendorData.isApproved ? "status-active" : "status-pending"}`;
  }
  setText2("vd-category", vendorData.category);
  setText2("vd-city",     vendorData.city);
}

// ── Load Vendor Enquiries ──
async function loadVendorEnquiries() {
  // For simplicity, vendors see general enquiries for their category
  const tbody = document.getElementById("vendor-enquiries-body");
  if (!tbody) return;
  try {
    const snap = await db.collection("enquiries").orderBy("createdAt", "desc").limit(20).get();
    tbody.innerHTML = "";
    snap.forEach(doc => {
      const e = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${e.customerName}</td>
        <td>${e.phone}</td>
        <td>${e.hallName || "—"}</td>
        <td>${e.eventDate || "—"}</td>
        <td><span class="status-badge status-${e.status === "new" ? "pending" : "active"}">${e.status}</span></td>`;
      tbody.appendChild(tr);
    });
  } catch (err) { console.error(err); }
}

/* ============================================================
   Customer Module JS
   ============================================================ */

// ── Customer Login ──
async function customerLogin(event) {
  event.preventDefault();
  const email    = document.getElementById("cust-email").value.trim();
  const password = document.getElementById("cust-password").value;
  const btn      = event.target.querySelector("button[type=submit]");
  btn.disabled   = true; btn.textContent = "Signing in...";
  try {
    await AuthModule.login(email, password, "customer");
    showToast("Welcome back! 🎉");
    setTimeout(() => window.location.href = "customer-dashboard.html", 800);
  } catch (err) {
    showToast(err.message, "error");
    btn.disabled = false; btn.textContent = "Sign In";
  }
}

// ── Customer Register ──
async function customerRegister(event) {
  event.preventDefault();
  const name     = document.getElementById("cr-name").value.trim();
  const email    = document.getElementById("cr-email").value.trim();
  const phone    = document.getElementById("cr-phone").value.trim();
  const password = document.getElementById("cr-password").value;
  const btn      = event.target.querySelector("button[type=submit]");
  btn.disabled   = true; btn.textContent = "Creating account...";
  try {
    await AuthModule.register(name, email, password, phone, "customer");
    showToast("Account created! Welcome 🎉");
    setTimeout(() => window.location.href = "customer-dashboard.html", 1000);
  } catch (err) {
    showToast(err.message, "error");
    btn.disabled = false; btn.textContent = "Create Account";
  }
}

// ── Init Customer Dashboard ──
async function initCustomerDashboard() {
  const { user } = await AuthModule.requireRole("customer", "customer-login.html");
  const data = await AuthModule.getCurrentUserData();
  if (data) {
    setText2("cust-name",  data.name);
    setText2("cust-email", data.email);
    setText2("cust-phone", data.phone || "Not set");
  }
  loadCustomerBookings(user.uid);
  loadCustomerFavorites(user.uid);
}

// ── Customer Bookings ──
async function loadCustomerBookings(userId) {
  const container = document.getElementById("customer-bookings");
  if (!container) return;
  try {
    const snap = await db.collection("bookings").where("customerId", "==", userId).orderBy("createdAt", "desc").get();
    if (snap.empty) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📅</div><div class="empty-state-title">No bookings yet</div><p class="empty-state-text"><a href="halls.html" style="color:var(--crimson)">Browse halls</a> to make your first booking</p></div>`;
      return;
    }
    container.innerHTML = snap.docs.map(doc => {
      const b = doc.data();
      return `
        <div class="booking-item">
          <div class="booking-info">
            <div class="booking-hall-name">${b.hallName}</div>
            <div style="font-size:0.82rem;color:var(--text-muted)">
              📅 ${b.eventDate || "—"} &nbsp;|&nbsp; 👥 ${b.guestCount || "—"} guests &nbsp;|&nbsp; 🎉 ${b.eventType || "—"}
            </div>
          </div>
          <span class="status-badge status-${b.status}">${b.status}</span>
        </div>`;
    }).join("");
  } catch (err) { console.error(err); }
}

// ── Customer Favourites ──
async function loadCustomerFavorites(userId) {
  const container = document.getElementById("customer-favorites");
  if (!container) return;
  try {
    const favSnap = await db.collection("favorites").where("userId", "==", userId).get();
    if (favSnap.empty) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">❤️</div><div class="empty-state-title">No favourites yet</div><p class="empty-state-text">Tap the heart on any hall to save it</p></div>`;
      return;
    }
    const hallIds = favSnap.docs.map(d => d.data().hallId);
    const hallPromises = hallIds.map(id => db.collection("halls").doc(id).get());
    const hallDocs = await Promise.all(hallPromises);
    container.innerHTML = `<div class="fav-grid">` + hallDocs.filter(d => d.exists).map(d => hallCardHTML(d.data(), d.id)).join("") + `</div>`;
    initScrollReveal();
  } catch (err) { console.error(err); }
}

function setText2(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val || "";
}
