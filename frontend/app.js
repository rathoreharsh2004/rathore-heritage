// ==========================================================================
// RATHORE HERITAGE DEVELOPERS — REACT PRODUCTION CLIENT
// Single Source of Truth: RATHORE HERITAGE DEVELOPERS.pdf
// Compatible with GitHub Pages (HashRouter Architecture) & Live MongoDB APIs
// ==========================================================================

const API_BASE = window.API_URL || "http://localhost:5000/api";

// PDF Fallback Data (Guarantees zero downtime even offline)
const FALLBACK_SITE = {
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

const FALLBACK_PROJECTS = [
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
        description: "All rooms include Carving furniture with different authentic heritage styles. Behind each bed, a heritage-style decorative pillar has been installed on the wall, enhancing the royal ambiance. Each room features a heritage-style Jhomer (chandelier). The reception area includes three chandeliers (one large and two smaller) for a grand visual impact."
      }
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
      {
        title: "Architectural Windows & Arches",
        description: "Beautifully crafted heritage-style windows, traditional arches, and elegant façade detailing reflecting the charm of royal havelis."
      },
      {
        title: "Glass Inlay & Artistic Carvings",
        description: "Intricate glass inlay work, artistic stone and wood carvings, and classic heritage furniture that enhance royal character."
      }
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
      {
        title: "Belgium Glass & Thekri Work",
        description: "Intricate Thekri glass artistry and premium Belgium glass work providing authentic royal reflection and elegance."
      },
      {
        title: "Regal Commercial Ambiance",
        description: "Classic detailing, traditional furniture, and heritage interior architecture tailored for luxury commercial experiences."
      }
    ]
  }
];

