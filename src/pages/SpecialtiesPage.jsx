import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./SpecialtiesPage.css";
import { StickyNavbar } from '@/components/layout/StickyNavbar'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomNav } from '@/components/layout/MobileBottomNav'

/* ---------------------------------------------------------
   MEDICAL SVG ICONS (Detailed Line & Watermark Assets)
   --------------------------------------------------------- */

const HeartIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M50 82C46 78 18 60 18 37C18 23 28 15 40 15C46 15 51 18 55 24C59 18 64 15 70 15C82 15 92 23 92 37C92 60 64 78 50 82Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 43H40L45 32L52 53L58 40L63 43H72"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BoneIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M30 27C24 21 24 14 29 10C34 6 41 8 44 13L56 25L75 44C79 47 82 54 78 59C74 64 67 64 62 60L49 48L34 63C30 67 23 67 19 62C15 57 17 50 21 46L36 31L30 27Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M44 39L58 53"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M50 84V19"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M48 27C44 19 36 16 30 20C25 23 24 29 27 34C20 35 16 41 18 48C19 53 23 56 28 56C23 61 24 69 29 72C34 75 39 73 43 69C43 77 47 82 50 84"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M52 27C56 19 64 16 70 20C75 23 76 29 73 34C80 35 84 41 82 48C81 53 77 56 72 56C77 61 76 69 71 72C66 75 61 73 57 69C57 77 53 82 50 84"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29 41C34 41 36 38 36 34M71 41C66 41 64 38 64 34M30 59C36 59 38 62 38 66M70 59C64 59 62 62 62 66"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const LungsIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M50 19V50"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M48 30C42 29 35 34 30 43C25 52 22 65 26 73C29 80 36 82 42 77C47 73 49 64 50 53"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M52 30C58 29 65 34 70 43C75 52 78 65 74 73C71 80 64 82 58 77C53 73 51 64 50 53"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38 42L45 50M62 42L55 50"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const StomachIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M44 17C44 28 45 35 52 39C60 44 69 43 72 51C76 62 69 77 57 81C47 84 37 79 34 70C31 61 35 53 40 47C44 42 44 37 43 31"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M43 20C36 22 30 29 31 36"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const SkinIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <circle cx="50" cy="50" r="31" stroke="currentColor" strokeWidth="3" />
    <circle cx="39" cy="42" r="4" fill="currentColor" />
    <circle cx="61" cy="38" r="3" fill="currentColor" />
    <circle cx="62" cy="60" r="5" fill="currentColor" />
    <circle cx="42" cy="64" r="3" fill="currentColor" />
    <path
      d="M50 19V13M50 87V81M19 50H13M87 50H81"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M14 50C25 31 38 23 50 23C62 23 75 31 86 50C75 69 62 77 50 77C38 77 25 69 14 50Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="13" stroke="currentColor" strokeWidth="3" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
  </svg>
);

const BabyIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <circle cx="50" cy="45" r="25" stroke="currentColor" strokeWidth="3" />
    <path
      d="M39 42H39.5M61 42H61.5"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M43 54C47 58 53 58 57 54"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M50 20V13M42 18L38 12M58 18L62 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const KidneyIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M45 22C34 14 22 21 21 34C20 48 27 59 38 59C46 59 48 51 48 44C48 34 51 26 45 22Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M55 22C66 14 78 21 79 34C80 48 73 59 62 59C54 59 52 51 52 44C52 34 49 26 55 22Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <path
      d="M45 59C43 68 47 74 50 81M55 59C57 68 53 74 50 81"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const ToothIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M31 28C36 22 44 22 50 27C56 22 64 22 69 28C77 38 69 53 67 65C65 77 61 84 56 84C51 84 51 71 50 65C49 71 49 84 44 84C39 84 35 77 33 65C31 53 23 38 31 28Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

const FemaleIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <circle cx="50" cy="34" r="16" stroke="currentColor" strokeWidth="3" />
    <path
      d="M50 50V82M38 70H62"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M50 66L41 75M50 66L59 75"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const UrologyIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M38 19C30 24 27 34 30 43C33 52 41 56 43 64C45 72 41 79 36 83"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M62 19C70 24 73 34 70 43C67 52 59 56 57 64C55 72 59 79 64 83"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M38 19C42 14 46 14 50 18C54 14 58 14 62 19"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const GeneralIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path
      d="M50 17V83M17 50H83"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ---------------------------------------------------------
   SPECIALTIES DATA
   --------------------------------------------------------- */

const specialties = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Heart & vascular care",
    category: "medical",
    accent: "#9b2668",
    icon: <HeartIcon />,
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    description: "Bones, joints & movement",
    category: "surgical",
    accent: "#9a6a35",
    icon: <BoneIcon />,
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Brain & nervous system",
    category: "medical",
    accent: "#6957b8",
    icon: <BrainIcon />,
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    description: "Lung & respiratory care",
    category: "medical",
    accent: "#43849a",
    icon: <LungsIcon />,
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    description: "Digestive system care",
    category: "medical",
    accent: "#b56b45",
    icon: <StomachIcon />,
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Skin, hair & nails",
    category: "medical",
    accent: "#a87968",
    icon: <SkinIcon />,
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "Vision & eye care",
    category: "medical",
    accent: "#4e6f9b",
    icon: <EyeIcon />,
  },
  {
    id: "paediatrics",
    name: "Paediatrics",
    description: "Healthcare for children",
    category: "medical",
    accent: "#5e8b62",
    icon: <BabyIcon />,
  },
  {
    id: "nephrology",
    name: "Nephrology",
    description: "Kidney & renal care",
    category: "medical",
    accent: "#567ba8",
    icon: <KidneyIcon />,
  },
  {
    id: "dentistry",
    name: "Dentistry",
    description: "Dental & oral health",
    category: "medical",
    accent: "#588a91",
    icon: <ToothIcon />,
  },
  {
    id: "gynaecology",
    name: "Gynaecology",
    description: "Women's health",
    category: "womens",
    accent: "#a95778",
    icon: <FemaleIcon />,
  },
  {
    id: "urology",
    name: "Urology",
    description: "Urinary & men's health",
    category: "surgical",
    accent: "#4c7d91",
    icon: <UrologyIcon />,
  },
  {
    id: "general-medicine",
    name: "General Medicine",
    description: "Comprehensive adult care",
    category: "medical",
    accent: "#4c725c",
    icon: <GeneralIcon />,
  },
];

/* ---------------------------------------------------------
   HERO ORBIT FEATURED DEPARTMENTS
   --------------------------------------------------------- */
const orbitSpecialties = [
  {
    id: "cardiology",
    name: "Interventional Cardiology",
    description:
      "24/7 cardiac intervention, complex angioplasty and advanced heart care.",
    accent: "#9b2668",
    icon: <HeartIcon />,
  },
  {
    id: "orthopaedics",
    name: "Orthopaedics",
    description:
      "Advanced joint, bone and movement care with precision-led treatment.",
    accent: "#8b6339",
    icon: <BoneIcon />,
  },
  {
    id: "neurology",
    name: "Neurology",
    description:
      "Specialist care for the brain, spine and nervous system.",
    accent: "#6655a8",
    icon: <BrainIcon />,
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    description:
      "Focused respiratory care for lungs, breathing and complex pulmonary conditions.",
    accent: "#397f93",
    icon: <LungsIcon />,
  },
];

