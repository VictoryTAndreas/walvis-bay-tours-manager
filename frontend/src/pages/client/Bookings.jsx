// Bookings.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CreditCard,
  FileText,
  Download,
  Printer,
  Share2,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  Star,
  MessageSquare,
  CalendarDays,
  Truck,
  Hotel,
  Utensils,
  Camera,
  Heart,
  Settings,
  TrendingUp as OverviewIcon,
  HelpCircle,
  Bell,
  LogOut
} from "lucide-react";
import TopNavigationBar from "./TopNavigationBar";
import "./Bookings.css";
import "./Dashboard.css"; // Assuming you have Dashboard.css from previous code

export default function Bookings() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("bookings"); // For navbar
  const [bookingsActiveTab, setBookingsActiveTab] = useState("upcoming"); // For bookings section
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your desert safari tour is confirmed", time: "2 hours ago", read: false, link: "/client/bookings" },
    { id: 2, message: "Reminder: Marine Tour tomorrow at 9:30 AM", time: "1 day ago", read: false, link: "/client/bookings" },
  ]);

  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
    tourType: "all",
    priceRange: [0, 1000]
  });

  // Load user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    const storedUserData = localStorage.getItem('clientData');
    
    if (!token) {
      navigate("/client/login", { 
        state: { message: "Please login to access your bookings." } 
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

  // Mock bookings data
  const bookingsData = {
    upcoming: [
      {
        id: "WB-2024-001",
        tourName: "Premium Desert Safari",
        date: "2024-06-15",
        time: "08:00 AM",
        duration: "8 hours",
        participants: 2,
        price: 300,
        status: "confirmed",
        guide: "John M.",
        location: "Namib Desert",
        meetingPoint: "Walvis Bay Visitor Center",
        includes: ["Transport", "Lunch", "Guide", "Photos"],
        paymentStatus: "paid",
        bookingDate: "2024-05-20"
      },
      {
        id: "WB-2024-002",
        tourName: "Marine Wildlife Tour",
        date: "2024-06-20",
        time: "09:30 AM",
        duration: "6 hours",
        participants: 4,
        price: 480,
        status: "pending",
        guide: "Sarah K.",
        location: "Walvis Bay Lagoon",
        meetingPoint: "Yacht Club Marina",
        includes: ["Boat", "Snacks", "Guide", "Life Jackets"],
        paymentStatus: "partial",
        bookingDate: "2024-05-25"
      },
      {
        id: "WB-2024-003",
        tourName: "Sunset Kayaking Adventure",
        date: "2024-06-22",
        time: "04:00 PM",
        duration: "3 hours",
        participants: 1,
        price: 120,
        status: "confirmed",
        guide: "Mike T.",
        location: "Pelican Point",
        meetingPoint: "Kayak Center",
        includes: ["Equipment", "Guide", "Photos", "Refreshments"],
        paymentStatus: "paid",
        bookingDate: "2024-05-28"
      }
    ],
    completed: [
      {
        id: "WB-2024-004",
        tourName: "Dolphin Cruise",
        date: "2024-05-10",
        time: "10:00 AM",
        duration: "4 hours",
        participants: 3,
        price: 240,
        status: "completed",
        guide: "Emma R.",
        location: "Atlantic Ocean",
        meetingPoint: "Main Harbor",
        includes: ["Boat", "Lunch", "Guide"],
        paymentStatus: "paid",
        rating: 5,
        review: "Absolutely amazing! Saw so many dolphins!",
        bookingDate: "2024-04-15"
      },
      {
        id: "WB-2024-005",
        tourName: "Sandboarding Experience",
        date: "2024-04-22",
        time: "02:00 PM",
        duration: "5 hours",
        participants: 2,
        price: 180,
        status: "completed",
        guide: "David L.",
        location: "Dune 7",
        meetingPoint: "Adventure Base",
        includes: ["Equipment", "Transport", "Guide"],
        paymentStatus: "paid",
        rating: 4,
        review: "Thrilling experience, great instructors!",
        bookingDate: "2024-03-30"
      }
    ],
    cancelled: [
      {
        id: "WB-2024-006",
        tourName: "Photography Tour",
        date: "2024-05-05",
        time: "06:00 AM",
        duration: "7 hours",
        participants: 1,
        price: 200,
        status: "cancelled",
        guide: "Lisa P.",
        location: "Various Locations",
        meetingPoint: "Photography Studio",
        includes: ["Transport", "Guide", "Tips"],
        paymentStatus: "refunded",
        cancellationReason: "Weather conditions",
        bookingDate: "2024-04-10"
      }
    ]
  };

  const [bookings, setBookings] = useState(bookingsData.upcoming);
  const [expandedBooking, setExpandedBooking] = useState(null);

  useEffect(() => {
    // Load bookings based on active tab
    setBookings(bookingsData[bookingsActiveTab]);
    setSelectedBookings([]);
  }, [bookingsActiveTab]);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredBookings = bookings.filter(booking => {
    // Search filter
    if (searchTerm && !booking.tourName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status !== "all" && booking.status !== filters.status) {
      return false;
    }
    
    // Price filter
    if (booking.price < filters.priceRange[0] || booking.price > filters.priceRange[1]) {
      return false;
    }
    
    return true;
  });

  const toggleBookingSelection = (id) => {
    setSelectedBookings(prev =>
      prev.includes(id)
        ? prev.filter(bookingId => bookingId !== id)
        : [...prev, id]
    );
  };

  const selectAllBookings = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(b => b.id));
    }
  };

  const handleExport = () => {
    // Export functionality
    console.log("Exporting bookings:", selectedBookings);
    alert("Export feature coming soon!");
  };

  const handlePrint = (booking) => {
    // Print functionality
    window.print();
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "#10b981",
      pending: "#f59e0b",
      completed: "#3b82f6",
      cancelled: "#ef4444"
    };
    return colors[status] || "#6b7280";
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      paid: "#10b981",
      partial: "#f59e0b",
      pending: "#f59e0b",
      refunded: "#6b7280"
    };
    return colors[status] || "#6b7280";
  };

  const stats = [
    { label: "Total Bookings", value: 8, change: "+2", color: "#3b82f6" },
    { label: "Upcoming", value: 3, change: "+1", color: "#10b981" },
    { label: "Completed", value: 5, change: "+3", color: "#8b5cf6" },
    { label: "Total Spent", value: "$1,620", change: "+$420", color: "#f59e0b" },
  ];

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        userData={userData}
        activeTab="bookings"
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
            
            <Link to="/client/bookings" className="menu-item active">
              <Calendar size={20} />
              {!sidebarCollapsed && <span>My Bookings</span>}
            </Link>
            
            <Link to="/client/wishlist" className="menu-item">
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
        <main className="dashboard-main bookings-page">
          {/* Header */}
          <div className="bookings-header">
            <div className="header-left">
              <h1>My Bookings</h1>
              <p className="subtitle">Manage all your tour reservations in one place</p>
            </div>
            
            <div className="header-actions">
              <button 
                className="btn primary"
                onClick={() => navigate("/client/packages")}
              >
                <Plus size={18} />
                Book New Tour
              </button>
              
              <button 
                className="btn outline refresh-btn"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw size={18} className={loading ? "spinning" : ""} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="stats-overview">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15` }}>
                  <div style={{ color: stat.color }}>
                    {index === 0 && <Calendar size={24} />}
                    {index === 1 && <CheckCircle size={24} />}
                    {index === 2 && <Star size={24} />}
                    {index === 3 && <CreditCard size={24} />}
                  </div>
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                  <span className="stat-change" style={{ color: stat.color }}>
                    {stat.change} this month
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="bookings-content">
            {/* Left Sidebar - Filters */}
            <aside className="filters-sidebar">
              <div className="filter-section">
                <div className="filter-header" onClick={() => setFilterOpen(!filterOpen)}>
                  <h3>
                    <Filter size={18} />
                    Filters
                  </h3>
                  <ChevronDown size={18} className={filterOpen ? "open" : ""} />
                </div>
                
                {filterOpen && (
                  <div className="filter-content">
                    <div className="filter-group">
                      <label>Status</label>
                      <select 
                        value={filters.status}
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label>Date Range</label>
                      <select 
                        value={filters.dateRange}
                        onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                      >
                        <option value="all">All Dates</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">Next 3 Months</option>
                        <option value="year">This Year</option>
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label>Tour Type</label>
                      <select 
                        value={filters.tourType}
                        onChange={(e) => handleFilterChange("tourType", e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="desert">Desert Tours</option>
                        <option value="marine">Marine Tours</option>
                        <option value="adventure">Adventure</option>
                        <option value="cultural">Cultural</option>
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</label>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value)])}
                        className="price-slider"
                      />
                    </div>
                    
                    <button 
                      className="btn outline full"
                      onClick={() => setFilters({
                        status: "all",
                        dateRange: "all",
                        tourType: "all",
                        priceRange: [0, 1000]
                      })}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
              
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <button className="action-btn">
                  <Download size={18} />
                  Export All Bookings
                </button>
                <button className="action-btn">
                  <Printer size={18} />
                  Print Schedule
                </button>
                <button className="action-btn">
                  <CalendarDays size={18} />
                  Add to Calendar
                </button>
              </div>
            </aside>

            {/* Main Bookings Area */}
            <main className="bookings-main">
              {/* Tabs and Search */}
              <div className="bookings-toolbar">
                <div className="tabs">
                  {["upcoming", "completed", "cancelled"].map(tab => (
                    <button
                      key={tab}
                      className={`tab-btn ${bookingsActiveTab === tab ? "active" : ""}`}
                      onClick={() => setBookingsActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      <span className="tab-count">{bookingsData[tab].length}</span>
                    </button>
                  ))}
                </div>
                
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Batch Actions */}
              {selectedBookings.length > 0 && (
                <div className="batch-actions">
                  <div className="batch-info">
                    <span>{selectedBookings.length} bookings selected</span>
                  </div>
                  <div className="batch-buttons">
                    <button className="btn outline" onClick={handleExport}>
                      <Download size={16} />
                      Export Selected
                    </button>
                    <button className="btn outline">
                      <Printer size={16} />
                      Print Selected
                    </button>
                    <button className="btn outline danger">
                      <Trash2 size={16} />
                      Cancel Selected
                    </button>
                  </div>
                </div>
              )}

              {/* Bookings List */}
              <div className="bookings-list">
                {filteredBookings.length === 0 ? (
                  <div className="empty-state">
                    <Calendar size={48} />
                    <h3>No bookings found</h3>
                    <p>Try adjusting your filters or book a new tour</p>
                    <button 
                      className="btn primary"
                      onClick={() => navigate("/client/packages")}
                    >
                      Browse Tours
                    </button>
                  </div>
                ) : (
                  filteredBookings.map(booking => (
                    <div 
                      key={booking.id} 
                      className={`booking-card ${expandedBooking === booking.id ? "expanded" : ""}`}
                    >
                      <div className="booking-header">
                        <div className="booking-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedBookings.includes(booking.id)}
                            onChange={() => toggleBookingSelection(booking.id)}
                          />
                        </div>
                        
                        <div className="booking-info">
                          <div className="booking-id">
                            <span className="badge">#{booking.id}</span>
                            <h3>{booking.tourName}</h3>
                          </div>
                          
                          <div className="booking-meta">
                            <div className="meta-item">
                              <Calendar size={14} />
                              <span>{new Date(booking.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                            <div className="meta-item">
                              <Clock size={14} />
                              <span>{booking.time}</span>
                            </div>
                            <div className="meta-item">
                              <Users size={14} />
                              <span>{booking.participants} {booking.participants === 1 ? 'person' : 'people'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="booking-status">
                          <div 
                            className="status-badge"
                            style={{ backgroundColor: `${getStatusColor(booking.status)}15`, color: getStatusColor(booking.status) }}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </div>
                          <div className="booking-price">${booking.price}</div>
                        </div>
                        
                        <button 
                          className="expand-btn"
                          onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                        >
                          {expandedBooking === booking.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                      
                      {/* Expanded Details */}
                      {expandedBooking === booking.id && (
                        <div className="booking-details">
                          <div className="details-grid">
                            <div className="detail-section">
                              <h4>Tour Details</h4>
                              <div className="detail-item">
                                <MapPin size={16} />
                                <div>
                                  <strong>Location:</strong>
                                  <span>{booking.location}</span>
                                </div>
                              </div>
                              <div className="detail-item">
                                <Clock size={16} />
                                <div>
                                  <strong>Duration:</strong>
                                  <span>{booking.duration}</span>
                                </div>
                              </div>
                              <div className="detail-item">
                                <Users size={16} />
                                <div>
                                  <strong>Guide:</strong>
                                  <span>{booking.guide}</span>
                                </div>
                              </div>
                              <div className="detail-item">
                                <MapPin size={16} />
                                <div>
                                  <strong>Meeting Point:</strong>
                                  <span>{booking.meetingPoint}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="detail-section">
                              <h4>Included</h4>
                              <div className="included-items">
                                {booking.includes.map((item, index) => (
                                  <span key={index} className="included-badge">
                                    {item === "Transport" && <Truck size={14} />}
                                    {item === "Lunch" && <Utensils size={14} />}
                                    {item === "Guide" && <Users size={14} />}
                                    {item === "Photos" && <Camera size={14} />}
                                    {item === "Boat" && "🚤"}
                                    {item === "Snacks" && "🍎"}
                                    {item === "Life Jackets" && "🦺"}
                                    {item === "Equipment" && "🎿"}
                                    {item === "Refreshments" && "🥤"}
                                    {item === "Tips" && "💡"}
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="detail-section">
                              <h4>Payment Info</h4>
                              <div className="detail-item">
                                <CreditCard size={16} />
                                <div>
                                  <strong>Status:</strong>
                                  <span className="payment-status" style={{ color: getPaymentStatusColor(booking.paymentStatus) }}>
                                    {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                                  </span>
                                </div>
                              </div>
                              <div className="detail-item">
                                <Calendar size={16} />
                                <div>
                                  <strong>Booked On:</strong>
                                  <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                              
                              {booking.rating && (
                                <div className="detail-item">
                                  <Star size={16} />
                                  <div>
                                    <strong>Your Rating:</strong>
                                    <div className="rating-stars">
                                      {[...Array(5)].map((_, i) => (
                                        <Star 
                                          key={i} 
                                          size={14} 
                                          fill={i < booking.rating ? "#FFD700" : "none"}
                                          color={i < booking.rating ? "#FFD700" : "#CBD5E1"}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="booking-actions">
                            <button className="btn outline">
                              <Eye size={16} />
                              View Details
                            </button>
                            <button className="btn outline">
                              <Edit size={16} />
                              Modify Booking
                            </button>
                            {booking.status === "confirmed" && (
                              <button className="btn outline danger">
                                <AlertCircle size={16} />
                                Cancel Booking
                              </button>
                            )}
                            <button className="btn outline" onClick={() => handlePrint(booking)}>
                              <Printer size={16} />
                              Print Voucher
                            </button>
                            <button className="btn outline">
                              <Share2 size={16} />
                              Share
                            </button>
                            
                            {booking.status === "completed" && !booking.review && (
                              <button className="btn primary">
                                <MessageSquare size={16} />
                                Write Review
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              
              {/* Pagination */}
              <div className="pagination">
                <button className="pagination-btn" disabled>
                  ← Previous
                </button>
                <div className="pagination-pages">
                  <span className="active">1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>...</span>
                  <span>10</span>
                </div>
                <button className="pagination-btn">
                  Next →
                </button>
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}