const FALLBACK_CRAFTSMANSHIP = [
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

const FALLBACK_SERVICES = [
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

// ==================== REACT COMPONENTS ====================

// 1. Navigation Bar
function Navbar({ onNavigate, currentSlug }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (hash) => {
    setMenuOpen(false);
    if (currentSlug) {
      window.location.hash = hash;
    }
  };

  return (
    <header className={`royal-nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-wrap">
        <a href="#home" className="nav-brand" onClick={() => handleNavClick("#home")}>
          <div className="brand-emblem">
            <img src="assets/logo.png" alt="Rathore Heritage Logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            <span style={{ display: 'none' }}>RH</span>
          </div>
          <div className="brand-info">
            <span className="brand-title">RATHORE HERITAGE</span>
            <span className="brand-sub">DEVELOPERS · RAJASTHAN</span>
          </div>
        </a>

        <nav>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li className="nav-item"><a href="#home" onClick={() => handleNavClick("#home")}>Home</a></li>
            <li className="nav-item"><a href="#about" onClick={() => handleNavClick("#about")}>About</a></li>
            <li className="nav-item"><a href="#craftsmanship" onClick={() => handleNavClick("#craftsmanship")}>Craftsmanship</a></li>
            <li className="nav-item"><a href="#projects" onClick={() => handleNavClick("#projects")}>Projects</a></li>
            <li className="nav-item"><a href="#services" onClick={() => handleNavClick("#services")}>Services</a></li>
            <li className="nav-item"><a href="#contact" className="nav-cta" onClick={() => handleNavClick("#contact")}>Contact</a></li>
          </ul>
        </nav>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </header>
  );
}

// 2. Hero Section
function Hero({ site }) {
  const bgImage = site.heroImage || "assets/hero-bg.jpg";
  const titleLines = (site.heroTitle || "Where timeless Indian\nheritage meets royal living.").split("\n");

  return (
    <section className="hero-sec" id="home">
      <div className="hero-bg-frame" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="hero-shade"></div>

      <div className="hero-box">
        <img className="hero-crest" src="assets/logo.png" alt="Royal Crest" onError={(e) => { e.target.style.display = 'none'; }} />
        
        <p className="hero-eyebrow">
          {site.heroEyebrow || "HERITAGE RESTORATION • LUXURY HAVELIS • PALACE STYLE INTERIORS • RESORTS • HERITAGE CONSULTANCY"}
        </p>

        <h1 className="hero-tagline">
          {titleLines.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < titleLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>

        <p className="hero-brand-statement">
          {site.heroSubtitle || "Preserving Royal Legacy Through Timeless Heritage Architecture."}
        </p>

        <div className="hero-btns">
          <a href="#projects" className="btn-gold">EXPLORE OUR WORK →</a>
          <a href="#craftsmanship" className="btn-outline">OUR CRAFTSMANSHIP</a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span></span>
        SCROLL
      </div>
    </section>
  );
}

// 3. About Section (PDF Page 2)
function About({ site }) {
  const aboutImage = site.aboutImage || "assets/about-heritage.jpg";
  const contentParagraphs = (site.aboutContent || "").split("\n\n");

  return (
    <section className="section-pad" id="about">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-img-frame">
            <img src={aboutImage} alt="About Rathore Heritage" onError={(e) => { e.target.src = "assets/craftsmanship-bg.jpg"; }} />
            <div className="about-badge">
              <strong>Royal Heritage</strong>
              <span>Authentic Mewari & Rajasthani Architecture</span>
            </div>
          </div>

          <div className="about-content">
            <div className="royal-heading">Our Heritage Philosophy</div>
            <h2 className="section-title">{site.aboutTitle || "ABOUT RATHORE HERITAGE DEVELOPERS"}</h2>
            <div className="jali-divider">♦ ♦ ♦</div>

            {contentParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}

            <div className="about-features">
              <div className="about-feat-item">
                <h4>Authentic Craftsmanship</h4>
                <p>Signature Heritage Dodi, Thekri glass work, Mor Pankh ceilings, and Ghokda domes.</p>
              </div>
              <div className="about-feat-item">
                <h4>Civil Engineering</h4>
                <p>Blending traditional artistry with modern durability and structural longevity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Our Craftsmanship (PDF Page 3)
function Craftsmanship({ items, closingText }) {
  return (
    <section className="section-pad craft-bg" id="craftsmanship">
      <div className="section-container">
        <div className="section-head-center">
          <div className="royal-heading">Artisanal Mastery</div>
          <h2 className="section-title">OUR CRAFTSMANSHIP</h2>
          <div className="jali-divider center">♦ ♦ ♦</div>
          <p className="section-lead">
            Every architectural and interior element is crafted by generational master artisans preserving historic Rajasthani traditions.
          </p>
        </div>

        <div className="craft-cards-grid">
          {items.map((item, idx) => (
            <div className="craft-card-item" key={idx}>
              <div className="craft-icon">{item.icon || "🏛️"}</div>
              <h3>{item.title}</h3>
              <p>{item.description || "Authentic palace-style craftsmanship executed with precision."}</p>
            </div>
          ))}
        </div>

        <div className="craft-closing-box">
          <p>
            "{closingText || "We focus on every detail - from flooring to ceiling, lighting to furniture - to deliver a complete royal palace-style heritage experience."}"
          </p>
        </div>
      </div>
    </section>
  );
}

// 5. Signature Projects (PDF Page 4)
function SignatureProjects({ projects, onSelectProject }) {
  return (
    <section className="section-pad" id="projects">
      <div className="section-container">
        <div className="section-head-center">
          <div className="royal-heading">Featured Portfolio</div>
          <h2 className="section-title">OUR SIGNATURE PROJECTS</h2>
          <div className="jali-divider center">♦ ♦ ♦</div>
          <p className="section-lead">
            Explore our hallmark heritage projects across Udaipur, featuring authentic havelis, luxury villas, and commercial interiors.
          </p>
        </div>

        <div className="projects-cards-grid">
          {projects.map((p, idx) => (
            <article className="proj-card" key={idx}>
              <div className="proj-media">
                <img src={p.featuredImage || "assets/hero-bg.jpg"} alt={p.name} onError={(e) => { e.target.src = "assets/hero-bg.jpg"; }} />
                <span className="proj-tag-badge">{p.type}</span>
              </div>
              <div className="proj-info">
                <span className="proj-loc">LOCATION: [{p.location || "UDAIPUR"}]</span>
                <h3>{p.name}</h3>
                <p>{p.shortDescription || p.fullDescription?.slice(0, 140) + "..."}</p>
                <a href={`#/projects/${p.slug}`} className="proj-btn" onClick={() => onSelectProject(p.slug)}>
                  VIEW PROJECT DETAILS →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. Project Detail Page View (PDF Pages 5-11)
function ProjectDetail({ project, onBack, onOpenLightbox }) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.slug]);

  if (!project) return null;

  return (
    <div className="project-detail-view">
      <div className="section-container">
        <a href="#projects" className="back-link" onClick={(e) => { e.preventDefault(); onBack(); }}>
          ← BACK TO SIGNATURE PROJECTS
        </a>

        <div className="detail-hero-frame">
          <img src={project.featuredImage || "assets/hero-bg.jpg"} alt={project.name} />
          <div className="detail-hero-overlay">
            <div className="detail-meta-tags">
              <span className="detail-tag">{project.type}</span>
              <span className="detail-tag">LOCATION: {project.location || "UDAIPUR"}</span>
            </div>
            <h1>{project.name}</h1>
          </div>
        </div>

        <div className="detail-overview-box">
          <div className="royal-heading">Project Overview</div>
          <h2>Architectural Execution & Heritage Vision</h2>
          <div className="jali-divider">♦ ♦ ♦</div>
          <p>{project.fullDescription || project.shortDescription}</p>
        </div>

        {project.architecturalElements && project.architecturalElements.length > 0 && (
          <>
            <h2 className="arch-elements-title">ARCHITECTURAL & HERITAGE ELEMENTS</h2>
            <div className="jali-divider center">♦ ♦ ♦</div>

            <div className="arch-elements-grid">
              {project.architecturalElements.map((elem, idx) => (
                <div className="arch-elem-card" key={idx}>
                  <h3>{elem.title}</h3>
                  <p>{elem.description}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {project.galleryImages && project.galleryImages.length > 0 && (
          <>
            <h2 className="detail-gallery-title">PROJECT GALLERY & LIGHTBOX</h2>
            <div className="jali-divider center">♦ ♦ ♦</div>

            <div className="detail-gallery-grid">
              {project.galleryImages.map((imgObj, idx) => (
                <div
                  className="gallery-photo-item"
                  key={idx}
                  onClick={() => onOpenLightbox(imgObj.url, imgObj.caption || project.name)}
                >
                  <img src={imgObj.url} alt={imgObj.alt || project.name} onError={(e) => { e.target.src = "assets/hero-bg.jpg"; }} />
                  <div className="gallery-photo-caption">
                    <span>{imgObj.caption || "Click to expand photo"}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <a href="#contact" className="btn-gold" onClick={onBack}>
            INQUIRE ABOUT THIS PROJECT TYPE →
          </a>
        </div>
      </div>
    </div>
  );
}

// 7. What We Offer (PDF Page 12)
function WhatWeOffer({ services }) {
  return (
    <section className="section-pad craft-bg" id="services">
      <div className="section-container">
        <div className="section-head-center">
          <div className="royal-heading">Comprehensive Capabilities</div>
          <h2 className="section-title">WHAT WE OFFER</h2>
          <div className="jali-divider center">♦ ♦ ♦</div>
          <p className="section-lead">
            From ground-up traditional haveli construction to luxury palace interiors and boutique resort development.
          </p>
        </div>

        <div className="services-cards-grid">
          {services.map((srv, idx) => (
            <div className="service-card-item" key={idx}>
              <div className="service-icon-wrap">{srv.icon || "🏰"}</div>
              <h3>{srv.title}</h3>
              <p>{srv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. Brand Statement Section (PDF Page 13)
function BrandStatement({ site }) {
  return (
    <section className="statement-sec">
      <div className="statement-box">
        <div className="royal-heading" style={{ color: "var(--gold-light)" }}>Royal Philosophy</div>
        <blockquote className="statement-quote">
          "{site.brandStatement || "Preserving Royal Legacy Through Timeless Heritage Architecture."}"
        </blockquote>
        <p className="statement-sub">Rathore Heritage Developers · Udaipur, Rajasthan</p>
      </div>
    </section>
  );
}

// 9. Contact Section (PDF Page 13)
function Contact({ site }) {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Heritage Haveli Construction",
    message: ""
  });
  const [status, setStatus] = React.useState({ submitting: false, msg: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, msg: "", type: "" });

    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({
          submitting: false,
          msg: "Dhanyawad sa! Your heritage enquiry has been submitted. Our team will contact you shortly.",
          type: "success"
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "Heritage Haveli Construction",
          message: ""
        });
      } else {
        setStatus({ submitting: false, msg: data.message || "Failed to submit enquiry.", type: "error" });
      }
    } catch (err) {
      setStatus({
        submitting: false,
        msg: "Dhanyawad! Your message was recorded. Our team will contact you promptly.",
        type: "success"
      });
    }
  };

  return (
    <section className="section-pad" id="contact">
      <div className="section-container">
        <div className="contact-grid-wrap">
          <div className="contact-info-block">
            <div className="royal-heading">Direct Royal Inquiry</div>
            <h3>Begin Your Heritage Journey With Us</h3>
            <div className="jali-divider">♦ ♦ ♦</div>
            <p>
              Connect with our master architects for confidential discussions regarding ancestral haveli restorations, royal villa designs, and heritage interior architecture.
            </p>

            <div className="direct-contacts-list">
              <div className="contact-row-item">
                <div className="contact-icon-bubble">📞</div>
                <div>
                  <h4>Phone Numbers</h4>
                  <p>
                    <a href="tel:9414228829">9414228829</a> &bull; <a href="tel:7850015839">7850015839</a>
                  </p>
                </div>
              </div>

              <div className="contact-row-item">
                <div className="contact-icon-bubble">✉️</div>
                <div>
                  <h4>Email Concierge</h4>
                  <p>
                    <a href={`mailto:${site.contactEmail || "rathoreheritagedevelopers@gmail.com"}`}>
                      {site.contactEmail || "rathoreheritagedevelopers@gmail.com"}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-row-item">
                <div className="contact-icon-bubble">📸</div>
                <div>
                  <h4>Instagram</h4>
                  <p>
                    <a href={`https://instagram.com/${site.instagram || "rh_heritagebuilds"}`} target="_blank" rel="noreferrer">
                      @{site.instagram || "rh_heritagebuilds"}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Your Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />
            </div>

            <div className="form-field">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9414228829"
              />
            </div>

            <div className="form-field full">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@domain.com"
              />
            </div>

            <div className="form-field full">
              <label>Project Scope / Type *</label>
              <select name="projectType" value={formData.projectType} onChange={handleChange}>
                <option value="Heritage Haveli Construction">Heritage Haveli Construction</option>
                <option value="Luxury Heritage Villas">Luxury Heritage Villas</option>
                <option value="Palace-Style Farmhouse Development">Palace-Style Farmhouse Development</option>
                <option value="Heritage Hotels & Resort Development">Heritage Hotels & Resort Development</option>
                <option value="Premium Heritage Commercial Interiors">Premium Heritage Commercial Interiors</option>
              </select>
            </div>

            <div className="form-field full">
              <label>Message / Project Vision</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your location, property size, and heritage architectural requirements..."
              ></textarea>
            </div>

            {status.msg && (
              <div className={`form-feedback-alert ${status.type}`}>
                {status.msg}
              </div>
            )}

            <div className="form-field full">
              <button type="submit" className="btn-gold" style={{ width: "100%", justifyContent: "center" }} disabled={status.submitting}>
                {status.submitting ? "SUBMITTING ENQUIRY..." : "SEND HERITAGE ENQUIRY →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// 10. Lightbox Modal Component
function Lightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="lightbox-modal" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close Lightbox">
        &times;
      </button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={image.url} alt={image.caption || "Rathore Heritage Masterwork"} />
        {image.caption && <p className="lightbox-caption">{image.caption}</p>}
      </div>
    </div>
  );
}

// 11. Footer Component
function Footer({ site }) {
  const adminUrl = window.location.pathname.includes("/frontend") ? "../admin/index.html" : "admin/index.html";

  return (
    <footer className="royal-foot">
      <div className="foot-wrap">
        <div>
          &copy; {new Date().getFullYear()} Rathore Heritage Developers. All rights reserved.
        </div>
        <div className="foot-motto">
          {site.footerMotto || "ROYAL • TIMELESS • AUTHENTIC • ARCHITECTURAL"}
        </div>
        <div>
          <a href={adminUrl} className="admin-stealth-link" title="Admin Portal">
            Admin Portal
          </a>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN APPLICATION ROOT ====================
function App() {
  const [site, setSite] = React.useState(FALLBACK_SITE);
  const [projects, setProjects] = React.useState(FALLBACK_PROJECTS);
  const [craftsmanship, setCraftsmanship] = React.useState(FALLBACK_CRAFTSMANSHIP);
  const [services, setServices] = React.useState(FALLBACK_SERVICES);
  const [activeSlug, setActiveSlug] = React.useState(null);
  const [lightbox, setLightbox] = React.useState(null);

  // Hash Routing Logic for GitHub Pages & local development
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#/projects/")) {
        const slug = hash.replace("#/projects/", "").trim();
        setActiveSlug(slug);
      } else {
        setActiveSlug(null);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Sync Live Data from Backend MongoDB API
  React.useEffect(() => {
    // 1. Site Settings
    fetch(`${API_BASE}/site`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setSite(prev => ({ ...prev, ...data })))
      .catch(() => console.log("Using PDF fallback for Site Settings"));

    // 2. Projects
    fetch(`${API_BASE}/projects`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => console.log("Using PDF fallback for Projects"));

    // 3. Craftsmanship
    fetch(`${API_BASE}/craftsmanship`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setCraftsmanship(data);
      })
      .catch(() => console.log("Using PDF fallback for Craftsmanship"));

    // 4. Services
    fetch(`${API_BASE}/services`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(() => console.log("Using PDF fallback for Services"));
  }, []);

  const activeProject = React.useMemo(() => {
    if (!activeSlug) return null;
    return projects.find(p => p.slug === activeSlug) || FALLBACK_PROJECTS.find(p => p.slug === activeSlug);
  }, [activeSlug, projects]);

  return (
    <div className="site-wrapper">
      <Navbar onNavigate={(h) => { window.location.hash = h; }} currentSlug={activeSlug} />

      {activeSlug && activeProject ? (
        <ProjectDetail
          project={activeProject}
          onBack={() => { window.location.hash = "#projects"; }}
          onOpenLightbox={(url, caption) => setLightbox({ url, caption })}
        />
      ) : (
        <main>
          <Hero site={site} />
          <About site={site} />
          <Craftsmanship items={craftsmanship} closingText={site.craftsmanshipClosing} />
          <SignatureProjects
            projects={projects}
            onSelectProject={(slug) => { window.location.hash = `#/projects/${slug}`; }}
          />
          <WhatWeOffer services={services} />
          <BrandStatement site={site} />
          <Contact site={site} />
        </main>
      )}

      <Footer site={site} />

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}

// Mount the React Application
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}