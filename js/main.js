/* ============================================================
   SHAADI VENUE - Main Utilities
   ============================================================ */

// ── Toast Notifications ──
function showToast(message, type = "success") {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
  toast.innerHTML = `<span>${icon}</span> ${message}`;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ── Format currency (INR) ──
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format(amount);
}

// ── Format date ──
function formatDate(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Truncate text ──
function truncate(str, len = 100) {
  return str && str.length > len ? str.slice(0, len) + "…" : str;
}

// ── Debounce ──
function debounce(fn, ms = 300) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// ── Navbar scroll behaviour ──
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const isTransparent = navbar.classList.contains("nav-transparent");

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
      if (isTransparent) navbar.classList.remove("nav-transparent");
    } else {
      navbar.classList.remove("scrolled");
      if (isTransparent) navbar.classList.add("nav-transparent");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hamburger menu
  const burger  = document.querySelector(".hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (burger && mobileNav) {
    burger.addEventListener("click", () => mobileNav.classList.toggle("open"));
    mobileNav.querySelector(".mobile-nav-backdrop")?.addEventListener("click", () => mobileNav.classList.remove("open"));
    mobileNav.querySelector(".mobile-nav-close")?.addEventListener("click",    () => mobileNav.classList.remove("open"));
  }
}

// ── Scroll-reveal animation ──
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("animate-up"); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ── Remove loading overlay ──
function hideLoading() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) { overlay.classList.add("hidden"); setTimeout(() => overlay.remove(), 500); }
}

// ── Generate star rating HTML ──
function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let html = "";
  for (let i = 0; i < 5; i++) {
    if (i < full)        html += "★";
    else if (i === full && half) html += "½";
    else                 html += "☆";
  }
  return `<span class="stars">${html}</span> <span>${rating.toFixed(1)}</span>`;
}

// ── Hall card template ──
function hallCardHTML(hall, id) {
  const amenityTags = (hall.amenities || []).slice(0, 3).map(a => `<span class="tag">${a}</span>`).join("");
  const featuredBadge = hall.isFeatured ? `<span class="card-badge featured">⭐ Featured</span>` : `<span class="card-badge">Available</span>`;
  return `
    <div class="hall-card reveal" data-id="${id}">
      <div class="card-image">
        <img src="${hall.coverImage}" alt="${hall.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600'">
        ${featuredBadge}
        <button class="card-fav" data-id="${id}" onclick="toggleFav(event,'${id}')">🤍</button>
      </div>
      <div class="card-body">
        <h3 class="card-title">${hall.name}</h3>
        <p class="card-location">📍 ${hall.locality}, ${hall.city}</p>
        <div class="card-meta">
          <span class="card-meta-item">👥 ${hall.capacity.toLocaleString()} guests</span>
          <span class="card-meta-item">${hall.isAC ? "❄️ AC" : "🌀 Non-AC"}</span>
          <span class="card-meta-item">${hall.isIndoor ? "🏛️ Indoor" : "🌿 Outdoor"}</span>
        </div>
        <div class="card-amenities">${amenityTags}</div>
        <div class="card-footer">
          <div class="card-price">
            <span class="amount">${formatINR(hall.price)}</span>
            <span class="per"> / function</span>
          </div>
          <div class="card-actions">
            <a href="hall-details.html?id=${id}" class="btn btn-primary btn-sm">View</a>
            <a href="hall-details.html?id=${id}#enquiry" class="btn btn-outline btn-sm">Enquire</a>
          </div>
        </div>
      </div>
    </div>`;
}

// ── Vendor card template ──
function vendorCardHTML(vendor, id) {
  return `
    <div class="vendor-card reveal">
      <img src="${vendor.profileImage}" alt="${vendor.name}" class="vendor-avatar" onerror="this.src='https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200'">
      <div class="vendor-name">${vendor.name}</div>
      <div class="vendor-category">${vendor.category.toUpperCase()}</div>
      <div class="vendor-rating">${starsHTML(vendor.rating || 4.5)} (${vendor.reviewCount || 0})</div>
      <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:16px">${truncate(vendor.description, 80)}</p>
      <a href="vendors.html?id=${id}" class="btn btn-outline btn-sm w-100">View Profile</a>
    </div>`;
}

// ── Toggle favourite (requires auth) ──
async function toggleFav(event, hallId) {
  event.preventDefault();
  event.stopPropagation();
  const user = auth.currentUser;
  if (!user) { showToast("Please login to save favourites", "error"); return; }
  const btn = event.currentTarget;
  const isActive = btn.classList.contains("active");
  try {
    if (isActive) {
      const snap = await db.collection("favorites")
        .where("userId", "==", user.uid).where("hallId", "==", hallId).get();
      snap.forEach(d => d.ref.delete());
      btn.textContent = "🤍";
      btn.classList.remove("active");
      showToast("Removed from favourites");
    } else {
      await db.collection("favorites").add({ userId: user.uid, hallId, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      btn.textContent = "❤️";
      btn.classList.add("active");
      showToast("Saved to favourites ❤️");
    }
  } catch (e) { showToast("Error updating favourites", "error"); }
}

// ── Init on DOM ready ──
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initScrollReveal();
  initNavAuth();
  setTimeout(hideLoading, 600);
});
