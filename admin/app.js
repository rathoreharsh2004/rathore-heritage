// ==========================================================================
// RATHORE HERITAGE DEVELOPERS — ADMIN CMS CONTROLLER
// Complete REST API Integration with MongoDB Atlas
// ==========================================================================

let API = localStorage.getItem("rh_api_url") || window.API_URL || "http://localhost:5000/api";
let token = localStorage.getItem("rh_admin_token");
let isOfflineMode = localStorage.getItem("rh_offline_mode") === "true";

let currentSite = null;
let currentProjects = [];
let currentCraftsmanship = [];
let currentServices = [];
let currentEnquiries = [];

// ==================== DEFAULT PDF DATASETS (OFFLINE FALLBACK) ====================
const DEFAULT_SITE = {
  heroEyebrow: "HERITAGE RESTORATION • LUXURY HAVELIS • PALACE STYLE INTERIORS • RESORTS • HERITAGE CONSULTANCY",
  heroTitle: "Where timeless Indian\nheritage meets royal living.",
  heroSubtitle: "Preserving Royal Legacy Through Timeless Heritage Architecture.",
  heroImage: "assets/hero-bg.jpg",
  aboutTitle: "ABOUT RATHORE HERITAGE DEVELOPERS",
  aboutContent: "Rathore Heritage Developers specializes in authentic heritage construction with deep expertise in traditional architectural craftsmanship.\n\nWe design luxurious heritage spaces including havelis, villas, resorts, and palace-style interiors that reflect royal elegance and cultural authenticity.\n\nOur projects feature signature elements like Heritage Dodi entrances, Thekri glass work, heritage-style bars, intricately carved furniture, decorative pillars, and traditional Jhomer chandeliers.\n\nCeilings are artistically detailed with Mor Pankh (peacock feather) themes, along with authentic Pipla Patti and Tordi craftsmanship.\n\nWe also design Ghokda-style domes and marble borders with Khajur Patti detailing, preserving the true essence of heritage architecture.\n\nBy blending traditional artistry with strong civil engineering practices, we ensure strength, durability, and timeless beauty in every project.",
  aboutImage: "assets/about-heritage.jpg",
  craftsmanshipClosing: "We focus on every detail - from flooring to ceiling, lighting to furniture - to deliver a complete royal palace-style heritage experience.",
  contactPhone: "9414228829, 7850015839",
  contactEmail: "rathoreheritagedevelopers@gmail.com",
  instagram: "rh_heritagebuilds",
  brandStatement: "Preserving Royal Legacy Through Timeless Heritage Architecture.",
  footerMotto: "ROYAL • TIMELESS • AUTHENTIC • ARCHITECTURAL"
};

