// ClientDashboard.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell, 
  Package,
  Star,
  TrendingUp,
  Clock,
  ChevronRight,
  Menu,
  X,
  Heart,
  MessageSquare,
  HelpCircle,
  FileText,
  CheckCircle
} from "lucide-react";
import TopNavigationBar from "./TopNavigationBar"
import "./Dashboard.css";
export default function ClientDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const welcomeMessage = location.state?.welcomeMessage;
  const [userData, setUserData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your desert safari tour is confirmed", time: "2 hours ago", read: false, link: "/client/bookings" },
    { id: 2, message: "New tour packages available", time: "1 day ago", read: false, link: "/client/packages" },
    { id: 3, message: "Payment for kayaking tour successful", time: "2 days ago", read: true, link: "/client/payments" },
    { id: 4, message: "Your review was helpful to others!", time: "3 days ago", read: true, link: "/client/reviews" },
    { id: 5, message: "Special offer: 20% off next booking", time: "1 week ago", read: true, link: "/client/packages" },
  ]);

  const [upcomingTours, setUpcomingTours] = useState([
    { 
      id: 1, 
      name: "Desert Safari Adventure", 
      date: "2024-06-15", 
      time: "08:00 AM", 
      status: "Confirmed",
      guide: "John M.",
      price: "$150",
      image: "desert-safari.jpg",
      link: "/client/bookings/1"
    },
    { 
      id: 2, 
      name: "Marine Wildlife Tour", 
      date: "2024-06-20", 
      time: "09:30 AM", 
      status: "Pending",
      guide: "Sarah K.",
      price: "$120",
      image: "marine-tour.jpg",
      link: "/client/bookings/2"
    },
    { 
      id: 3, 
      name: "Sunset Kayaking", 
      date: "2024-06-25", 
      time: "04:00 PM", 
      status: "Confirmed",
      guide: "Mike T.",
      price: "$95",
      image: "kayaking.jpg",
      link: "/client/bookings/3"
    },
  ]);

  const [pastTours, setPastTours] = useState([
    { 
      id: 1, 
      name: "Dolphin Cruise", 
      date: "2024-05-10", 
      rating: 5,
      review: "Amazing experience! Saw so many dolphins!",
      image: "dolphin-cruise.jpg",
      link: "/client/reviews",
      reviewLink: "/client/reviews?write=1"
    },
    { 
      id: 2, 
      name: "Sandboarding Experience", 
      date: "2024-04-22", 
      rating: 4,
      review: "Thrilling adventure, great instructors!",
      image: "sandboarding.jpg",
      link: "/client/reviews",
      reviewLink: "/client/reviews?write=2"
    },
  ]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('clientToken');
    const storedUserData = localStorage.getItem('clientData');
    
    if (!token) {
      navigate("/client/login", { 
        state: { message: "Please login to access your dashboard." } 
      });
      return;
    }

    // Load user data
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Show welcome message if available
    if (welcomeMessage) {
      console.log("Welcome:", welcomeMessage);
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
  }, [navigate, welcomeMessage]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('clientToken');
    localStorage.removeItem('clientData');
    
    // Redirect to login
    navigate("/client/login", { 
      state: { message: "You have been logged out successfully." } 
    });
  };

  const handleNotificationClick = (notification) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleViewDetails = (tour) => {
    navigate(tour.link || "/client/bookings");
  };

  const handleWriteReview = (tour) => {
    navigate(tour.reviewLink || "/client/reviews");
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const stats = [
    { 
      label: "Upcoming Tours", 
      value: upcomingTours.length, 
      icon: <Calendar size={24} />, 
      color: "#1d86e9",
      link: "/client/bookings"
    },
    { 
      label: "Past Tours", 
      value: pastTours.length, 
      icon: <Package size={24} />, 
      color: "#10b981",
      link: "/client/reviews"
    },
    { 
      label: "Total Spent", 
      value: "$570", 
      icon: <CreditCard size={24} />, 
      color: "#f59e0b",
      link: "/client/payments"
    },
    { 
      label: "Tour Guides", 
      value: "3", 
      icon: <Users size={24} />, 
      color: "#8b5cf6",
      link: "/client/bookings"
    },
  ];

  const quickActions = [
    { icon: <MapPin size={24} />, label: "Book New Tour", link: "/client/packages" },
    { icon: <CreditCard size={24} />, label: "Make Payment", link: "/client/payments" },
    { icon: <Heart size={24} />, label: "My Wishlist", link: "/client/wishlist" },
    { icon: <MessageSquare size={24} />, label: "Write Review", link: "/client/reviews" },
    { icon: <Settings size={24} />, label: "Update Profile", link: "/client/settings" },
    { icon: <HelpCircle size={24} />, label: "Support", link: "/client/support" },
  ];

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        userData={userData}
        activeTab={activeTab}
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
                  {userData?.name ? userData.name.charAt(0) : "U"}
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
            <Link to="/client/dashboard" className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}>
              <TrendingUp size={20} />
              {!sidebarCollapsed && <span>Overview</span>}
            </Link>
            
            <Link to="/client/bookings" className={`menu-item ${activeTab === "bookings" ? "active" : ""}`}>
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
            
            <Link to="/client/settings" className={`menu-item ${activeTab === "profile" ? "active" : ""}`}>
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
          {/* Welcome Header */}
          <div className="welcome-header">
            <h1>Welcome back, {userData?.name?.split(' ')[0] || 'there'}! 👋</h1>
            <p className="welcome-subtitle">Here's what's happening with your tours today</p>
            {welcomeMessage && (
              <div className="welcome-alert">
                <CheckCircle size={18} />
                <span>{welcomeMessage}</span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <Link 
                key={index} 
                to={stat.link}
                className="stat-card"
                onClick={() => {
                  if (stat.link.includes('bookings')) setActiveTab('bookings');
                  if (stat.link.includes('reviews')) setActiveTab('reviews');
                  if (stat.link.includes('payments')) setActiveTab('payments');
                }}
              >
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15` }}>
                  <div style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
                <div className="stat-info">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
                <ChevronRight size={16} className="stat-arrow" />
              </Link>
            ))}
          </div>

          {/* Upcoming Tours */}
          <div className="section">
            <div className="section-header">
              <h2>Upcoming Tours</h2>
              <Link to="/client/bookings" className="view-all">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="tours-grid">
              {upcomingTours.map(tour => (
                <div key={tour.id} className="tour-card">
                  <div className="tour-image">
                    <div className="image-placeholder">
                      <MapPin size={32} />
                    </div>
                    <div className={`tour-status ${tour.status.toLowerCase()}`}>
                      {tour.status}
                    </div>
                  </div>
                  <div className="tour-content">
                    <h3>{tour.name}</h3>
                    <div className="tour-details">
                      <div className="detail">
                        <Calendar size={16} />
                        <span>{tour.date}</span>
                      </div>
                      <div className="detail">
                        <Clock size={16} />
                        <span>{tour.time}</span>
                      </div>
                      <div className="detail">
                        <Users size={16} />
                        <span>Guide: {tour.guide}</span>
                      </div>
                    </div>
                    <div className="tour-footer">
                      <span className="tour-price">{tour.price}</span>
                      <button 
                        className="btn outline small"
                        onClick={() => handleViewDetails(tour)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="row-section">
            {/* Past Tours */}
            <div className="section half">
              <div className="section-header">
                <h2>Past Tours</h2>
                <Link to="/client/reviews" className="view-all">
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="past-tours">
                {pastTours.map(tour => (
                  <div key={tour.id} className="past-tour-item">
                    <div className="past-tour-image">
                      <div className="image-placeholder">
                        <MapPin size={24} />
                      </div>
                    </div>
                    <div className="past-tour-info">
                      <h4>{tour.name}</h4>
                      <p className="tour-date">{tour.date}</p>
                      <div className="tour-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < tour.rating ? "#FFD700" : "none"}
                            color={i < tour.rating ? "#FFD700" : "#CBD5E1"}
                          />
                        ))}
                      </div>
                      <p className="tour-review">{tour.review}</p>
                      {!tour.review && (
                        <button 
                          className="btn outline small"
                          onClick={() => handleWriteReview(tour)}
                        >
                          Write Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="section half">
              <div className="section-header">
                <h2>Recent Notifications</h2>
                <Link to="/client/notifications" className="view-all">
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="notifications-list">
                {notifications.slice(0, 4).map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification-dot"></div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              {quickActions.map((action, index) => (
                <Link 
                  key={index} 
                  to={action.link} 
                  className="action-card"
                  onClick={() => {
                    if (action.link.includes('bookings')) setActiveTab('bookings');
                    if (action.link.includes('settings')) setActiveTab('profile');
                  }}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Documents */}
          <div className="section">
            <div className="section-header">
              <h2>Recent Documents</h2>
              <Link to="/client/documents" className="view-all">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="documents-list">
              <div className="document-item">
                <FileText size={20} />
                <div>
                  <h4>Desert Safari Invoice</h4>
                  <p>PDF • May 15, 2024</p>
                </div>
                <button className="btn outline small">
                  Download
                </button>
              </div>
              <div className="document-item">
                <FileText size={20} />
                <div>
                  <h4>Booking Confirmation</h4>
                  <p>PDF • May 10, 2024</p>
                </div>
                <button className="btn outline small">
                  Download
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}