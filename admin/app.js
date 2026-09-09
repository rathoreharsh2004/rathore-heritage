// ==========================================================================
// RATHORE HERITAGE DEVELOPERS — ADMIN CMS CONTROLLER
// Complete REST API Integration with MongoDB Atlas
// ==========================================================================

const API = window.API_URL || "http://localhost:5000/api";
let token = localStorage.getItem("rh_admin_token");
let currentSite = null;
let currentProjects = [];
let currentCraftsmanship = [];
let currentServices = [];
let currentEnquiries = [];

// ==================== AUTHENTICATION ====================
function authHeaders() {
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const btn = document.getElementById("loginBtn");

  btn.textContent = "VERIFYING CREDENTIALS...";
  btn.disabled = true;

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok && data.token) {
      token = data.token;
      localStorage.setItem("rh_admin_token", token);
      showApp();
    } else {
      alert(data.message || "Invalid credentials.");
    }
  } catch (err) {
    alert("Could not connect to API at " + API + ". Please ensure the backend server is running.");
  } finally {
    btn.textContent = "SIGN IN TO CMS →";
    btn.disabled = false;
  }
}

function logout() {
  localStorage.removeItem("rh_admin_token");
  token = null;
  location.reload();
}

// ==================== TAB NAVIGATION ====================
function switchTab(tabId) {
  document.querySelectorAll(".sidebar-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tabId);
  });
  document.querySelectorAll(".tab-pane").forEach(p => {
    p.classList.add("hidden");
  });

  const targetPane = document.getElementById(`tab-${tabId}`);
  if (targetPane) targetPane.classList.remove("hidden");

  // Titles
  const titles = {
    dashboard: { title: "Dashboard", sub: "System metrics and database controls." },
    content: { title: "Website Content", sub: "Manage hero, about, philosophy, and brand contact info." },
    projects: { title: "Signature Projects", sub: "Manage portfolio projects, architectural elements, and galleries." },
    craftsmanship: { title: "Craftsmanship", sub: "Traditional artisan crafts from PDF Page 3." },
    services: { title: "What We Offer", sub: "Core service capabilities from PDF Page 12." },
    enquiries: { title: "Customer Enquiries", sub: "Inbound client consultation and construction requests." },
    uploader: { title: "Image Manager", sub: "Persistent image storage with instant preview." }
  };

  if (titles[tabId]) {
    document.getElementById("pageTitle").textContent = titles[tabId].title;
    document.getElementById("pageSubtitle").textContent = titles[tabId].sub;
  }
}

// ==================== SHOW APP & DATA FETCH ====================
async function showApp() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  
  await refreshStats();
  await loadSiteContent();
  await loadProjects();
  await loadCraftsmanship();
  await loadServices();
  await loadEnquiries();
}

