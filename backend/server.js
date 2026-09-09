require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "rathore_heritage_secure_secret_2026";

// Static uploads folder
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use("/uploads", express.static(UPLOADS_DIR));

// Cloudinary Configuration
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// ==================== DEFAULT PDF DATA AS SINGLE SOURCE OF TRUTH ====================
const DEFAULT_SITE = {
  key: "main",
  heroEyebrow: "HERITAGE RESTORATION • LUXURY HAVELIS • PALACE STYLE INTERIORS • RESORTS • HERITAGE CONSULTANCY",
  heroTitle: "Where timeless Indian\nheritage meets royal living.",
  heroSubtitle: "Preserving Royal Legacy Through Timeless Heritage Architecture.",
  heroImage: "assets/hero-bg.jpg",
  heroVideo: "",
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
      { url: "assets/oladar-haveli-1.jpg", caption: "Grand Heritage Entry (Dodi / Main Entrance Gate)", alt: "Oladar Haveli Entrance Dodi", order: 1 },
      { url: "assets/oladar-haveli-2.jpg", caption: "Traditional Jharokha Design & Architectural Facade", alt: "Oladar Haveli Facade", order: 2 },
      { url: "assets/oladar-haveli-3.jpg", caption: "Ceiling Design – Mor Pankh Work & Thekri Glass", alt: "Oladar Haveli Ceiling Art", order: 3 },
      { url: "assets/oladar-haveli-4.jpg", caption: "Ghokda Style Domes & Rooftop Heritage Bar", alt: "Oladar Haveli Terrace Domes", order: 4 },
      { url: "assets/oladar-haveli-5.jpg", caption: "Heritage Carved Furniture & Jhomer Chandeliers", alt: "Oladar Haveli Interior Furniture", order: 5 }
    ],
    architecturalElements: [
      {
        title: "Grand Heritage Entry (Dodi / Main Door)",
        description: "A grand traditional Heritage Dodi (Main Entrance Gate) has been constructed at the entrance, creating a royal first impression of the haveli."
      },
      {
        title: "Thekri Glass Work",
        description: "Intricate Thekri glass work has been executed on interior ceilings, inside decorative Aaliya, and in the heritage-style bar area. This glass inlay work enhances light reflection and gives a royal palace finish."
      },
      {
        title: "Ceiling Design – Mor Pankh Work",
        description: "The ceilings feature detailed Mor Pankh (Peacock Feather) themed artwork, reflecting traditional Rajasthani craftsmanship. The ceiling interiors have been intricately designed using traditional Pipla Patti and Tordi detailing, enhancing the authentic heritage aesthetic of the space."
      },
      {
        title: "Domes (Ghokda Style)",
        description: "Three domes have been constructed on the terrace level, locally known as Ghokda style domes to enhance traditional design and maintain authentic heritage architecture."
      },
      {
        title: "Heritage Bar & Staircase",
        description: "A heritage-style bar has been constructed on the terrace with rooftop sitting. The bar area includes detailed glass inlay work. The staircase design follows traditional architectural elements while maintaining safety and structural balance."
      },
      {
        title: "Flooring & Finishing",
        description: "Premium white marble flooring has been used throughout the haveli. Marble borders are finished with Khajur Patti detailing, enhancing the traditional appearance. Proper base preparation, leveling, and joint finishing were ensured for durability and long life."
      },
      {
        title: "Furniture & Interior Heritage Elements",
        description: "All rooms include Carving furniture with a different style in authentic heritage style. Behind each bed, a heritage-style decorative pillar has been installed on the wall, enhancing the royal ambiance. Each room features a heritage-style Jhomer (chandelier). The reception area includes three chandeliers (one large and two smaller) for a grand visual impact."
      }
    ],
    published: true,
    order: 1
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
      { url: "assets/roop-mahal-1.jpg", caption: "Heritage-style Windows, Traditional Arches & Facade", alt: "Roop Mahal Facade", order: 1 }
    ],
    architecturalElements: [
      {
        title: "Architectural Windows & Arches",
        description: "Beautifully crafted heritage-style windows, traditional arches, and elegant façade detailing reflecting the charm of royal havelis."
      },
      {
        title: "Glass Inlay & Artistic Carvings",
        description: "Intricate glass inlay work, artistic stone and wood carvings, and classic heritage furniture that enhance royal character."
      }
    ],
    published: true,
    order: 2
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
      { url: "assets/mohan-villa-1.jpg", caption: "Carved Arches, Stained Glass & Antique Silver Furniture", alt: "Mohan Villa Interior", order: 1 }
    ],
    architecturalElements: [
      {
        title: "Carved Arches & Stained Glass",
        description: "Beautifully carved arches, decorative wall artwork, and vibrant stained glass windows that enhance natural light and create royal ambiance."
      },
      {
        title: "Antique Silver Finish Furniture",
        description: "Intricately crafted heritage furniture with an antique silver finish, adding palace-like elegance to the living spaces."
      },
      {
        title: "Traditional Jharokhas & Ceilings",
        description: "Traditional jharokha-style windows, detailed ceiling artwork, and handcrafted décor reflecting the timeless cultural richness of Rajasthan."
      }
    ],
    published: true,
    order: 3
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
      { url: "assets/first-impression-salon-1.jpg", caption: "Belgium Glass Work & Intricate Thekri Glass Inlay", alt: "First Impression Salon Interior", order: 1 }
    ],
    architecturalElements: [
      {
        title: "Belgium Glass & Thekri Work",
        description: "Intricate Thekri glass artistry and premium Belgium glass work providing authentic royal reflection and elegance."
      },
      {
        title: "Regal Commercial Ambiance",
        description: "Classic detailing, traditional furniture, and heritage interior architecture tailored for luxury commercial experiences."
      }
    ],
    published: true,
    order: 4
  }
];