const DEFAULT_PROJECTS = [
  {
    name: "Oladar Haveli",
    slug: "oladar-haveli",
    location: "Udaipur",
    type: "Heritage Haveli Construction",
    shortDescription: "The Oladar Haveli project has been designed and executed in a complete traditional heritage style, while ensuring modern structural strength, quality control, and durability from foundation to final finishing.",
    fullDescription: "The Oladar Haveli project has been designed and executed in a complete traditional heritage style, while ensuring modern structural strength, quality control, and durability from foundation to final finishing.\n\nThe project combines traditional Rajasthani heritage architecture with modern civil engineering standards to ensure both aesthetic beauty and structural safety.\n\nThe Oladar Haveli project represents a perfect blend of traditional heritage craftsmanship and modern civil engineering quality standards, ensuring both royal elegance and long-term structural performance.",
    featuredImage: "assets/oladar-haveli-1.jpg",
    galleryImages: [
      { url: "assets/oladar-haveli-1.jpg", caption: "Grand Heritage Entry (Dodi / Main Entrance Gate)", alt: "Oladar Haveli Entrance Dodi" },
      { url: "assets/oladar-haveli-2.jpg", caption: "Traditional Jharokha Design & Architectural Facade", alt: "Oladar Haveli Facade" },
      { url: "assets/oladar-haveli-3.jpg", caption: "Ceiling Design – Mor Pankh Work & Thekri Glass", alt: "Oladar Haveli Ceiling Art" },
      { url: "assets/oladar-haveli-4.jpg", caption: "Ghokda Style Domes & Rooftop Heritage Bar", alt: "Oladar Haveli Terrace Domes" },
      { url: "assets/oladar-haveli-5.jpg", caption: "Heritage Carved Furniture & Jhomer Chandeliers", alt: "Oladar Haveli Interior Furniture" }
    ],
    architecturalElements: [
      { title: "Grand Heritage Entry (Dodi / Main Door)", description: "A grand traditional Heritage Dodi (Main Entrance Gate) has been constructed at the entrance, creating a royal first impression of the haveli." },
      { title: "Thekri Glass Work", description: "Intricate Thekri glass work has been executed on interior ceilings, inside decorative Aaliya, and in the heritage-style bar area. This glass inlay work enhances light reflection and gives a royal palace finish." },
      { title: "Ceiling Design – Mor Pankh Work", description: "The ceilings feature detailed Mor Pankh (Peacock Feather) themed artwork, reflecting traditional Rajasthani craftsmanship. The ceiling interiors have been intricately designed using traditional Pipla Patti and Tordi detailing, enhancing the authentic heritage aesthetic of the space." },
      { title: "Domes (Ghokda Style)", description: "Three domes have been constructed on the terrace level, locally known as Ghokda style domes to enhance traditional design and maintain authentic heritage architecture." },
      { title: "Heritage Bar & Staircase", description: "A heritage-style bar has been constructed on the terrace with rooftop sitting. The bar area includes detailed glass inlay work. The staircase design follows traditional architectural elements while maintaining safety and structural balance." },
      { title: "Flooring & Finishing", description: "Premium white marble flooring has been used throughout the haveli. Marble borders are finished with Khajur Patti detailing, enhancing the traditional appearance. Proper base preparation, leveling, and joint finishing were ensured for durability and long life." },
      { title: "Furniture & Interior Heritage Elements", description: "All rooms include Carving furniture with different authentic heritage styles. Behind each bed, a heritage-style decorative pillar has been installed on the wall, enhancing the royal ambiance. Each room features a heritage-style Jhomer (chandelier). The reception area includes three chandeliers (one large and two smaller) for a grand visual impact." }
    ]
  },
  {
    name: "Roopmahal",
    slug: "roopmahal",
    location: "Udaipur",
    type: "Luxury Heritage Villa",
    shortDescription: "A magnificent heritage-style project inspired by the timeless architecture of Rajasthan.",
    fullDescription: "Roop Mahal is a magnificent heritage-style project inspired by the timeless architecture of Rajasthan.\n\nThe exterior showcases beautifully crafted heritage-style windows, traditional arches, and elegant façade detailing that reflects the charm of royal havelis.\n\nThe space highlights intricate glass inlay work, artistic carvings, and classic heritage furniture that enhance the royal character of the project.\n\nEvery element, from the architectural details to the interior craftsmanship, has been thoughtfully designed to create an authentic heritage ambiance while maintaining luxury and elegance.",
    featuredImage: "assets/roop-mahal-1.jpg",
    galleryImages: [
      { url: "assets/roop-mahal-1.jpg", caption: "Heritage-style Windows, Traditional Arches & Facade", alt: "Roop Mahal Facade" }
    ],
    architecturalElements: [
      { title: "Architectural Windows & Arches", description: "Beautifully crafted heritage-style windows, traditional arches, and elegant façade detailing reflecting the charm of royal havelis." },
      { title: "Glass Inlay & Artistic Carvings", description: "Intricate glass inlay work, artistic stone and wood carvings, and classic heritage furniture that enhance royal character." }
    ]
  },
  {
    name: "Mohan Villa",
    slug: "mohan-villa",
    location: "Udaipur",
    type: "Heritage Style Villa / Farmhouse",
    shortDescription: "Luxurious heritage-style villa inspired by the traditional architecture of Rajasthani havelis.",
    fullDescription: "Mohan Villa is a luxurious heritage-style villa inspired by the traditional architecture of Rajasthani havelis.\n\nThe design showcases beautifully carved arches, decorative wall artwork, and vibrant stained glass windows that enhance natural light and create a royal ambiance.\n\nThe interiors feature intricately crafted heritage furniture with an antique silver finish, adding a palace-like elegance to the living spaces.\n\nElements such as traditional jharokha-style windows, detailed ceiling artwork, and handcrafted décor reflect the timeless craftsmanship and cultural richness of Rajasthan’s royal heritage.",
    featuredImage: "assets/mohan-villa-1.jpg",
    galleryImages: [
      { url: "assets/mohan-villa-1.jpg", caption: "Carved Arches, Stained Glass & Antique Silver Furniture", alt: "Mohan Villa Interior" }
    ],
    architecturalElements: [
      { title: "Carved Arches & Stained Glass", description: "Beautifully carved arches, decorative wall artwork, and vibrant stained glass windows that enhance natural light and create royal ambiance." },
      { title: "Antique Silver Finish Furniture", description: "Intricately crafted heritage furniture with an antique silver finish, adding palace-like elegance to the living spaces." },
      { title: "Traditional Jharokhas & Ceilings", description: "Traditional jharokha-style windows, detailed ceiling artwork, and handcrafted décor reflecting the timeless cultural richness of Rajasthan." }
    ]
  },
  {
    name: "First Impression Salon",
    slug: "first-impression-salon",
    location: "Udaipur",
    type: "Premium Commercial Interior",
    shortDescription: "A luxurious heritage-themed salon inspired by the royal charm of Rajasthan.",
    fullDescription: "First Impression Salon is a luxurious heritage-themed salon inspired by the royal charm of Rajasthan.\n\nThe space features heritage-style interiors, traditional furniture, Belgium glass work, and intricate Thekri glass work, reflecting authentic royal craftsmanship.\n\nClassic detailing, artistic elements, and elegant wordings enhance the regal ambiance, creating a premium grooming space with a true touch of heritage elegance.",
    featuredImage: "assets/first-impression-salon-1.jpg",
    galleryImages: [
      { url: "assets/first-impression-salon-1.jpg", caption: "Belgium Glass Work & Intricate Thekri Glass Inlay", alt: "First Impression Salon Interior" }
    ],
    architecturalElements: [
      { title: "Belgium Glass & Thekri Work", description: "Intricate Thekri glass artistry and premium Belgium glass work providing authentic royal reflection and elegance." },
      { title: "Regal Commercial Ambiance", description: "Classic detailing, traditional furniture, and heritage interior architecture tailored for luxury commercial experiences." }
    ]
  }
];