async function refreshStats() {
  try {
    const res = await fetch(`${API}/admin/stats`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Stats fetch failed");
    const data = await res.json();

    document.getElementById("statProjects").textContent = data.totalProjects || 0;
    document.getElementById("statImages").textContent = data.totalImages || 0;
    document.getElementById("statEnquiries").textContent = data.totalEnquiries || 0;
    document.getElementById("statNewEnquiries").textContent = data.newEnquiries || 0;
    document.getElementById("newBadge").textContent = data.newEnquiries || 0;

    const dbBadge = document.getElementById("dbStatus");
    if (data.dbConnected) {
      dbBadge.className = "db-status-badge";
      dbBadge.innerHTML = "<span>●</span> MongoDB Connected (Live)";
    } else {
      dbBadge.className = "db-status-badge offline";
      dbBadge.innerHTML = "<span>●</span> Local Storage (Atlas Sync Pending)";
    }
  } catch (e) {
    console.warn("Stats refresh error:", e);
  }
}

// ==================== WEBSITE CONTENT MANAGEMENT ====================
async function loadSiteContent() {
  try {
    const res = await fetch(`${API}/admin/site`, { headers: authHeaders() });
    if (!res.ok) throw new Error();
    currentSite = await res.json();

    document.getElementById("cfgEyebrow").value = currentSite.heroEyebrow || "";
    document.getElementById("cfgHeroTitle").value = currentSite.heroTitle || "";
    document.getElementById("cfgHeroSubtitle").value = currentSite.heroSubtitle || "";
    document.getElementById("cfgHeroImage").value = currentSite.heroImage || "";
    document.getElementById("cfgAboutTitle").value = currentSite.aboutTitle || "";
    document.getElementById("cfgAboutContent").value = currentSite.aboutContent || "";
    document.getElementById("cfgAboutImage").value = currentSite.aboutImage || "";
    document.getElementById("cfgPhone").value = currentSite.contactPhone || "";
    document.getElementById("cfgEmail").value = currentSite.contactEmail || "";
    document.getElementById("cfgInstagram").value = currentSite.instagram || "";
    document.getElementById("cfgBrandStatement").value = currentSite.brandStatement || "";
    document.getElementById("cfgFooterMotto").value = currentSite.footerMotto || "";
  } catch (e) {
    console.warn("Load site content error:", e);
  }
}

async function saveSiteSettings() {
  const updateData = {
    heroEyebrow: document.getElementById("cfgEyebrow").value,
    heroTitle: document.getElementById("cfgHeroTitle").value,
    heroSubtitle: document.getElementById("cfgHeroSubtitle").value,
    heroImage: document.getElementById("cfgHeroImage").value,
    aboutTitle: document.getElementById("cfgAboutTitle").value,
    aboutContent: document.getElementById("cfgAboutContent").value,
    aboutImage: document.getElementById("cfgAboutImage").value,
    contactPhone: document.getElementById("cfgPhone").value,
    contactEmail: document.getElementById("cfgEmail").value,
    instagram: document.getElementById("cfgInstagram").value,
    brandStatement: document.getElementById("cfgBrandStatement").value,
    footerMotto: document.getElementById("cfgFooterMotto").value
  };

  try {
    const res = await fetch(`${API}/admin/site`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(updateData)
    });
    if (!res.ok) throw new Error("Save failed");
    alert("✅ Website content saved to MongoDB successfully!");
  } catch (e) {
    alert("❌ Error saving content: " + e.message);
  }
}

// ==================== PROJECTS MANAGEMENT ====================
async function loadProjects() {
  try {
    const res = await fetch(`${API}/admin/projects`, { headers: authHeaders() });
    if (!res.ok) throw new Error();
    currentProjects = await res.json();
    renderProjectsTable(currentProjects);
  } catch (e) {
    console.warn("Load projects error:", e);
  }
}

