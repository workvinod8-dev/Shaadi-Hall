/* ============================================================
   SHAADI VENUE - Vendors Listing JS
   ============================================================ */

let allVendors = [];

async function loadVendors(categoryFilter = "") {
  const grid = document.getElementById("vendors-grid");
  if (!grid) return;
  grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px"><div class="loader" style="margin:auto"></div></div>`;

  try {
    let query = db.collection("vendors").where("isApproved", "==", true).where("isActive", "==", true);
    const snap = await query.get();
    allVendors = [];
    snap.forEach(doc => allVendors.push({ id: doc.id, ...doc.data() }));

    const filtered = categoryFilter
      ? allVendors.filter(v => v.category === categoryFilter)
      : allVendors;

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🎭</div><div class="empty-state-title">No vendors found</div></div>`;
      return;
    }
    grid.innerHTML = filtered.map(v => vendorCardHTML(v, v.id)).join("");
    initScrollReveal();
  } catch (err) {
    grid.innerHTML = `<p style="color:red;text-align:center">Error: ${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadVendors();

  // Category tabs
  document.querySelectorAll(".cat-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      loadVendors(tab.dataset.category || "");
    });
  });
});