const DEFAULT_CRAFTSMANSHIP = [
  { title: "Complete Heritage Building & Room Transformation", description: "Turnkey structural and architectural heritage transformations.", icon: "🏛️", order: 1 },
  { title: "Traditional Jharokha Design & Architectural Elements", description: "Bespoke stone and timber jharokha balconies and cornices.", icon: "🪟", order: 2 },
  { title: "Pipal Patti & Aasnot Patti Wall Detailing", description: "Intricate traditional wall trims and relief plaster detailing.", icon: "🌿", order: 3 },
  { title: "Thekari Glass & Premium Belgium Glass Work", description: "Exquisite hand-cut convex/concave mirror and glass mosaics.", icon: "✨", order: 4 },
  { title: "Royal Chandeliers (Jhumer) & Antique Wall Lighting", description: "Magnificent palace-style illumination and chandeliers.", icon: "💡", order: 5 },
  { title: "Hanging Lights & Palace-Style Illumination", description: "Atmospheric traditional ambient lighting design.", icon: "🏮", order: 6 },
  { title: "Handcrafted Paintings & Intricate Carving", description: "Royal fresco artistry and master stone/wood relief carving.", icon: "🎨", order: 7 },
  { title: "Custom Heritage Furniture", description: "Carved Furniture, Ottoman, Study Tables, and Bedroom Sets.", icon: "🛋️", order: 8 },
  { title: "Royal Curtains & Interior Styling", description: "Regal textiles, royal drapery, and curated heritage accents.", icon: "👑", order: 9 },
  { title: "Heritage Flooring & Decorative Ceiling Work", description: "Khajur Patti marble borders and Mor Pankh ceiling artistry.", icon: "🏛️", order: 10 }
];

const DEFAULT_SERVICES = [
  {
    title: "Heritage Haveli Construction",
    description: "Complete traditional haveli development with authentic architectural detailing and strong structural execution.",
    icon: "🏰",
    order: 1
  },
  {
    title: "Luxury Heritage Villas",
    description: "Royal-style villas designed with heritage aesthetics and modern civil engineering standards.",
    icon: "🏛️",
    order: 2
  },
  {
    title: "Palace-Style Farmhouse Development",
    description: "Grand farmhouse projects featuring domes, carved stonework, decorative pillars, and heritage ceilings.",
    icon: "🏡",
    order: 3
  },
  {
    title: "Heritage Hotels & Resort Development",
    description: "Culturally rich hospitality spaces crafted with traditional craftsmanship and premium finishing.",
    icon: "🏨",
    order: 4
  },
  {
    title: "Premium Heritage Commercial Interiors",
    description: "Heritage-inspired interior solutions including Thekri glass work, Heritage Dodi, Mor Pankh ceilings, Jhomer chandeliers, carved furniture, and customized royal detailing.",
    icon: "✨",
    order: 5
  }
];