const DEFAULT_CRAFTSMANSHIP = [
  { title: "Complete Heritage Building & Room Transformation", description: "Turnkey structural and architectural heritage transformations.", icon: "🏛️" },
  { title: "Traditional Jharokha Design & Architectural Elements", description: "Bespoke stone and timber jharokha balconies and cornices.", icon: "🪟" },
  { title: "Pipal Patti & Aasnot Patti Wall Detailing", description: "Intricate traditional wall trims and relief plaster detailing.", icon: "🌿" },
  { title: "Thekari Glass & Premium Belgium Glass Work", description: "Exquisite hand-cut convex/concave mirror and glass mosaics.", icon: "✨" },
  { title: "Royal Chandeliers (Jhumer) & Antique Wall Lighting", description: "Magnificent palace-style illumination and chandeliers.", icon: "💡" },
  { title: "Hanging Lights & Palace-Style Illumination", description: "Atmospheric traditional ambient lighting design.", icon: "🏮" },
  { title: "Handcrafted Paintings & Intricate Carving", description: "Royal fresco artistry and master stone/wood relief carving.", icon: "🎨" },
  { title: "Custom Heritage Furniture", description: "Carved Furniture, Ottoman, Study Tables, and Bedroom Sets.", icon: "🛋️" },
  { title: "Royal Curtains & Interior Styling", description: "Regal textiles, royal drapery, and curated heritage accents.", icon: "👑" },
  { title: "Heritage Flooring & Decorative Ceiling Work", description: "Khajur Patti marble borders and Mor Pankh ceiling artistry.", icon: "🏛️" }
];

const DEFAULT_SERVICES = [
  {
    title: "Heritage Haveli Construction",
    description: "Complete traditional haveli development with authentic architectural detailing and strong structural execution.",
    icon: "🏰"
  },
  {
    title: "Luxury Heritage Villas",
    description: "Royal-style villas designed with heritage aesthetics and modern civil engineering standards.",
    icon: "🏛️"
  },
  {
    title: "Palace-Style Farmhouse Development",
    description: "Grand farmhouse projects featuring domes, carved stonework, decorative pillars, and heritage ceilings.",
    icon: "🏡"
  },
  {
    title: "Heritage Hotels & Resort Development",
    description: "Culturally rich hospitality spaces crafted with traditional craftsmanship and premium finishing.",
    icon: "🏨"
  },
  {
    title: "Premium Heritage Commercial Interiors",
    description: "Heritage-inspired interior solutions including Thekri glass work, Heritage Dodi, Mor Pankh ceilings, Jhomer chandeliers, carved furniture, and customized royal detailing.",
    icon: "✨"
  }
];