function renderProjectsTable(projects) {
  const tbody = document.getElementById("projectsTableBody");
  if (!projects || projects.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:30px;">No projects found. Click "+ Add Project" to create one.</td></tr>`;
    return;
  }

  tbody.innerHTML = projects.map((p, idx) => `
    <tr>
      <td>
        <img src="${p.featuredImage || 'assets/hero-bg.jpg'}" class="proj-row-thumb" alt="${escapeHtml(p.name)}" onerror="this.src='assets/hero-bg.jpg'">
      </td>
      <td><strong>${escapeHtml(p.name)}</strong></td>
      <td>${escapeHtml(p.type)}</td>
      <td>${escapeHtml(p.location || 'Udaipur')}</td>
      <td>${p.architecturalElements ? p.architecturalElements.length : 0} elements</td>
      <td>${p.galleryImages ? p.galleryImages.length : 0} photos</td>
      <td>
        <div class="table-actions">
          <button class="btn-action-edit" onclick="openEditProjectModal(${idx})">Edit</button>
          <button class="btn-action-delete" onclick="deleteProject('${p._id || p.slug}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
}

// Project Modal Handling
function openNewProjectModal() {
  document.getElementById("modalProjectTitle").textContent = "Add Signature Project";
  document.getElementById("pId").value = "";
  document.getElementById("pName").value = "";
  document.getElementById("pSlug").value = "";
  document.getElementById("pType").value = "Heritage Haveli Construction";
  document.getElementById("pLocation").value = "Udaipur";
  document.getElementById("pFeaturedImage").value = "assets/hero-bg.jpg";
  document.getElementById("pShortDescription").value = "";
  document.getElementById("pFullDescription").value = "";
  document.getElementById("archElementsContainer").innerHTML = "";
  document.getElementById("galleryContainer").innerHTML = "";

  addArchElementBlock("Grand Heritage Entry (Dodi)", "A grand traditional entrance gate creating a royal impression.");
  addGalleryImageBlock("assets/hero-bg.jpg", "Architectural Front View");

  document.getElementById("projectModal").classList.remove("hidden");
}

function openEditProjectModal(index) {
  const p = currentProjects[index];
  if (!p) return;

  document.getElementById("modalProjectTitle").textContent = `Edit Project: ${p.name}`;
  document.getElementById("pId").value = p._id || p.slug;
  document.getElementById("pName").value = p.name || "";
  document.getElementById("pSlug").value = p.slug || "";
  document.getElementById("pType").value = p.type || "";
  document.getElementById("pLocation").value = p.location || "Udaipur";
  document.getElementById("pFeaturedImage").value = p.featuredImage || "";
  document.getElementById("pShortDescription").value = p.shortDescription || "";
  document.getElementById("pFullDescription").value = p.fullDescription || "";

  // Render Architectural Elements
  const archContainer = document.getElementById("archElementsContainer");
  archContainer.innerHTML = "";
  if (p.architecturalElements && p.architecturalElements.length > 0) {
    p.architecturalElements.forEach(elem => {
      addArchElementBlock(elem.title, elem.description);
    });
  } else {
    addArchElementBlock();
  }

  // Render Gallery
  const galContainer = document.getElementById("galleryContainer");
  galContainer.innerHTML = "";
  if (p.galleryImages && p.galleryImages.length > 0) {
    p.galleryImages.forEach(img => {
      addGalleryImageBlock(img.url, img.caption);
    });
  } else {
    addGalleryImageBlock();
  }

  document.getElementById("projectModal").classList.remove("hidden");
}

function closeProjectModal() {
  document.getElementById("projectModal").classList.add("hidden");
}

function addArchElementBlock(title = "", desc = "") {
  const container = document.getElementById("archElementsContainer");
  const block = document.createElement("div");
  block.className = "element-block arch-item";
  block.innerHTML = `
    <button type="button" class="btn-remove-elem" onclick="this.parentElement.remove()">&times;</button>
    <div style="margin-bottom:8px;">
      <label style="font-size:11px;color:var(--text-muted);">Element Title</label>
      <input type="text" class="elem-title" value="${escapeHtml(title)}" placeholder="e.g. Mor Pankh Ceiling Work">
    </div>
    <div>
      <label style="font-size:11px;color:var(--text-muted);">Description</label>
      <textarea class="elem-desc" rows="2" placeholder="Details of craftsmanship, materials, and architectural execution...">${escapeHtml(desc)}</textarea>
    </div>
  `;
  container.appendChild(block);
}

function addGalleryImageBlock(url = "", caption = "") {
  const container = document.getElementById("galleryContainer");
  const block = document.createElement("div");
  block.className = "element-block gallery-item";
  block.innerHTML = `
    <button type="button" class="btn-remove-elem" onclick="this.parentElement.remove()">&times;</button>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div>
        <label style="font-size:11px;color:var(--text-muted);">Image URL</label>
        <input type="text" class="gal-url" value="${escapeHtml(url)}" placeholder="assets/projects.jpg or https://...">
      </div>
      <div>
        <label style="font-size:11px;color:var(--text-muted);">Caption</label>
        <input type="text" class="gal-caption" value="${escapeHtml(caption)}" placeholder="e.g. Traditional Jharokha Facade">
      </div>
    </div>
  `;
  container.appendChild(block);
}

async function handleSaveProject(e) {
  e.preventDefault();
  const id = document.getElementById("pId").value;
  const name = document.getElementById("pName").value.trim();
  const slug = document.getElementById("pSlug").value.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const type = document.getElementById("pType").value.trim();
  const location = document.getElementById("pLocation").value.trim();
  const featuredImage = document.getElementById("pFeaturedImage").value.trim();
  const shortDescription = document.getElementById("pShortDescription").value.trim();
  const fullDescription = document.getElementById("pFullDescription").value.trim();

  // Collect architectural elements
  const architecturalElements = [];
  document.querySelectorAll(".arch-item").forEach(block => {
    const t = block.querySelector(".elem-title").value.trim();
    const d = block.querySelector(".elem-desc").value.trim();
    if (t) architecturalElements.push({ title: t, description: d });
  });

  // Collect gallery images
  const galleryImages = [];
  document.querySelectorAll(".gallery-item").forEach(block => {
    const u = block.querySelector(".gal-url").value.trim();
    const c = block.querySelector(".gal-caption").value.trim();
    if (u) galleryImages.push({ url: u, caption: c, alt: name });
  });

  const payload = {
    name,
    slug,
    type,
    location,
    featuredImage,
    shortDescription,
    fullDescription,
    architecturalElements,
    galleryImages,
    published: true
  };

  try {
    let res;
    if (id) {
      res = await fetch(`${API}/admin/projects/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });
    } else {
      res = await fetch(`${API}/admin/projects`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });
    }

    if (!res.ok) throw new Error("Project save failed");
    alert("✅ Project saved successfully!");
    closeProjectModal();
    await loadProjects();
    await refreshStats();
  } catch (err) {
    alert("❌ Error saving project: " + err.message);
  }
}