// In-memory / file fallback for enquiries if MongoDB is offline
const ENQUIRIES_FILE = path.join(__dirname, "enquiries.json");
function loadLocalEnquiries() {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      return JSON.parse(fs.readFileSync(ENQUIRIES_FILE, "utf-8"));
    }
  } catch (e) {}
  return [];
}
function saveLocalEnquiry(enquiry) {
  const list = loadLocalEnquiries();
  list.unshift(enquiry);
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
  } catch (e) {}
}

// ==================== MONGOOSE SCHEMAS ====================
const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: "main" },
  heroEyebrow: { type: String, default: DEFAULT_SITE.heroEyebrow },
  heroTitle: { type: String, default: DEFAULT_SITE.heroTitle },
  heroSubtitle: { type: String, default: DEFAULT_SITE.heroSubtitle },
  heroImage: { type: String, default: DEFAULT_SITE.heroImage },
  heroVideo: { type: String, default: "" },
  aboutTitle: { type: String, default: DEFAULT_SITE.aboutTitle },
  aboutContent: { type: String, default: DEFAULT_SITE.aboutContent },
  aboutImage: { type: String, default: DEFAULT_SITE.aboutImage },
  craftsmanshipClosing: { type: String, default: DEFAULT_SITE.craftsmanshipClosing },
  contactPhone: { type: String, default: DEFAULT_SITE.contactPhone },
  contactEmail: { type: String, default: DEFAULT_SITE.contactEmail },
  instagram: { type: String, default: DEFAULT_SITE.instagram },
  brandStatement: { type: String, default: DEFAULT_SITE.brandStatement },
  footerMotto: { type: String, default: DEFAULT_SITE.footerMotto }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: { type: String, default: "Udaipur" },
  type: { type: String, required: true },
  shortDescription: { type: String, default: "" },
  fullDescription: { type: String, default: "" },
  featuredImage: { type: String, default: "" },
  galleryImages: [{
    url: { type: String, required: true },
    caption: { type: String, default: "" },
    alt: { type: String, default: "" },
    order: { type: Number, default: 0 }
  }],
  architecturalElements: [{
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const craftsmanshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  icon: { type: String, default: "" },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: "" },
  icon: { type: String, default: "" },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: "" },
  projectType: { type: String, default: "Heritage Construction" },
  message: { type: String, default: "" },
  status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" }
}, { timestamps: true });

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);
const Project = mongoose.model("Project", projectSchema);
const Craftsmanship = mongoose.model("Craftsmanship", craftsmanshipSchema);
const Service = mongoose.model("Service", serviceSchema);
const Enquiry = mongoose.model("Enquiry", enquirySchema);
const User = mongoose.model("User", userSchema);

let isDbConnected = false;

// ==================== AUTH MIDDLEWARE ====================
function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token missing." });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized. Invalid or expired token." });
  }
}