const DEFAULT_ENQUIRIES = [
  {
    _id: "demo-enq-1",
    name: "Maharaja Vikramaditya Singh",
    phone: "9414228829",
    email: "vikram@heritagevilla.in",
    projectType: "Heritage Haveli Construction",
    message: "Interested in constructing a 4-suite traditional haveli with Thekri glass ceiling work and Ghokda domes in Udaipur.",
    status: "new",
    createdAt: new Date().toISOString()
  }
];

// LocalStorage helpers
function getStored(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}
function setStored(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn("Storage error:", e);
  }
}

// ==================== AUTHENTICATION & MODES ====================
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
      localStorage.removeItem("rh_offline_mode");
      isOfflineMode = false;
      showApp();
    } else {
      alert(data.message || "Invalid credentials.");
    }
  } catch (err) {
    console.warn("Backend not reachable at " + API + ":", err);
    if (confirm("Could not connect to backend at " + API + ".\n\n(Browsers block http:// calls on live https:// GitHub Pages).\n\nWould you like to enter Offline Demo Mode directly? Full CMS management and preview are enabled locally in your browser!")) {
      enterOfflineMode();
    }
  } finally {
    btn.textContent = "SIGN IN TO CMS →";
    btn.disabled = false;
  }
}

function enterOfflineMode() {
  token = "offline-demo-token";
  isOfflineMode = true;
  localStorage.setItem("rh_admin_token", token);
  localStorage.setItem("rh_offline_mode", "true");
  showApp();
}

function saveCustomApiUrl() {
  const input = document.getElementById("customApiUrl");
  const val = input ? input.value.trim() : "";
  if (!val) {
    localStorage.removeItem("rh_api_url");
    alert("Reset API URL to default (http://localhost:5000/api)");
  } else {
    const cleanUrl = val.replace(/\/+$/, "");
    localStorage.setItem("rh_api_url", cleanUrl);
    localStorage.removeItem("rh_offline_mode");
    alert("Saved Backend API URL: " + cleanUrl);
  }
  location.reload();
}

function openApiSettingsPrompt() {
  const current = localStorage.getItem("rh_api_url") || API;
  const newUrl = prompt("Enter your live Backend API Endpoint URL:\n(e.g., https://rathore-heritage-api.onrender.com/api)\nLeave empty to reset to default localhost:5000/api", current);
  if (newUrl !== null) {
    if (newUrl.trim() === "") {
      localStorage.removeItem("rh_api_url");
      alert("Reset API URL to default.");
    } else {
      const clean = newUrl.trim().replace(/\/+$/, "");
      localStorage.setItem("rh_api_url", clean);
      localStorage.removeItem("rh_offline_mode");
      alert("Backend API URL set to: " + clean);
    }
    location.reload();
  }
}

function logout() {
  localStorage.removeItem("rh_admin_token");
  localStorage.removeItem("rh_offline_mode");
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
  const dbBadge = document.getElementById("dbStatus");

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/admin/stats`, { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        document.getElementById("statProjects").textContent = data.totalProjects || 0;
        document.getElementById("statImages").textContent = data.totalImages || 0;
        document.getElementById("statEnquiries").textContent = data.totalEnquiries || 0;
        document.getElementById("statNewEnquiries").textContent = data.newEnquiries || 0;
        document.getElementById("newBadge").textContent = data.newEnquiries || 0;

        if (data.dbConnected) {
          dbBadge.className = "db-status-badge";
          dbBadge.innerHTML = "<span>●</span> MongoDB Connected (Live)";
        } else {
          dbBadge.className = "db-status-badge offline";
          dbBadge.innerHTML = "<span>●</span> Local Server (Atlas Sync Pending)";
        }
        return;
      }
    } catch (e) {
      console.warn("Stats API unreachable, calculating from local store:", e);
    }
  }

  // Offline Mode stats calculation
  const projects = getStored("rh_offline_projects", DEFAULT_PROJECTS);
  const enquiries = getStored("rh_offline_enquiries", DEFAULT_ENQUIRIES);
  const totalImgs = projects.reduce((acc, p) => acc + (p.galleryImages ? p.galleryImages.length : 0), 0);
  const newEnqCount = enquiries.filter(e => e.status === "new").length;

  document.getElementById("statProjects").textContent = projects.length;
  document.getElementById("statImages").textContent = totalImgs;
  document.getElementById("statEnquiries").textContent = enquiries.length;
  document.getElementById("statNewEnquiries").textContent = newEnqCount;
  document.getElementById("newBadge").textContent = newEnqCount;

  dbBadge.className = "db-status-badge offline";
  dbBadge.innerHTML = "<span>●</span> Offline Browser Mode";
}

// ==================== WEBSITE CONTENT MANAGEMENT ====================
async function loadSiteContent() {
  currentSite = null;

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/admin/site`, { headers: authHeaders() });
      if (res.ok) {
        currentSite = await res.json();
      }
    } catch (e) {
      console.warn("Using offline site content:", e);
    }
  }

  if (!currentSite) {
    currentSite = getStored("rh_offline_site", DEFAULT_SITE);
  }

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
}

