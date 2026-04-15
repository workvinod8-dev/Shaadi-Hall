/* ============================================================
   SHAADI VENUE - Admin Panel JS
   ============================================================ */

let adminUser = null;

// ── Init Admin ──
async function initAdmin() {
  const { user } = await AuthModule.requireRole("admin", "admin-login.html");
  adminUser = user;
  const nameEl = document.getElementById("admin-name");
  if (nameEl) {
    const data = await AuthModule.getCurrentUserData();
    nameEl.textContent = data?.name || "Admin";
  }
}

// ── Dashboard Stats ──
async function loadDashboardStats() {
  try {
    const [hallsSnap, vendorsSnap, bookingsSnap, enquiriesSnap, usersSnap] = await Promise.all([
      db.collection("halls").get(),
      db.collection("vendors").get(),
      db.collection("bookings").get(),
      db.collection("enquiries").get(),
      db.collection("users").where("role", "==", "customer").get()
    ]);
    setText2("stat-halls",     hallsSnap.size);
    setText2("stat-vendors",   vendorsSnap.size);
    setText2("stat-bookings",  bookingsSnap.size);
    setText2("stat-enquiries", enquiriesSnap.size);
    setText2("stat-customers", usersSnap.size);

    // Recent bookings for dashboard
    const pending = [];
    bookingsSnap.forEach(d => { const b = d.data(); if (b.status === "pending") pending.push({ id: d.id, ...b }); });
    setText2("stat-pending", pending.length);
    renderRecentBookings(pending.slice(0, 5));
  } catch (err) {
    console.error("Dashboard stats error:", err);
  }
}

function setText2(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function renderRecentBookings(bookings) {
  const tbody = document.getElementById("recent-bookings-body");
  if (!tbody) return;
  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--admin-muted)">No pending bookings</td></tr>`;
    return;
  }
  tbody.innerHTML = bookings.map(b => `
    <tr>
      <td><strong>${b.customerName}</strong><br><small style="color:var(--admin-muted)">${b.phone}</small></td>
      <td>${b.hallName}</td>
      <td>${b.eventDate || "—"}</td>
      <td>${b.guestCount || "—"}</td>
      <td><span class="status-badge status-pending">Pending</span></td>
    </tr>`).join("");
}