// ==================== FILE UPLOAD HANDLER ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, "-");
    cb(null, `${Date.now()}-${cleanName}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }
});

// ==================== PUBLIC APIS ====================

app.get("/api/health", (req, res) => {
  res.json({ ok: true, dbConnected: isDbConnected, timestamp: new Date() });
});

app.get("/api/site", async (req, res) => {
  try {
    if (isDbConnected) {
      let site = await SiteSettings.findOne({ key: "main" }).lean();
      if (site) return res.json(site);
    }
  } catch (err) {}
  res.json(DEFAULT_SITE);
});

app.get("/api/public/site", async (req, res) => {
  try {
    if (isDbConnected) {
      let site = await SiteSettings.findOne({ key: "main" }).lean();
      const projects = await Project.find({ published: true }).sort({ order: 1 }).lean();
      if (site) return res.json({ ...site, projects: projects.length ? projects : DEFAULT_PROJECTS });
    }
  } catch (err) {}
  res.json({ ...DEFAULT_SITE, projects: DEFAULT_PROJECTS });
});

app.get("/api/projects", async (req, res) => {
  try {
    if (isDbConnected) {
      const projects = await Project.find({ published: true }).sort({ order: 1 });
      if (projects.length) return res.json(projects);
    }
  } catch (err) {}
  res.json(DEFAULT_PROJECTS);
});

app.get("/api/projects/:slug", async (req, res) => {
  try {
    if (isDbConnected) {
      const project = await Project.findOne({ slug: req.params.slug });
      if (project) return res.json(project);
    }
  } catch (err) {}
  const match = DEFAULT_PROJECTS.find(p => p.slug === req.params.slug);
  if (match) return res.json(match);
  res.status(404).json({ message: "Project not found" });
});

app.get("/api/craftsmanship", async (req, res) => {
  try {
    if (isDbConnected) {
      const items = await Craftsmanship.find().sort({ order: 1 });
      if (items.length) return res.json(items);
    }
  } catch (err) {}
  res.json(DEFAULT_CRAFTSMANSHIP);
});

app.get("/api/services", async (req, res) => {
  try {
    if (isDbConnected) {
      const services = await Service.find().sort({ order: 1 });
      if (services.length) return res.json(services);
    }
  } catch (err) {}
  res.json(DEFAULT_SERVICES);
});

app.post("/api/enquiries", async (req, res) => {
  try {
    const { name, phone, email, projectType, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required." });
    }
    const enquiryData = {
      _id: Date.now().toString(),
      name,
      phone,
      email: email || "",
      projectType: projectType || "Heritage Construction",
      message: message || "",
      status: "new",
      createdAt: new Date()
    };

    if (isDbConnected) {
      try {
        const saved = await Enquiry.create(enquiryData);
        return res.status(201).json({ success: true, enquiry: saved });
      } catch (e) {}
    }
    saveLocalEnquiry(enquiryData);
    res.status(201).json({ success: true, enquiry: enquiryData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==================== AUTH APIS ====================
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (isDbConnected) {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "14d" });
        return res.json({ token, user: { email: user.email, role: user.role } });
      }
    }

    // Direct fallback with configured environment credentials
    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ id: "admin-master", role: "admin", email: adminEmail }, JWT_SECRET, { expiresIn: "14d" });
      return res.json({ token, user: { email: adminEmail, role: "admin" } });
    }

    res.status(401).json({ message: "Invalid email or password." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/auth/me", auth, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role });
});

// ==================== ADMIN APIS ====================

app.get("/api/admin/stats", auth, async (req, res) => {
  try {
    let totalProjects = DEFAULT_PROJECTS.length;
    let totalEnquiries = loadLocalEnquiries().length;
    let newEnquiries = loadLocalEnquiries().filter(e => e.status === "new").length;
    let totalImages = 8;

    if (isDbConnected) {
      try {
        totalProjects = await Project.countDocuments();
        totalEnquiries = await Enquiry.countDocuments();
        newEnquiries = await Enquiry.countDocuments({ status: "new" });
        const allProjects = await Project.find().select("galleryImages");
        totalImages = 0;
        allProjects.forEach(p => { totalImages += (p.galleryImages ? p.galleryImages.length : 0); });
      } catch (e) {}
    }

    res.json({ totalProjects, totalImages, totalEnquiries, newEnquiries, dbConnected: isDbConnected });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/admin/site", auth, async (req, res) => {
  try {
    if (isDbConnected) {
      let site = await SiteSettings.findOne({ key: "main" });
      if (site) return res.json(site);
    }
  } catch (e) {}
  res.json(DEFAULT_SITE);
});

app.put("/api/admin/site", auth, async (req, res) => {
  try {
    if (isDbConnected) {
      const site = await SiteSettings.findOneAndUpdate(
        { key: "main" },
        { $set: req.body },
        { new: true, upsert: true }
      );
      return res.json(site);
    }
    Object.assign(DEFAULT_SITE, req.body);
    res.json(DEFAULT_SITE);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/admin/projects", auth, async (req, res) => {
  try {
    if (isDbConnected) {
      const projects = await Project.find().sort({ order: 1 });
      if (projects.length) return res.json(projects);
    }
  } catch (e) {}
  res.json(DEFAULT_PROJECTS);
});

app.post("/api/admin/projects", auth, async (req, res) => {
  try {
    const data = req.body;
    if (!data.name) return res.status(400).json({ message: "Project name is required" });
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    if (isDbConnected) {
      const p = await Project.create(data);
      return res.status(201).json(p);
    }
    data._id = Date.now().toString();
    DEFAULT_PROJECTS.push(data);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/admin/projects/:id", auth, async (req, res) => {
  try {
    if (isDbConnected) {
      const project = await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      if (project) return res.json(project);
    }
    const idx = DEFAULT_PROJECTS.findIndex(p => p._id === req.params.id || p.slug === req.params.id);
    if (idx !== -1) {
      Object.assign(DEFAULT_PROJECTS[idx], req.body);
      return res.json(DEFAULT_PROJECTS[idx]);
    }
    res.status(404).json({ message: "Project not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/admin/projects/:id", auth, async (req, res) => {
  try {
    if (isDbConnected) {
      await Project.findByIdAndDelete(req.params.id);
      return res.json({ message: "Deleted from database" });
    }
    const idx = DEFAULT_PROJECTS.findIndex(p => p._id === req.params.id || p.slug === req.params.id);
    if (idx !== -1) DEFAULT_PROJECTS.splice(idx, 1);
    res.json({ message: "Project removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/admin/enquiries", auth, async (req, res) => {
  try {
    if (isDbConnected) {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 });
      if (enquiries.length) return res.json(enquiries);
    }
  } catch (e) {}
  res.json(loadLocalEnquiries());
});

app.put("/api/admin/enquiries/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (isDbConnected) {
      const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
      if (enquiry) return res.json(enquiry);
    }
    const list = loadLocalEnquiries();
    const item = list.find(e => e._id === req.params.id);
    if (item) {
      item.status = status;
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
      return res.json(item);
    }
    res.status(404).json({ message: "Enquiry not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/admin/enquiries/:id", auth, async (req, res) => {
  try {
    if (isDbConnected) {
      await Enquiry.findByIdAndDelete(req.params.id);
      return res.json({ message: "Enquiry deleted" });
    }
    let list = loadLocalEnquiries();
    list = list.filter(e => e._id !== req.params.id);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2));
    res.json({ message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Image Upload Endpoint (Cloudinary + Local Disk)
app.post("/api/admin/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Try Cloudinary if keys exist
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "rathore_heritage",
          resource_type: "auto"
        });
        fs.unlink(req.file.path, () => {});
        return res.json({ url: result.secure_url, storage: "cloudinary" });
      } catch (cloudErr) {
        console.warn("Cloudinary fallback to local storage:", cloudErr.message);
      }
    }

    const localUrl = `/uploads/${req.file.filename}`;
    res.json({ url: localUrl, storage: "local" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==================== SEED DATABASE ====================
async function seedDatabase() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const existingUser = await User.findOne({ email: adminEmail });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
      await User.create({ email: adminEmail, password: hashedPassword, role: "admin" });
      console.log(`[SEED] Admin created: ${adminEmail}`);
    }

    const existingSite = await SiteSettings.findOne({ key: "main" });
    if (!existingSite) {
      await SiteSettings.create(DEFAULT_SITE);
      console.log("[SEED] SiteSettings seeded from PDF");
    }

    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(DEFAULT_PROJECTS);
      console.log("[SEED] 4 Signature Projects seeded from PDF");
    }

    const craftCount = await Craftsmanship.countDocuments();
    if (craftCount === 0) {
      await Craftsmanship.insertMany(DEFAULT_CRAFTSMANSHIP);
      console.log("[SEED] Craftsmanship seeded from PDF");
    }

    const sCount = await Service.countDocuments();
    if (sCount === 0) {
      await Service.insertMany(DEFAULT_SERVICES);
      console.log("[SEED] Services seeded from PDF");
    }
  } catch (e) {
    console.error("[SEED ERROR]:", e.message);
  }
}

// ==================== START SERVER & CONNECT WITH RETRY ====================
app.listen(PORT, () => {
  console.log(`Rathore Heritage Production API running on Port ${PORT}`);
});

function connectWithRetry() {
  mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    .then(async () => {
      isDbConnected = true;
      console.log("Connected to MongoDB Atlas successfully!");
      await seedDatabase();
    })
    .catch(err => {
      isDbConnected = false;
      console.warn("MongoDB Atlas connection pending. Retrying in 10s... (Make sure your current IP is whitelisted in MongoDB Atlas Network Access)");
      setTimeout(connectWithRetry, 10000);
    });
}

connectWithRetry();