async function saveSiteSettings() {
  const updateData = {
    ...currentSite,
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

  currentSite = updateData;
  setStored("rh_offline_site", updateData);

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/admin/site`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(updateData)
      });
      if (res.ok) {
        alert("✅ Website content saved to MongoDB Atlas successfully!");
        return;
      }
    } catch (e) {
      console.warn("API save failed, preserved locally:", e);
    }
  }

  alert("✅ Website content saved in browser storage! Changes will reflect in live preview.");
}

async function loadProjects() {
  currentProjects = [];

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/admin/projects`, { headers: authHeaders() });
      if (res.ok) {
        currentProjects = await res.json();
      }
    } catch (e) {
      console.warn("Using offline projects data:", e);
    }
  }

  if (!currentProjects || currentProjects.length === 0) {
    currentProjects = getStored("rh_offline_projects", DEFAULT_PROJECTS);
  }

  renderProjectsTable(currentProjects);
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

  if (!isOfflineMode) {
    try {
      const res = id
        ? await fetch(`${API}/admin/projects/${id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(payload) })
        : await fetch(`${API}/admin/projects`, { method: "POST", headers: authHeaders(), body: JSON.stringify(payload) });

      if (res.ok) {
        alert("✅ Project saved to MongoDB successfully!");
        closeProjectModal();
        await loadProjects();
        await refreshStats();
        return;
      }
    } catch (err) {
      console.warn("API project save failed, falling back to browser storage:", err);
    }
  }

  // Offline fallback
  const existingIdx = currentProjects.findIndex(p => (p._id && p._id === id) || p.slug === (id || slug));
  if (existingIdx >= 0) {
    currentProjects[existingIdx] = { ...currentProjects[existingIdx], ...payload };
  } else {
    currentProjects.unshift({ _id: "local-" + Date.now(), ...payload });
  }

  setStored("rh_offline_projects", currentProjects);
  alert("✅ Project saved in browser storage!");
  closeProjectModal();
  renderProjectsTable(currentProjects);
  await refreshStats();
}

async function deleteProject(id) {
  if (!confirm("Are you sure you want to delete this project?")) return;

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/admin/projects/${id}`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) {
        alert("Project deleted from MongoDB.");
        await loadProjects();
        await refreshStats();
        return;
      }
    } catch (e) {
      console.warn("API delete failed, deleting locally:", e);
    }
  }

  currentProjects = currentProjects.filter(p => p._id !== id && p.slug !== id);
  setStored("rh_offline_projects", currentProjects);
  renderProjectsTable(currentProjects);
  await refreshStats();
  alert("Project deleted locally.");
}

// ==================== CRAFTSMANSHIP & SERVICES ====================
async function loadCraftsmanship() {
  currentCraftsmanship = [];

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/craftsmanship`);
      if (res.ok) currentCraftsmanship = await res.json();
    } catch (e) {
      console.warn("Using offline craftsmanship:", e);
    }
  }

  if (!currentCraftsmanship || currentCraftsmanship.length === 0) {
    currentCraftsmanship = getStored("rh_offline_craft", DEFAULT_CRAFTSMANSHIP);
  }

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
}

async function saveCraftsmanship() {
  const items = currentCraftsmanship.map((c, i) => ({
    title: document.getElementById(`cTitle${i}`).value,
    description: document.getElementById(`cDesc${i}`).value,
    icon: document.getElementById(`cIcon${i}`).value,
    order: i + 1
  }));

  const closingText = document.getElementById("cfgCraftClosing").value;

  setStored("rh_offline_craft", items);
  if (currentSite) {
    currentSite.craftsmanshipClosing = closingText;
    setStored("rh_offline_site", currentSite);
  }

  if (!isOfflineMode) {
    try {
      await fetch(`${API}/admin/craftsmanship`, { method: "PUT", headers: authHeaders(), body: JSON.stringify({ items }) });
      await fetch(`${API}/admin/site`, { method: "PUT", headers: authHeaders(), body: JSON.stringify({ craftsmanshipClosing: closingText }) });
      alert("✅ Craftsmanship items saved to MongoDB Atlas!");
      return;
    } catch (e) {
      console.warn("API save craftsmanship failed:", e);
    }
  }

  alert("✅ Craftsmanship items saved in browser storage!");
}

async function loadServices() {
  currentServices = [];

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/services`);
      if (res.ok) currentServices = await res.json();
    } catch (e) {
      console.warn("Using offline services:", e);
    }
  }

  if (!currentServices || currentServices.length === 0) {
    currentServices = getStored("rh_offline_services", DEFAULT_SERVICES);
  }

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
}