// ── Halls CRUD ──
async function loadAdminHalls() {
  const tbody = document.getElementById("halls-table-body");
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px"><div class="loader" style="margin:auto"></div></td></tr>`;
  try {
    const snap = await db.collection("halls").orderBy("createdAt", "desc").get();
    if (snap.empty) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px">No halls yet. <a href="#" onclick="openHallModal()">Add one!</a></td></tr>`;
      return;
    }
    tbody.innerHTML = "";
    snap.forEach(doc => {
      const h = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${h.coverImage}" class="table-avatar" onerror="this.src='https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=100'"></td>
        <td><strong>${h.name}</strong></td>
        <td>${h.city} — ${h.locality}</td>
        <td>${formatINR(h.price)}</td>
        <td>${h.capacity.toLocaleString()}</td>
        <td><span class="status-badge ${h.isAvailable ? "status-active" : "status-inactive"}">${h.isAvailable ? "Available" : "Unavailable"}</span></td>
        <td>
          <button class="action-btn view"   onclick="window.open('hall-details.html?id=${doc.id}','_blank')" title="View">👁️</button>
          <button class="action-btn edit"   onclick="editHall('${doc.id}')"   title="Edit">✏️</button>
          <button class="action-btn delete" onclick="deleteHall('${doc.id}')" title="Delete">🗑️</button>
        </td>`;
      tbody.appendChild(tr);
    });
  } catch (err) { console.error(err); }
}

// Hall Modal
function openHallModal(hallId = null) {
  document.getElementById("hall-modal-title").textContent = hallId ? "Edit Hall" : "Add New Hall";
  document.getElementById("hall-form-id").value = hallId || "";
  if (!hallId) document.getElementById("hall-form").reset();
  document.getElementById("hall-modal").classList.add("open");
}

function closeHallModal() {
  document.getElementById("hall-modal").classList.remove("open");
}

async function editHall(hallId) {
  const doc = await db.collection("halls").doc(hallId).get();
  if (!doc.exists) return;
  const h = doc.data();
  document.getElementById("hf-name").value        = h.name;
  document.getElementById("hf-city").value        = h.city;
  document.getElementById("hf-locality").value    = h.locality;
  document.getElementById("hf-address").value     = h.address;
  document.getElementById("hf-price").value       = h.price;
  document.getElementById("hf-capacity").value    = h.capacity;
  document.getElementById("hf-description").value = h.description;
  document.getElementById("hf-amenities").value   = (h.amenities || []).join(", ");
  document.getElementById("hf-cover").value       = h.coverImage || "";
  document.getElementById("hf-featured").checked  = h.isFeatured;
  document.getElementById("hf-available").checked = h.isAvailable;
  document.getElementById("hf-ac").checked        = h.isAC;
  openHallModal(hallId);
}

async function saveHall(event) {
  event.preventDefault();
  const hallId = document.getElementById("hall-form-id").value;
  const data = {
    name:        document.getElementById("hf-name").value.trim(),
    city:        document.getElementById("hf-city").value.trim(),
    locality:    document.getElementById("hf-locality").value.trim(),
    address:     document.getElementById("hf-address").value.trim(),
    price:       parseInt(document.getElementById("hf-price").value) || 0,
    capacity:    parseInt(document.getElementById("hf-capacity").value) || 0,
    description: document.getElementById("hf-description").value.trim(),
    amenities:   document.getElementById("hf-amenities").value.split(",").map(s => s.trim()).filter(Boolean),
    coverImage:  document.getElementById("hf-cover").value.trim(),
    isFeatured:  document.getElementById("hf-featured").checked,
    isAvailable: document.getElementById("hf-available").checked,
    isAC:        document.getElementById("hf-ac").checked,
    updatedAt:   firebase.firestore.FieldValue.serverTimestamp()
  };
  try {
    if (hallId) {
      await db.collection("halls").doc(hallId).update(data);
      showToast("Hall updated successfully ✅");
    } else {
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      data.rating = 0; data.reviewCount = 0;
      await db.collection("halls").add(data);
      showToast("Hall added successfully ✅");
    }
    closeHallModal();
    loadAdminHalls();
  } catch (err) { showToast("Error: " + err.message, "error"); }
}

async function deleteHall(hallId) {
  if (!confirm("Are you sure you want to delete this hall? This action cannot be undone.")) return;
  try {
    await db.collection("halls").doc(hallId).delete();
    showToast("Hall deleted");
    loadAdminHalls();
  } catch (err) { showToast("Error: " + err.message, "error"); }
}

// ── Vendors CRUD ──
async function loadAdminVendors() {
  const tbody = document.getElementById("vendors-table-body");
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px"><div class="loader" style="margin:auto"></div></td></tr>`;
  try {
    const snap = await db.collection("vendors").get();
    tbody.innerHTML = "";
    snap.forEach(doc => {
      const v = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${v.profileImage||''}" class="table-avatar" style="border-radius:50%" onerror="this.src='https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=80'"></td>
        <td><strong>${v.name}</strong></td>
        <td>${v.category}</td>
        <td>${v.city}</td>
        <td>${v.phone}</td>
        <td><span class="status-badge ${v.isApproved ? "status-approved" : "status-pending"}">${v.isApproved ? "Approved" : "Pending"}</span></td>
        <td>
          <button class="action-btn view"   onclick="toggleVendorApproval('${doc.id}', ${v.isApproved})" title="Toggle Approval">✅</button>
          <button class="action-btn delete" onclick="deleteVendor('${doc.id}')" title="Delete">🗑️</button>
        </td>`;
      tbody.appendChild(tr);
    });
  } catch (err) { console.error(err); }
}

async function toggleVendorApproval(vendorId, currentStatus) {
  await db.collection("vendors").doc(vendorId).update({ isApproved: !currentStatus });
  showToast(currentStatus ? "Vendor unapproved" : "Vendor approved ✅");
  loadAdminVendors();
}

async function deleteVendor(vendorId) {
  if (!confirm("Delete this vendor?")) return;
  await db.collection("vendors").doc(vendorId).delete();
  showToast("Vendor deleted");
  loadAdminVendors();
}

// ── Bookings ──
async function loadAdminBookings() {
  const tbody = document.getElementById("bookings-table-body");
  if (!tbody) return;
  try {
    const snap = await db.collection("bookings").orderBy("createdAt", "desc").limit(50).get();
    tbody.innerHTML = "";
    snap.forEach(doc => {
      const b = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${b.customerName}</strong><br><small>${b.phone}</small></td>
        <td>${b.hallName}</td>
        <td>${b.eventDate || "—"}</td>
        <td>${b.eventType || "—"}</td>
        <td>${b.guestCount || "—"}</td>
        <td><span class="status-badge status-${b.status}">${b.status}</span></td>
        <td>
          <button class="action-btn view" onclick="updateBookingStatus('${doc.id}','confirmed')" title="Confirm">✅</button>
          <button class="action-btn delete" onclick="updateBookingStatus('${doc.id}','cancelled')" title="Cancel">❌</button>
        </td>`;
      tbody.appendChild(tr);
    });
  } catch (err) { console.error(err); }
}

async function updateBookingStatus(bookingId, status) {
  await db.collection("bookings").doc(bookingId).update({ status, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
  showToast(`Booking ${status}`);
  loadAdminBookings();
}

// ── Users ──
async function loadAdminUsers() {
  const tbody = document.getElementById("users-table-body");
  if (!tbody) return;
  try {
    const snap = await db.collection("users").orderBy("createdAt", "desc").get();
    tbody.innerHTML = "";
    snap.forEach(doc => {
      const u = doc.data();
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>${u.phone || "—"}</td>
        <td><span class="status-badge status-${u.role === "admin" ? "approved" : u.role === "vendor" ? "pending" : "active"}">${u.role}</span></td>
        <td>${formatDate(u.createdAt)}</td>
        <td><span class="status-badge ${u.isActive ? "status-active" : "status-inactive"}">${u.isActive ? "Active" : "Inactive"}</span></td>`;
      tbody.appendChild(tr);
    });
  } catch (err) { console.error(err); }
}

// ── Admin Login ──
async function adminLogin(event) {
  event.preventDefault();
  const email    = document.getElementById("admin-email").value.trim();
  const password = document.getElementById("admin-password").value;
  const btn      = event.target.querySelector("button[type=submit]");
  btn.disabled   = true; btn.textContent = "Signing in...";
  try {
    await AuthModule.login(email, password, "admin");
    showToast("Welcome back, Admin! ✅");
    setTimeout(() => window.location.href = "admin-dashboard.html", 800);
  } catch (err) {
    showToast(err.message, "error");
    btn.disabled = false; btn.textContent = "Sign In";
  }
}
