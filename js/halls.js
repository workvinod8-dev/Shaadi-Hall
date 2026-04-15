/* ============================================================
   SHAADI VENUE - Halls Listing JS
   ============================================================ */

let allHalls = [];
let filteredHalls = [];

async function loadHalls() {
  const grid = document.getElementById("halls-grid");
  const countEl = document.getElementById("halls-count");
  grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px"><div class="loader" style="margin:auto"></div></div>`;

  try {
    const snap = await db.collection("halls").get(); // fetch all, sort client-side
    allHalls = [];
    snap.forEach(doc => allHalls.push({ id: doc.id, ...doc.data() }));
    // Sort client-side: featured first, then by rating (avoids Firestore composite index requirement)
    allHalls.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
    filteredHalls = [...allHalls];
    renderHalls();
    if (countEl) countEl.textContent = allHalls.length;
  } catch (err) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🏛️</div><div class="empty-state-title">Could not load halls</div><p>${err.message}</p></div>`;
  }
}

function renderHalls() {
  const grid = document.getElementById("halls-grid");
  const countEl = document.getElementById("halls-count");
  if (filteredHalls.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔍</div><div class="empty-state-title">No halls found</div><p class="empty-state-text">Try adjusting your filters</p></div>`;
    if (countEl) countEl.textContent = 0;
    return;
  }
  if (countEl) countEl.textContent = filteredHalls.length;
  grid.innerHTML = filteredHalls.map(h => hallCardHTML(h, h.id)).join("");
  initScrollReveal();
}

function applyFilters() {
  const city       = document.getElementById("filter-city")?.value  || "";
  const acFilter   = document.getElementById("filter-ac")?.value    || "";
  const maxPrice   = parseInt(document.getElementById("filter-price")?.value) || Infinity;
  const minCap     = parseInt(document.getElementById("filter-cap")?.value)   || 0;
  const search     = document.getElementById("search-query")?.value.toLowerCase() || "";
  const sortBy     = document.getElementById("sort-by")?.value || "featured";

  filteredHalls = allHalls.filter(h => {
    if (city     && h.city !== city) return false;
    if (acFilter === "ac"    && !h.isAC) return false;
    if (acFilter === "nonac" &&  h.isAC) return false;
    if (h.price > maxPrice)  return false;
    if (h.capacity < minCap) return false;
    if (search && !h.name.toLowerCase().includes(search) && !h.locality.toLowerCase().includes(search)) return false;
    return true;
  });

  // Sort
  if (sortBy === "price-asc")  filteredHalls.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filteredHalls.sort((a, b) => b.price - a.price);
  if (sortBy === "cap-desc")   filteredHalls.sort((a, b) => b.capacity - a.capacity);
  if (sortBy === "rating")     filteredHalls.sort((a, b) => b.rating - a.rating);
  if (sortBy === "featured")   filteredHalls.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

  renderHalls();
}

document.addEventListener("DOMContentLoaded", () => {
  loadHalls();

  // Attach filter listeners
  ["filter-city","filter-ac","filter-price","filter-cap","sort-by"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", applyFilters);
  });
  document.getElementById("search-query")?.addEventListener("input", debounce(applyFilters, 400));
  document.getElementById("filter-btn")?.addEventListener("click", applyFilters);
  document.getElementById("reset-btn")?.addEventListener("click", () => {
    ["filter-city","filter-ac","filter-price","filter-cap","sort-by"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = el.tagName === "SELECT" ? el.options[0].value : "";
    });
    const sq = document.getElementById("search-query");
    if (sq) sq.value = "";
    applyFilters();
  });
});
