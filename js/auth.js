/* ============================================================
   SHAADI VENUE - Authentication Module
   ============================================================ */

const AuthModule = (() => {

  // ── Get current user's role from Firestore ──
  async function getUserRole(uid) {
    const snap = await db.collection("users").doc(uid).get();
    return snap.exists ? snap.data().role : null;
  }

  // ── Get current user data ──
  async function getCurrentUserData() {
    const user = auth.currentUser;
    if (!user) return null;
    const snap = await db.collection("users").doc(user.uid).get();
    return snap.exists ? snap.data() : null;
  }

  // ── Customer / Vendor Register ──
  async function register(name, email, password, phone, role = "customer") {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("users").doc(cred.user.uid).set({
      uid:       cred.user.uid,
      name,
      email,
      phone:     phone || "",
      role,
      isActive:  true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return cred.user;
  }

  // ── Login with role check ──
  async function login(email, password, expectedRole) {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    const role  = await getUserRole(cred.user.uid);
    if (expectedRole && role !== expectedRole) {
      await auth.signOut();
      throw new Error(`Access denied. This login is for ${expectedRole}s only.`);
    }
    return { user: cred.user, role };
  }

  // ── Logout ──
  async function logout() {
    await auth.signOut();
    window.location.href = "index.html";
  }

  // ── Guard: redirect if not logged in with expected role ──
  function requireRole(expectedRole, redirectTo) {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          window.location.href = redirectTo || "index.html";
          return;
        }
        const role = await getUserRole(user.uid);
        if (role !== expectedRole) {
          window.location.href = redirectTo || "index.html";
          return;
        }
        resolve({ user, role });
      });
    });
  }

  // ── Guard: redirect if already logged in ──
  function redirectIfLoggedIn(targetUrl) {
    auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const role = await getUserRole(user.uid);
      if (role === "admin")    window.location.href = targetUrl || "admin-dashboard.html";
      else if (role === "vendor")   window.location.href = "vendor-dashboard.html";
      else if (role === "customer") window.location.href = "customer-dashboard.html";
    });
  }

  return { register, login, logout, getUserRole, getCurrentUserData, requireRole, redirectIfLoggedIn };
})();


/* ============================================================
   Global Navbar Auth State
   ============================================================ */
function initNavAuth() {
  auth.onAuthStateChanged(async (user) => {
    const loginBtn  = document.getElementById("nav-login-btn");
    const userMenu  = document.getElementById("nav-user-menu");
    const userName  = document.getElementById("nav-user-name");

    if (user) {
      const data = await AuthModule.getCurrentUserData();
      if (loginBtn)  loginBtn.style.display  = "none";
      if (userMenu)  userMenu.style.display  = "flex";
      if (userName && data) userName.textContent = data.name;
    } else {
      if (loginBtn)  loginBtn.style.display  = "";
      if (userMenu)  userMenu.style.display  = "none";
    }
  });
}
