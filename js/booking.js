/* ============================================================
   SHAADI VENUE - Booking & Enquiry Module
   ============================================================ */

// ── Hall Detail Page Loader ──
async function loadHallDetail() {
  const params = new URLSearchParams(window.location.search);
  const hallId = params.get("id");
  if (!hallId) { window.location.href = "halls.html"; return; }

  try {
    const doc = await db.collection("halls").doc(hallId).get();
    if (!doc.exists) { showToast("Hall not found", "error"); return; }

    const hall = doc.data();
    renderHallDetail(hall, hallId);
    prefillEnquiryForm(hall, hallId);
  } catch (err) {
    console.error(err);
    showToast("Error loading hall details", "error");
  }
}

function renderHallDetail(hall, hallId) {
  // Title & breadcrumb
  document.title = `${hall.name} — Shaadi Hall`;
  const nameEl = document.getElementById("hall-name");
  if (nameEl) nameEl.textContent = hall.name;
  const bcEl = document.getElementById("breadcrumb-name");
  if (bcEl) bcEl.textContent = hall.name;

  // Gallery
  const mainImg = document.getElementById("gallery-main-img");
  const thumbsEl = document.getElementById("gallery-thumbs");
  const allImages = [hall.coverImage, ...(hall.gallery || [])].filter(Boolean);

  if (mainImg) mainImg.src = allImages[0] || "";

  if (thumbsEl) {
    thumbsEl.innerHTML = allImages.map((img, i) => `
      <div class="gallery-thumb ${i === 0 ? "active" : ""}" onclick="switchGallery(this, '${img}')">
        <img src="${img}" alt="Gallery ${i+1}" loading="lazy">
      </div>`).join("");
  }

  // Fields
  setText("hall-locality",     `📍 ${hall.locality}, ${hall.city}`);
  setText("hall-price",        formatINR(hall.price));
  setText("hall-capacity",     `${hall.capacity.toLocaleString()} guests`);
  setText("hall-address",      hall.address);
  setText("hall-description",  hall.description);
  setText("hall-ac",           hall.isAC ? "Air Conditioned" : "Non-AC");
  setText("hall-type",         hall.isIndoor ? "Indoor" : "Outdoor");
  setText("hall-veg",          hall.isVeg ? "Veg Only" : "Veg & Non-Veg");
  setText("hall-rooms",        `${hall.roomsCount} rooms`);
  setText("hall-dining",       hall.hasDining ? "Available" : "Not Available");
  setText("hall-parking",      hall.hasParking ? "Available" : "Not Available");
  setText("hall-rating",       `${hall.rating?.toFixed(1) || "—"} ★`);

  // Amenities
  const amenEl = document.getElementById("hall-amenities");
  if (amenEl && hall.amenities) {
    amenEl.innerHTML = hall.amenities.map(a => `
      <div class="amenity-item">
        <span class="amenity-icon">✓</span> <span>${a}</span>
      </div>`).join("");
  }

  // Maps
  const mapLink = document.getElementById("maps-link");
  if (mapLink && hall.mapsLink) { mapLink.href = hall.mapsLink; }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function switchGallery(thumb, src) {
  document.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
  thumb.classList.add("active");
  const mainImg = document.getElementById("gallery-main-img");
  if (mainImg) mainImg.src = src;
}

function prefillEnquiryForm(hall, hallId) {
  const hallNameInput = document.getElementById("enq-hall-name");
  const hallIdInput   = document.getElementById("enq-hall-id");
  if (hallNameInput) hallNameInput.value = hall.name;
  if (hallIdInput)   hallIdInput.value   = hallId;

  // Prefill user data if logged in
  auth.onAuthStateChanged(async (user) => {
    if (!user) return;
    const data = await AuthModule.getCurrentUserData();
    if (data) {
      setVal("enq-name",  data.name);
      setVal("enq-phone", data.phone);
      setVal("enq-email", data.email);
    }
  });
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || "";
}

// ── Submit Enquiry ──
async function submitEnquiry(event) {
  event.preventDefault();
  const btn = event.target.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Sending...";

  const data = {
    customerName: document.getElementById("enq-name")?.value.trim(),
    phone:        document.getElementById("enq-phone")?.value.trim(),
    email:        document.getElementById("enq-email")?.value.trim(),
    hallId:       document.getElementById("enq-hall-id")?.value,
    hallName:     document.getElementById("enq-hall-name")?.value,
    eventDate:    document.getElementById("enq-date")?.value,
    eventType:    document.getElementById("enq-event-type")?.value,
    guestCount:   parseInt(document.getElementById("enq-guests")?.value) || 0,
    message:      document.getElementById("enq-message")?.value.trim(),
    status:       "new",
    createdAt:    firebase.firestore.FieldValue.serverTimestamp()
  };

  if (!data.customerName || !data.phone || !data.hallId) {
    showToast("Please fill all required fields", "error");
    btn.disabled = false; btn.textContent = "Send Enquiry";
    return;
  }

  try {
    // Save enquiry
    await db.collection("enquiries").add(data);

    // If logged in, also save as booking
    const user = auth.currentUser;
    if (user) {
      await db.collection("bookings").add({
        ...data,
        customerId: user.uid,
        status: "pending",
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    showToast("Enquiry sent! The hall will contact you soon. 🎉");
    event.target.reset();
    document.getElementById("enq-hall-name") && (document.getElementById("enq-hall-name").value = data.hallName);
    document.getElementById("enq-hall-id")   && (document.getElementById("enq-hall-id").value   = data.hallId);
  } catch (err) {
    showToast("Error sending enquiry: " + err.message, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Send Enquiry";
  }
}

// ── Contact Page ──
async function submitContact(event) {
  event.preventDefault();
  const data = {
    name:      document.getElementById("ct-name")?.value.trim(),
    email:     document.getElementById("ct-email")?.value.trim(),
    phone:     document.getElementById("ct-phone")?.value.trim(),
    subject:   document.getElementById("ct-subject")?.value.trim(),
    message:   document.getElementById("ct-message")?.value.trim(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  try {
    await db.collection("contacts").add(data);
    showToast("Message sent! We'll get back to you shortly.");
    event.target.reset();
  } catch (err) {
    showToast("Error: " + err.message, "error");
  }
}