async function deleteProject(id) {
  if (!confirm("Are you sure you want to permanently delete this project?")) return;

  try {
    const res = await fetch(`${API}/admin/projects/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    });
    if (!res.ok) throw new Error("Delete failed");
    alert("Project deleted.");
    await loadProjects();
    await refreshStats();
  } catch (e) {
    alert("Error deleting project: " + e.message);
  }
}

// ==================== CRAFTSMANSHIP & SERVICES ====================
async function loadCraftsmanship() {
  try {
    const res = await fetch(`${API}/craftsmanship`);
    if (!res.ok) throw new Error();
    currentCraftsmanship = await res.json();
    const container = document.getElementById("craftList");
    container.innerHTML = currentCraftsmanship.map((c, i) => `
      <div class="element-block">
        <div style="display:grid;grid-template-columns:40px 1fr;gap:12px;align-items:center;">
          <input type="text" id="cIcon${i}" value="${c.icon || '🏛️'}" style="text-align:center;">
          <input type="text" id="cTitle${i}" value="${escapeHtml(c.title || '')}" style="font-weight:600;">
        </div>
        <input type="text" id="cDesc${i}" value="${escapeHtml(c.description || '')}" placeholder="Description" style="margin-top:8px;">
      </div>
    `).join("");

    if (currentSite) {
      document.getElementById("cfgCraftClosing").value = currentSite.craftsmanshipClosing || "";
    }
  } catch (e) {
    console.warn("Load craftsmanship error:", e);
  }
}

async function saveCraftsmanship() {
  const items = currentCraftsmanship.map((c, i) => ({
    title: document.getElementById(`cTitle${i}`).value,
    description: document.getElementById(`cDesc${i}`).value,
    icon: document.getElementById(`cIcon${i}`).value,
    order: i + 1
  }));

  const closingText = document.getElementById("cfgCraftClosing").value;

  try {
    await fetch(`${API}/admin/craftsmanship`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ items })
    });
    await fetch(`${API}/admin/site`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ craftsmanshipClosing: closingText })
    });
    alert("✅ Craftsmanship items saved!");
  } catch (e) {
    alert("Error saving craftsmanship: " + e.message);
  }
}

async function loadServices() {
  try {
    const res = await fetch(`${API}/services`);
    if (!res.ok) throw new Error();
    currentServices = await res.json();
    const container = document.getElementById("servicesList");
    container.innerHTML = currentServices.map((s, i) => `
      <div class="element-block">
        <div style="display:grid;grid-template-columns:40px 1fr;gap:12px;align-items:center;">
          <input type="text" id="sIcon${i}" value="${s.icon || '🏰'}" style="text-align:center;">
          <input type="text" id="sTitle${i}" value="${escapeHtml(s.title || '')}" style="font-weight:600;">
        </div>
        <textarea id="sDesc${i}" rows="2" style="margin-top:8px;">${escapeHtml(s.description || '')}</textarea>
      </div>
    `).join("");
  } catch (e) {
    console.warn("Load services error:", e);
  }
}

async function saveServices() {
  const items = currentServices.map((s, i) => ({
    title: document.getElementById(`sTitle${i}`).value,
    description: document.getElementById(`sDesc${i}`).value,
    icon: document.getElementById(`sIcon${i}`).value,
    order: i + 1
  }));

  try {
    await fetch(`${API}/admin/services`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ items })
    });
    alert("✅ Services saved successfully!");
  } catch (e) {
    alert("Error saving services: " + e.message);
  }
}

// ==================== ENQUIRIES MANAGEMENT ====================
async function loadEnquiries() {
  try {
    const res = await fetch(`${API}/admin/enquiries`, { headers: authHeaders() });
    if (!res.ok) throw new Error();
    currentEnquiries = await res.json();
    renderEnquiries(currentEnquiries);
  } catch (e) {
    console.warn("Load enquiries error:", e);
  }
}

function renderEnquiries(enquiries) {
  const container = document.getElementById("enquiriesList");
  if (!enquiries || enquiries.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:30px;">No customer enquiries yet. Submissions from the website will appear here.</p>`;
    return;
  }

  container.innerHTML = enquiries.map(enq => `
    <div class="element-block" style="border-left:4px solid ${enq.status === 'new' ? '#e67e22' : '#27ae60'};">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
        <div>
          <strong style="font-size:16px;color:var(--text-main);">${escapeHtml(enq.name)}</strong>
          <span style="font-size:12px;color:var(--gold-light);margin-left:8px;">(${escapeHtml(enq.projectType)})</span>
        </div>
        <span style="font-size:11px;color:var(--text-dim);">${new Date(enq.createdAt).toLocaleDateString()}</span>
      </div>

      <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">
        📞 <a href="tel:${enq.phone}" style="color:var(--text-main);text-decoration:none;">${escapeHtml(enq.phone)}</a> &bull; 
        ✉️ <a href="mailto:${enq.email}" style="color:var(--text-main);text-decoration:none;">${escapeHtml(enq.email || 'No email')}</a>
      </div>

      <p style="font-size:14px;color:var(--text-main);background:rgba(0,0,0,0.2);padding:10px 14px;border-radius:6px;margin-bottom:12px;">
        "${escapeHtml(enq.message || 'No specific notes entered.')}"
      </p>

      <div style="display:flex;align-items:center;gap:12px;">
        <label style="font-size:11px;color:var(--text-muted);">Status:</label>
        <select onchange="updateEnquiryStatus('${enq._id}', this.value)" style="width:auto;padding:6px 10px;font-size:12px;">
          <option value="new" ${enq.status === 'new' ? 'selected' : ''}>🟠 New</option>
          <option value="contacted" ${enq.status === 'contacted' ? 'selected' : ''}>🔵 Contacted</option>
          <option value="closed" ${enq.status === 'closed' ? 'selected' : ''}>🟢 Closed</option>
        </select>
        <button class="btn-action-delete" style="margin-left:auto;" onclick="deleteEnquiry('${enq._id}')">Delete</button>
      </div>
    </div>
  `).join("");
}

async function updateEnquiryStatus(id, status) {
  try {
    await fetch(`${API}/admin/enquiries/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ status })
    });
    await loadEnquiries();
    await refreshStats();
  } catch (e) {
    alert("Error updating status: " + e.message);
  }
}

async function deleteEnquiry(id) {
  if (!confirm("Delete this enquiry?")) return;
  try {
    await fetch(`${API}/admin/enquiries/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    });
    await loadEnquiries();
    await refreshStats();
  } catch (e) {
    alert("Error deleting enquiry: " + e.message);
  }
}

// ==================== IMAGE UPLOADER ====================
async function handleImageUpload(e) {
  e.preventDefault();
  const fileInput = document.getElementById("imageFileInput");
  if (!fileInput.files || fileInput.files.length === 0) return;

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  try {
    const res = await fetch(`${API}/admin/upload`, {
      method: "POST",
      headers: token ? { "Authorization": `Bearer ${token}` } : {},
      body: formData
    });
    const data = await res.json();

    if (res.ok && data.url) {
      document.getElementById("uploadedUrlInput").value = data.url;
      document.getElementById("uploadedPreview").src = data.url;
      document.getElementById("uploadResult").classList.remove("hidden");
      alert("✅ Image uploaded successfully!");
      fileInput.value = "";
    } else {
      alert("Upload failed: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    alert("Upload error: " + err.message);
  }
}

function copyUploadedUrl() {
  const copyText = document.getElementById("uploadedUrlInput");
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
  alert("Copied URL to clipboard: " + copyText.value);
}

// Helper
function escapeHtml(x) {
  return String(x || "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

// Auto-login if token already in localStorage
if (token) {
  showApp();
}