async function saveServices() {
  const items = currentServices.map((s, i) => ({
    title: document.getElementById(`sTitle${i}`).value,
    description: document.getElementById(`sDesc${i}`).value,
    icon: document.getElementById(`sIcon${i}`).value,
    order: i + 1
  }));

  setStored("rh_offline_services", items);

  if (!isOfflineMode) {
    try {
      await fetch(`${API}/admin/services`, { method: "PUT", headers: authHeaders(), body: JSON.stringify({ items }) });
      alert("✅ Services saved to MongoDB Atlas!");
      return;
    } catch (e) {
      console.warn("API save services failed:", e);
    }
  }

  alert("✅ Services saved in browser storage!");
}

// ==================== ENQUIRIES MANAGEMENT ====================
async function loadEnquiries() {
  currentEnquiries = [];

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/admin/enquiries`, { headers: authHeaders() });
      if (res.ok) currentEnquiries = await res.json();
    } catch (e) {
      console.warn("Using offline enquiries:", e);
    }
  }

  if (!currentEnquiries || currentEnquiries.length === 0) {
    currentEnquiries = getStored("rh_offline_enquiries", DEFAULT_ENQUIRIES);
  }

  renderEnquiries(currentEnquiries);
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
  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/admin/enquiries/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await loadEnquiries();
        await refreshStats();
        return;
      }
    } catch (e) {
      console.warn("API enquiry update failed:", e);
    }
  }

  const enq = currentEnquiries.find(e => e._id === id);
  if (enq) enq.status = status;
  setStored("rh_offline_enquiries", currentEnquiries);
  renderEnquiries(currentEnquiries);
  await refreshStats();
}

async function deleteEnquiry(id) {
  if (!confirm("Delete this enquiry?")) return;

  if (!isOfflineMode) {
    try {
      const res = await fetch(`${API}/admin/enquiries/${id}`, { method: "DELETE", headers: authHeaders() });
      if (res.ok) {
        await loadEnquiries();
        await refreshStats();
        return;
      }
    } catch (e) {
      console.warn("API delete enquiry failed:", e);
    }
  }

  currentEnquiries = currentEnquiries.filter(e => e._id !== id);
  setStored("rh_offline_enquiries", currentEnquiries);
  renderEnquiries(currentEnquiries);
  await refreshStats();
}

// ==================== IMAGE UPLOADER ====================
async function handleImageUpload(e) {
  e.preventDefault();
  const fileInput = document.getElementById("imageFileInput");
  if (!fileInput.files || fileInput.files.length === 0) return;

  const file = fileInput.files[0];

  if (!isOfflineMode) {
    const formData = new FormData();
    formData.append("image", file);

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
        alert("✅ Image uploaded to server!");
        fileInput.value = "";
        return;
      }
    } catch (err) {
      console.warn("API upload failed, converting to local data URI:", err);
    }
  }

  // Offline base64 data URI conversion
  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    document.getElementById("uploadedUrlInput").value = dataUrl;
    document.getElementById("uploadedPreview").src = dataUrl;
    document.getElementById("uploadResult").classList.remove("hidden");
    alert("✅ Image prepared as local Data URI (Ready to copy and paste into projects)!");
    fileInput.value = "";
  };
  reader.readAsDataURL(file);
}

function copyUploadedUrl() {
  const copyText = document.getElementById("uploadedUrlInput");
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
  alert("Copied URL to clipboard!");
}

// Helper
function escapeHtml(x) {
  return String(x || "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

// Pre-fill API settings input if previously configured
window.addEventListener("DOMContentLoaded", () => {
  const apiInput = document.getElementById("customApiUrl");
  if (apiInput) {
    apiInput.value = localStorage.getItem("rh_api_url") || "";
  }
});

// Auto-login if token already in localStorage
if (token) {
  showApp();
}