export function SpecialtiesPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOrbit, setActiveOrbit] = useState(0);
  const [isOrbitPaused, setIsOrbitPaused] = useState(false);

  // WhatsApp & Phone Contacts
  const WHATSAPP_PHONE_NUMBER = "919247958308";
  const DUMMY_PHONE_NUMBER = "+919247958308";

  useEffect(() => {
    if (isOrbitPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveOrbit((current) => (current + 1) % orbitSpecialties.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [isOrbitPaused]);

  // Combined search and category filtering
  const filteredSpecialties = specialties.filter((specialty) => {
    const matchesCategory = filter === "all" || specialty.category === filter;
    const matchesSearch =
      specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialty.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Specialties & Clinical Centers of Excellence | Srikara Hospitals</title>
        <meta
          name="description"
          content="Explore advanced clinical departments, robotic surgery, cardiology, orthopaedics, and multi-specialty healthcare at Srikara Hospitals."
        />
      </Helmet>

      <StickyNavbar />
      <div className="pt-[76px]" />

      <main className="specialist-page">

        {/* ================= HERO ================= */}
        <section className="specialist-hero">
          <div className="hero-bg-grid" />
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="live-dot" />
                SPECIALIST CARE EXCELLENCE
              </div>

              <h1>
                The right
                <br />
                specialist
                <br />
                <em>changes everything.</em>
              </h1>

              <p className="hero-description">
                Find world-class medical specialists across every care discipline
                — equipped with cutting-edge medical technology and patient-first care.
              </p>

              <div className="hero-actions">
                <a href="#specialties" className="primary-button">
                  Explore specialties
                  <span>↓</span>
                </a>

                <a href={`tel:${DUMMY_PHONE_NUMBER}`} className="text-button">
                  Call Support
                  <span>↗</span>
                </a>
              </div>

              <div className="hero-stats-row">
                <div className="stat-item">
                  <span className="stat-val">30+</span>
                  <span className="stat-lbl">Medical Specialties</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-val">150+</span>
                  <span className="stat-lbl">Expert Doctors</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-val">24/7</span>
                  <span className="stat-lbl">Emergency Response</span>
                </div>
              </div>
            </div>

            {/* ================= CLINICAL ORBIT HUB ================= */}
            <div className="hero-visual">
              <div
                className={`orbit-stage ${isOrbitPaused ? "is-paused" : ""}`}
                onMouseEnter={() => setIsOrbitPaused(true)}
                onMouseLeave={() => setIsOrbitPaused(false)}
              >
                <div className="orbit-halo orbit-halo-one" />
                <div className="orbit-halo orbit-halo-two" />

                <div className="orbit-track" aria-label="Featured specialties">
                  {orbitSpecialties.map((specialty, index) => (
                    <button
                      type="button"
                      key={specialty.id}
                      className={`orbit-node ${
                        activeOrbit === index ? "active" : ""
                      }`}
                      style={{
                        "--orbit-angle": `${index * 90}deg`,
                        "--node-accent": specialty.accent,
                      }}
                      aria-label={`Show ${specialty.name}`}
                      aria-pressed={activeOrbit === index}
                      onMouseEnter={() => setActiveOrbit(index)}
                      onFocus={() => setActiveOrbit(index)}
                      onClick={() => setActiveOrbit(index)}
                    >
                      <span className="orbit-node-face">
                        <span className="orbit-node-ring" />
                        <span className="orbit-node-icon">
                          {specialty.icon}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="orbit-center">
                  <div className="center-pulse-ring center-pulse-ring-one" />
                  <div className="center-pulse-ring center-pulse-ring-two" />

                  <div className="center-heart">
                    <svg
                      className="center-heart-icon"
                      viewBox="0 0 100 100"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        className="heart-outline"
                        d="M50 82C46 78 18 60 18 37C18 23 28 15 40 15C46 15 51 18 55 24C59 18 64 15 70 15C82 15 92 23 92 37C92 60 64 78 50 82Z"
                      />
                    </svg>

                    <div className="heartbeat-wave" aria-hidden="true">
                      <span className="heartbeat-line" />
                    </div>
                  </div>

                  <div className="center-monitor">
                    <span className="monitor-dot" />
                    <span>LIVE CLINICAL HUB</span>
                  </div>

                  <div className="center-copy">
                    <span className="center-kicker">FEATURED DEPARTMENT</span>
                    <h2>{orbitSpecialties[activeOrbit].name}</h2>
                    <p>{orbitSpecialties[activeOrbit].description}</p>
                    <button
                      type="button"
                      className="explore-dept-btn"
                      onClick={() => navigate(`/specialties/${orbitSpecialties[activeOrbit].id}`)}
                    >
                      Explore Department <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="orbit-axis orbit-axis-x" />
                <div className="orbit-axis orbit-axis-y" />
              </div>

              <div className="floating-badge">
                <span className="pulse-indicator" />
                <div>
                  <div className="badge-title">24/7 Emergency Care</div>
                  <div className="badge-sub">Specialists On Duty</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FILTER & NAVIGATION WITH SEARCH ================= */}
        <section className="specialty-navigation">
          <div className="section-heading">
            <div>
              <span className="small-number">01 / DEPARTMENTS</span>
              <h2>Our Specialized Care</h2>
            </div>

            <p>
              Explore our clinical departments designed to deliver personalized,
              precision-led treatments across every discipline.
            </p>
          </div>

          <div className="filter-bar-container">
            {/* Search Input Box */}
            <div className="search-box">
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search specialty or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Buttons */}
            <div className="filter-row">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All Specialties
              </button>
              <button
                className={filter === "medical" ? "active" : ""}
                onClick={() => setFilter("medical")}
              >
                Medical Care
              </button>
              <button
                className={filter === "surgical" ? "active" : ""}
                onClick={() => setFilter("surgical")}
              >
                Surgical Care
              </button>
              <button
                className={filter === "womens" ? "active" : ""}
                onClick={() => setFilter("womens")}
              >
                Women's Health
              </button>
            </div>
          </div>
        </section>

        {/* ================= SPECIALTIES GRID ================= */}
        <section id="specialties" className="specialties-section">
          {filteredSpecialties.length === 0 ? (
            <div className="no-results">
              <h3>No specialties found</h3>
              <p>Try searching for a different keyword or select another category.</p>
            </div>
          ) : (
            <div className="specialties-grid">
              {filteredSpecialties.map((specialty, index) => (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/specialties/${specialty.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(`/specialties/${specialty.id}`);
                    }
                  }}
                  className="specialty-item"
                  key={specialty.id}
                  style={{
                    "--specialty-accent": specialty.accent,
                    cursor: "pointer",
                  }}
                >
                  {/* Animated SVG Border Trace Outline */}
                  <svg
                    className="card-svg-outline"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="98"
                      height="98"
                      rx="12"
                      ry="12"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Watermark Icon on Hover */}
                  <div className="specialty-card-bg-icon">{specialty.icon}</div>

                  <div className="specialty-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="specialty-icon-wrapper">
                    <div className="specialty-icon">{specialty.icon}</div>
                  </div>

                  <div className="specialty-content">
                    <h3>{specialty.name}</h3>
                    <p>{specialty.description}</p>
                  </div>

                  {/* Action Buttons: Book Appointment & Call Now */}
                  <div className="specialty-action-bar">
                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                        `Hi, I want to book an appointment for ${specialty.name}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="book-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CalendarIcon />
                      <span>Book Appointment</span>
                    </a>
                    <a
                      href={`tel:${DUMMY_PHONE_NUMBER}`}
                      className="call-btn"
                      title="Call Now"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PhoneIcon />
                      <span>Call</span>
                    </a>
                  </div>

                  <span className="specialty-line" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= CLOSING CTA ================= */}
        <section className="specialist-cta">
          <div className="cta-number">02</div>

          <div className="cta-content">
            <span className="eyebrow">NEED ASSISTANCE?</span>

            <h2>
              Not sure which
              <br />
              specialist is right
              <br />
              <em>for you?</em>
            </h2>

            <p>
              Connect with our medical care team. We will guide you to the right
              department and book a consultation instantly.
            </p>

            <a href={`tel:+919247958308`} className="cta-button">
              Talk to Care Team
              <span>↗</span>
            </a>
          </div>
        </section>

      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}

export default SpecialtiesPage;
