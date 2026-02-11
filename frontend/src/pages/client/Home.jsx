import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

import { 
  Search, Globe, Compass, Phone,
  MapPin, Calendar, ChevronRight,
  Users, Award, Shield, Wind,
  Waves, Ship, Camera, Sunset,
  Anchor, Star, Mail, Map,
  Sparkles, Clock, Check, ArrowRight
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tourCategories = [
    { id: "all", name: "All Tours", icon: <Globe size={18} />, count: 24 },
    { id: "adventure", name: "Adventure", icon: <Wind size={18} />, count: 8, color: "#f97316" },
    { id: "marine", name: "Marine", icon: <Waves size={18} />, count: 6, color: "#0ea5e9" },
    { id: "water", name: "Water Sports", icon: <Ship size={18} />, count: 5, color: "#06b6d4" },
    { id: "photography", name: "Photography", icon: <Camera size={18} />, count: 3, color: "#ec4899" },
    { id: "sunset", name: "Sunset", icon: <Sunset size={18} />, count: 2, color: "#8b5cf6" },
  ];

  const featuredTours = [
    { 
      id: 1,
      name: "Desert Quad Biking", 
      category: "adventure",
      duration: "3-4 hours",
      price: "$95",
      rating: 4.9,
      icon: <Wind size={20} />,
      color: "#f97316",
      featured: true
    },
    { 
      id: 2,
      name: "Dolphin & Seal Cruise", 
      category: "marine",
      duration: "2-3 hours",
      price: "$85",
      rating: 4.8,
      icon: <Waves size={20} />,
      color: "#0ea5e9",
      featured: true
    },
    { 
      id: 3,
      name: "Kayaking with Seals", 
      category: "water",
      duration: "2-4 hours",
      price: "$75",
      rating: 4.7,
      icon: <Ship size={20} />,
      color: "#06b6d4",
      featured: true
    },
    { 
      id: 4,
      name: "Sunset Sailing", 
      category: "sunset",
      duration: "2 hours",
      price: "$65",
      rating: 4.9,
      icon: <Sunset size={20} />,
      color: "#8b5cf6",
      featured: true
    },
    { 
      id: 5,
      name: "Desert Photography Tour", 
      category: "photography",
      duration: "4-5 hours",
      price: "$120",
      rating: 4.8,
      icon: <Camera size={20} />,
      color: "#ec4899",
      featured: true
    },
    { 
      id: 6,
      name: "Marine Safari", 
      category: "marine",
      duration: "3-5 hours",
      price: "$110",
      rating: 4.9,
      icon: <Anchor size={20} />,
      color: "#10b981",
      featured: true
    },
  ];

  const quickActions = [
    { icon: <Compass size={20} />, label: "Browse Tours", description: "50+ adventures", color: "#1d86e9", link: "/client/packages" },
    { icon: <Calendar size={20} />, label: "Book Now", description: "Instant booking", color: "#10b981", link: "/client/packages" },
    { icon: <Phone size={20} />, label: "Contact Us", description: "24/7 support", color: "#8b5cf6", link: "/client/contact" },
    { icon: <MapPin size={20} />, label: "Our Location", description: "Walvis Bay", color: "#f97316" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() || selectedCategory !== "all") {
      navigate(`/client/packages?search=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
    }
  };

  const handleTourClick = (tourId) => {
    navigate(`/client/packages/${tourId}`);
  };

  return (
    <div className="single-view-home">
      {/* HEADER */}
      <header className="single-header">
        <div className="header-container">
          <Link to="/" className="brand">
            {/* Animated Logo */}
            <div className="logo-animation">
              <img
                src="/logo512.png"
                alt="Company Logo"
                className="logo-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  const fallback = document.querySelector(".logo-fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            </div>
            <div className="brand-text">
              <span className="brand-name">WalvisBay</span>
              <span className="brand-subtitle">Tours</span>
            </div>
          </Link>

          <div className="header-right">
            <nav className="main-nav">
              <Link to="/client/packages" className="nav-link">Tours</Link>
              <Link to="/client/about" className="nav-link">About</Link>
              <Link to="/client/contact" className="nav-link">Contact</Link>
            </nav>

            <div className="header-actions">
              <Link to="/client/login" className="btn-login">Sign In</Link>
              <Link to="/client/signup" className="btn-signup">Get Started</Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - NO SCROLL */}
      <main className="main-content">
        <div className="content-grid">
          {/* LEFT PANEL - WELCOME & SEARCH */}
          <div className="left-panel">
            <div className="welcome-section">
              <div className="welcome-badge">
                <Sparkles size={16} />
                <span>Premium Adventure Tours</span>
              </div>
              
              <h1 className="main-title">
                Discover
                <span className="highlight"> Walvis Bay</span>
              </h1>
              
              <p className="main-description">
                Book unforgettable adventures where desert meets ocean. Expert guides, 
                premium experiences, and memories that last a lifetime.
              </p>
              
              {/* SEARCH */}
              <form onSubmit={handleSearch} className="search-section">
                <div className="search-wrapper">
                  <div className="search-input-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tours, activities, or experiences..."
                      className="search-input"
                    />
                    
                  </div>
                </div>
                
                {/* QUICK ACTIONS */}
                <div className="quick-actions-grid">
                  {quickActions.map((action, index) => (
                    <Link 
                      key={index}
                      to={action.link || "#"}
                      className="quick-action"
                      style={{ '--action-color': action.color }}
                    >
                      <div className="action-icon">
                        {action.icon}
                      </div>
                      <div className="action-content">
                        <span className="action-label">{action.label}</span>
                        <span className="action-desc">{action.description}</span>
                      </div>
                      {action.link && <ChevronRight size={16} className="action-arrow" />}
                    </Link>
                  ))}
                </div>
              </form>
              
              {/* FEATURES */}
              <div className="features-section">
                <div className="feature-item">
                  <Shield size={20} />
                  <div>
                    <h4>Safety First</h4>
                    <p>Certified guides & equipment</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Clock size={20} />
                  <div>
                    <h4>Flexible Timing</h4>
                    <p>Morning & afternoon tours</p>
                  </div>
                </div>
                <div className="feature-item">
                  <Users size={20} />
                  <div>
                    <h4>Small Groups</h4>
                    <p>Personalized experiences</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* STATS */}
            <div className="stats-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">500+</div>
                  <div className="stat-label">Happy Travelers</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">98%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">50+</div>
                  <div className="stat-label">Tour Packages</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - TOURS */}
          <div className="right-panel">
            <div className="tours-header">
              <div className="header-content">
                <h2>Featured Tours</h2>
                <p>Most popular adventures chosen by travelers</p>
              </div>
              <Link to="/client/packages" className="view-all-link">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            
            {/* CATEGORY FILTERS */}
            <div className="category-filters">
              {tourCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={category.color ? { '--category-color': category.color } : {}}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-name">{category.name}</span>
                  <span className="filter-count">{category.count}</span>
                </button>
              ))}
            </div>
            
            {/* TOURS GRID */}
            <div className="tours-grid">
              {featuredTours
                .filter(tour => selectedCategory === "all" || tour.category === selectedCategory)
                .map((tour) => (
                  <div 
                    key={tour.id} 
                    className="tour-card"
                    onClick={() => handleTourClick(tour.id)}
                  >
                    <div className="tour-card-header">
                      <div className="tour-icon" style={{ color: tour.color }}>
                        {tour.icon}
                      </div>
                      <div className="tour-rating">
                        <Star size={14} fill="#f59e0b" />
                        <span>{tour.rating}</span>
                      </div>
                    </div>
                    
                    <div className="tour-card-body">
                      <h3 className="tour-name">{tour.name}</h3>
                      <div className="tour-meta">
                        <span className="tour-duration">
                          <Clock size={14} /> {tour.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="tour-card-footer">
                      <div className="tour-price">{tour.price}</div>
                      <button className="tour-action-btn">
                        Book Now <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            
            {/* CTA SECTION */}
            <div className="cta-section">
              <div className="cta-content">
                <div className="cta-icon">
                  <Award size={24} />
                </div>
                <div>
                  <h3>Ready for Your Adventure?</h3>
                  <p>Book with confidence - Best price guarantee</p>
                </div>
                <Link to="/client/packages" className="cta-btn">
                  Book Your Tour
                </Link>
              </div>
            </div>
            
            {/* CONTACT INFO */}
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={16} />
                <span>+264 81 4194911</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@walvisbaytours.com</span>
              </div>
              <div className="contact-item">
                <Map size={16} />
                <span>Walvis Bay, Namibia</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-links">
            <Link to="/client/privacy">Privacy Policy</Link>
            <Link to="/client/terms">Terms & Conditions</Link>
            <Link to="/client/about">About Us</Link>
            <Link to="/client/contact">Contact</Link>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} WalvisBay Tours. All rights reserved. - Developed By VTA Namibia -
          </div>
        </div>
      </footer>
    </div>
  );
}