// Wishlist.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  Trash2,
  Eye,
  Filter,
  Search,
  Share2,
  Download,
  Plus,
  AlertCircle,
  TrendingUp,
  Tag,
  Package,
  ShoppingCart,
  ChevronDown,
  CreditCard,
  Settings,
  HelpCircle,
  TrendingUp as OverviewIcon,
  Bell,
  LogOut
} from "lucide-react";
import TopNavigationBar from "./TopNavigationBar";
import "./wishlist.css";
import "./Dashboard.css";

export default function Wishlist() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("wishlist");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Price drop on Helicopter Tour in your wishlist", time: "1 day ago", read: false, link: "/client/wishlist" },
    { id: 2, message: "New tour added matching your interests", time: "2 days ago", read: true, link: "/client/wishlist" },
  ]);

  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 20000], // Changed to NAD range
    duration: "all",
    season: "all"
  });

  // Convert USD to NAD (1 USD = 18 NAD)
  const convertToNAD = (usd) => Math.round(usd * 18);

  // Mock wishlist data in NAD
  const wishlistItems = [
    {
      id: 1,
      name: "Private Helicopter Tour",
      description: "Aerial views of Walvis Bay and desert landscape",
      price: convertToNAD(450), // NAD 8,100
      originalPrice: convertToNAD(500), // NAD 9,000
      duration: "2 hours",
      maxGroup: 4,
      location: "Walvis Bay",
      category: "luxury",
      season: "all-year",
      rating: 4.9,
      reviewCount: 28,
      addedDate: "2024-05-20",
      image: "helicopter.jpg",
      features: ["Private guide", "Champagne", "Professional photos", "Hotel pickup"],
      availability: "Weekends only",
      discount: 10
    },
    {
      id: 2,
      name: "Desert Stargazing Experience",
      description: "Private astronomy session in the Namib Desert",
      price: convertToNAD(120), // NAD 2,160
      originalPrice: convertToNAD(150), // NAD 2,700
      duration: "4 hours",
      maxGroup: 8,
      location: "Namib Desert",
      category: "adventure",
      season: "dry-season",
      rating: 4.8,
      reviewCount: 42,
      addedDate: "2024-05-18",
      image: "stargazing.jpg",
      features: ["Telescope provided", "Astronomy guide", "Hot drinks", "Blankets"],
      availability: "Evenings",
      discount: 20
    },
    {
      id: 3,
      name: "Seal Colony Kayaking",
      description: "Paddle alongside playful seals in their natural habitat",
      price: convertToNAD(85), // NAD 1,530
      originalPrice: convertToNAD(85), // NAD 1,530
      duration: "3 hours",
      maxGroup: 12,
      location: "Pelican Point",
      category: "wildlife",
      season: "summer",
      rating: 4.7,
      reviewCount: 56,
      addedDate: "2024-05-15",
      image: "seal-kayaking.jpg",
      features: ["All equipment", "Safety briefing", "Guide", "Refreshments"],
      availability: "Daily",
      discount: 0
    },
    {
      id: 4,
      name: "Luxury Sunset Cruise",
      description: "Premium yacht cruise with gourmet dining",
      price: convertToNAD(200), // NAD 3,600
      originalPrice: convertToNAD(250), // NAD 4,500
      duration: "3 hours",
      maxGroup: 20,
      location: "Atlantic Ocean",
      category: "luxury",
      season: "all-year",
      rating: 4.9,
      reviewCount: 89,
      addedDate: "2024-05-10",
      image: "sunset-cruise.jpg",
      features: ["Gourmet dinner", "Open bar", "Live music", "Photographer"],
      availability: "Sunset times",
      discount: 20
    },
    {
      id: 5,
      name: "Desert Quad Biking",
      description: "Adrenaline-filled dune exploration on quad bikes",
      price: convertToNAD(95), // NAD 1,710
      originalPrice: convertToNAD(120), // NAD 2,160
      duration: "2.5 hours",
      maxGroup: 15,
      location: "Dune 7",
      category: "adventure",
      season: "all-year",
      rating: 4.6,
      reviewCount: 67,
      addedDate: "2024-05-05",
      image: "quad-biking.jpg",
      features: ["All equipment", "Safety gear", "Guide", "Water"],
      availability: "Morning & Afternoon",
      discount: 20
    }
  ];

  const [items, setItems] = useState(wishlistItems);

  // Stats in NAD
  const stats = {
    totalItems: items.length,
    totalValue: items.reduce((sum, item) => sum + item.price, 0),
    averageRating: items.reduce((sum, item) => sum + item.rating, 0) / items.length,
    savedAmount: items.reduce((sum, item) => sum + (item.originalPrice - item.price), 0)
  };

  // Filter and sort items
  const filteredItems = items.filter(item => {
    // Search filter
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category !== "all" && item.category !== filters.category) {
      return false;
    }
    
    // Price filter
    if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
      return false;
    }
    
    // Season filter
    if (filters.season !== "all" && item.season !== filters.season) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default: // recent
        return new Date(b.addedDate) - new Date(a.addedDate);
    }
  });

  // Load user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    const storedUserData = localStorage.getItem('clientData');
    
    if (!token) {
      navigate("/client/login", { 
        state: { message: "Please login to access your wishlist." } 
      });
      return;
    }

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Auto-hide sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('clientToken');
    localStorage.removeItem('clientData');
    navigate("/client/login", { 
      state: { message: "You have been logged out successfully." } 
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleItemSelection = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const removeFromWishlist = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const removeSelected = () => {
    setItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleShareWishlist = () => {
    const link = `${window.location.origin}/wishlist/share/${Math.random().toString(36).substr(2, 9)}`;
    setShareLink(link);
    setShowShareModal(true);
    
    // Copy to clipboard
    navigator.clipboard.writeText(link).then(() => {
      alert("Share link copied to clipboard!");
    });
  };

  const handleExport = () => {
    const data = selectedItems.length > 0 
      ? items.filter(item => selectedItems.includes(item.id))
      : items;
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wishlist.json';
    a.click();
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case "luxury": return "💎";
      case "adventure": return "⚡";
      case "wildlife": return "🦭";
      default: return "📍";
    }
  };

  const getSeasonColor = (season) => {
    const colors = {
      "all-year": "#10b981",
      "summer": "#f59e0b",
      "winter": "#3b82f6",
      "dry-season": "#8b5cf6"
    };
    return colors[season] || "#6b7280";
  };

  // Format NAD currency
  const formatNAD = (amount) => {
    return `N$${amount.toLocaleString('en-NA')}`;
  };

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        userData={userData}
        activeTab="wishlist"
        setActiveTab={setActiveTab}
        notifications={notifications}
        markAllNotificationsRead={markAllNotificationsRead}
        handleLogout={handleLogout}
      />

      {/* Main Dashboard Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="user-info">
              <div className="avatar-large">
                <span className="avatar-initials">
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              {!sidebarCollapsed && (
                <div className="user-details">
                  <h3>{userData?.name || "User"}</h3>
                  <p className="user-email">{userData?.email || "user@example.com"}</p>
                  <div className="user-tier">
                    <Star size={14} />
                    <span>Explorer Member</span>
                  </div>
                </div>
              )}
            </div>
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? "→" : "←"}
            </button>
          </div>

          <div className="sidebar-menu">
            <Link to="/client/dashboard" className="menu-item">
              <OverviewIcon size={20} />
              {!sidebarCollapsed && <span>Overview</span>}
            </Link>
            
            <Link to="/client/bookings" className="menu-item">
              <Calendar size={20} />
              {!sidebarCollapsed && <span>My Bookings</span>}
            </Link>
            
            <Link to="/client/wishlist" className="menu-item active">
              <Heart size={20} />
              {!sidebarCollapsed && <span>Wishlist</span>}
            </Link>
            
            <Link to="/client/payments" className="menu-item">
              <CreditCard size={20} />
              {!sidebarCollapsed && <span>Payments</span>}
            </Link>
            
            <Link to="/client/reviews" className="menu-item">
              <Star size={20} />
              {!sidebarCollapsed && <span>My Reviews</span>}
            </Link>
            
            <Link to="/client/support" className="menu-item">
              <HelpCircle size={20} />
              {!sidebarCollapsed && <span>Support</span>}
            </Link>
            
            <Link to="/client/settings" className="menu-item">
              <Settings size={20} />
              {!sidebarCollapsed && <span>Settings</span>}
            </Link>
          </div>

          {!sidebarCollapsed && (
            <div className="sidebar-promo">
              <h4>🎉 Special Offer</h4>
              <p>Get 20% off your next tour!</p>
              <Link to="/client/packages" className="promo-btn">
                Explore Tours
              </Link>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-main">
          {/* Wishlist Page Content */}
          <div className="wishlist-page">
            {/* Header */}
            <div className="wishlist-header">
              <div className="header-left">
                <h1>My Wishlist</h1>
                <p className="subtitle">Save tours you love for later</p>
              </div>
              
              <div className="header-actions">
                <button 
                  className="btn primary"
                  onClick={() => navigate("/client/packages")}
                >
                  <Plus size={18} />
                  Explore More Tours
                </button>
                
                <button 
                  className="btn outline"
                  onClick={handleShareWishlist}
                >
                  <Share2 size={18} />
                  Share List
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="wishlist-stats">
              <div className="stat-card">
                <div className="stat-icon">
                  <Heart size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.totalItems}</h3>
                  <p>Saved Items</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Tag size={24} />
                </div>
                <div className="stat-info">
                  <h3>{formatNAD(stats.totalValue)}</h3>
                  <p>Total Value</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Star size={24} />
                </div>
                <div className="stat-info">
                  <h3>{stats.averageRating.toFixed(1)}</h3>
                  <p>Avg. Rating</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <h3>{formatNAD(stats.savedAmount)}</h3>
                  <p>Total Saved</p>
                </div>
              </div>
            </div>

            <div className="wishlist-content">
              {/* Sidebar - Filters */}
              <aside className="wishlist-sidebar">
                <div className="filter-section">
                  <div className="filter-header" onClick={() => setFilterOpen(!filterOpen)}>
                    <h3>
                      <Filter size={18} />
                      Filter & Sort
                    </h3>
                    <ChevronDown size={18} className={filterOpen ? "open" : ""} />
                  </div>
                  
                  {filterOpen && (
                    <div className="filter-content">
                      <div className="filter-group">
                        <label>Sort By</label>
                        <select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="recent">Recently Added</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="rating">Highest Rated</option>
                          <option value="name">Alphabetical</option>
                        </select>
                      </div>
                      
                      <div className="filter-group">
                        <label>Category</label>
                        <select 
                          value={filters.category}
                          onChange={(e) => setFilters({...filters, category: e.target.value})}
                        >
                          <option value="all">All Categories</option>
                          <option value="luxury">Luxury Tours</option>
                          <option value="adventure">Adventure</option>
                          <option value="wildlife">Wildlife</option>
                          <option value="cultural">Cultural</option>
                        </select>
                      </div>
                      
                      <div className="filter-group">
                        <label>Price Range: {formatNAD(filters.priceRange[0])} - {formatNAD(filters.priceRange[1])}</label>
                        <input
                          type="range"
                          min="0"
                          max="20000"
                          step="500"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                          className="price-slider"
                        />
                      </div>
                      
                      <div className="filter-group">
                        <label>Season</label>
                        <select 
                          value={filters.season}
                          onChange={(e) => setFilters({...filters, season: e.target.value})}
                        >
                          <option value="all">All Seasons</option>
                          <option value="all-year">All Year</option>
                          <option value="summer">Summer</option>
                          <option value="winter">Winter</option>
                          <option value="dry-season">Dry Season</option>
                        </select>
                      </div>
                      
                      <button 
                        className="btn outline full"
                        onClick={() => {
                          setFilters({
                            category: "all",
                            priceRange: [0, 20000],
                            duration: "all",
                            season: "all"
                          });
                          setSortBy("recent");
                        }}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="quick-tips">
                  <h3>💡 Tips</h3>
                  <ul>
                    <li>Add up to 20 tours to your wishlist</li>
                    <li>Share your list with friends & family</li>
                    <li>Get notified when tours go on sale</li>
                    <li>Compare tours side by side</li>
                  </ul>
                </div>
              </aside>

              {/* Main Content */}
              <main className="wishlist-main">
                {/* Search and Actions */}
                <div className="wishlist-toolbar">
                  <div className="search-box">
                    <Search size={18} />
                    <input
                      type="text"
                      placeholder="Search your wishlist..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="toolbar-actions">
                    {selectedItems.length > 0 && (
                      <div className="selection-info">
                        <span>{selectedItems.length} selected</span>
                        <button 
                          className="btn outline danger"
                          onClick={removeSelected}
                        >
                          <Trash2 size={16} />
                          Remove Selected
                        </button>
                      </div>
                    )}
                    
                    <button 
                      className="btn outline"
                      onClick={handleExport}
                    >
                      <Download size={18} />
                      Export List
                    </button>
                  </div>
                </div>

                {/* Batch Actions */}
                {filteredItems.length > 0 && (
                  <div className="batch-select">
                    <label className="select-all">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === filteredItems.length}
                        onChange={selectAllItems}
                      />
                      <span>Select All ({filteredItems.length})</span>
                    </label>
                    
                    {selectedItems.length > 0 && (
                      <div className="batch-buttons">
                        <button 
                          className="btn outline"
                          onClick={() => {
                            const selectedItemsData = items.filter(item => selectedItems.includes(item.id));
                            console.log("Book selected:", selectedItemsData);
                            navigate("/client/packages", { state: { selectedTours: selectedItems } });
                          }}
                        >
                          <ShoppingCart size={16} />
                          Book Selected ({selectedItems.length})
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Wishlist Items */}
                <div className="wishlist-items">
                  {filteredItems.length === 0 ? (
                    <div className="empty-state">
                      <Heart size={48} />
                      <h3>Your wishlist is empty</h3>
                      <p>Start adding tours you love!</p>
                      <button 
                        className="btn primary"
                        onClick={() => navigate("/client/packages")}
                      >
                        Browse Tours
                      </button>
                    </div>
                  ) : (
                    <div className="items-grid">
                      {filteredItems.map(item => (
                        <div key={item.id} className="wishlist-item">
                          <div className="item-header">
                            <label className="item-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => toggleItemSelection(item.id)}
                              />
                            </label>
                            
                            <div className="item-category">
                              <span className="category-icon">
                                {getCategoryIcon(item.category)}
                              </span>
                              <span className="category-name">
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                              </span>
                            </div>
                            
                            <div className="item-actions">
                              <button 
                                className="icon-btn"
                                onClick={() => removeFromWishlist(item.id)}
                                title="Remove from wishlist"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="item-image">
                            <div className="image-placeholder">
                              <Package size={40} />
                            </div>
                            
                            {item.discount > 0 && (
                              <div className="discount-badge">
                                Save {item.discount}%
                              </div>
                            )}
                          </div>
                          
                          <div className="item-content">
                            <h3>{item.name}</h3>
                            <p className="item-description">{item.description}</p>
                            
                            <div className="item-meta">
                              <div className="meta-item">
                                <MapPin size={14} />
                                <span>{item.location}</span>
                              </div>
                              <div className="meta-item">
                                <Clock size={14} />
                                <span>{item.duration}</span>
                              </div>
                              <div className="meta-item">
                                <Users size={14} />
                                <span>Up to {item.maxGroup}</span>
                              </div>
                            </div>
                            
                            <div className="item-features">
                              {item.features.slice(0, 3).map((feature, index) => (
                                <span key={index} className="feature-tag">
                                  {feature}
                                </span>
                              ))}
                            </div>
                            
                            <div className="item-rating">
                              <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    fill={i < Math.floor(item.rating) ? "#FFD700" : "none"}
                                    color={i < Math.floor(item.rating) ? "#FFD700" : "#CBD5E1"}
                                  />
                                ))}
                              </div>
                              <span className="rating-number">{item.rating}</span>
                              <span className="review-count">({item.reviewCount})</span>
                            </div>
                            
                            <div className="item-footer">
                              <div className="price-info">
                                <div className="current-price">{formatNAD(item.price)}</div>
                                {item.originalPrice > item.price && (
                                  <div className="original-price">{formatNAD(item.originalPrice)}</div>
                                )}
                              </div>
                              
                              <div className="item-buttons">
                                <button 
                                  className="btn outline small"
                                  onClick={() => navigate(`/client/tours/${item.id}`)}
                                >
                                  <Eye size={14} />
                                  Details
                                </button>
                                <button 
                                  className="btn primary small"
                                  onClick={() => navigate(`/client/book/${item.id}`)}
                                >
                                  <Calendar size={14} />
                                  Book Now
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="item-availability">
                            <div 
                              className="season-tag"
                              style={{ 
                                backgroundColor: `${getSeasonColor(item.season)}15`,
                                color: getSeasonColor(item.season)
                              }}
                            >
                              {item.season.replace('-', ' ')}
                            </div>
                            <span className="availability-text">{item.availability}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Recommendations */}
                {filteredItems.length > 0 && (
                  <div className="recommendations">
                    <h3>You might also like...</h3>
                    <div className="recommendations-grid">
                      <div className="recommendation-card">
                        <div className="rec-image"></div>
                        <div className="rec-content">
                          <h4>Photography Workshop</h4>
                          <p>Learn landscape photography in the desert</p>
                          <div className="rec-price">From {formatNAD(convertToNAD(150))}</div>
                        </div>
                      </div>
                      
                      <div className="recommendation-card">
                        <div className="rec-image"></div>
                        <div className="rec-content">
                          <h4>Wine Tasting Tour</h4>
                          <p>Local wines with ocean views</p>
                          <div className="rec-price">From {formatNAD(convertToNAD(75))}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </main>
            </div>

            {/* Share Modal */}
            {showShareModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-header">
                    <h3>Share Your Wishlist</h3>
                    <button 
                      className="close-modal"
                      onClick={() => setShowShareModal(false)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="modal-content">
                    <p>Share this link with friends and family:</p>
                    <div className="share-link">
                      <input
                        type="text"
                        value={shareLink}
                        readOnly
                      />
                      <button 
                        className="btn outline"
                        onClick={() => navigator.clipboard.writeText(shareLink)}
                      >
                        Copy
                      </button>
                    </div>
                    
                    <div className="share-options">
                      <button className="share-option">
                        📧 Email
                      </button>
                      <button className="share-option">
                        💬 WhatsApp
                      </button>
                      <button className="share-option">
                        📱 SMS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}