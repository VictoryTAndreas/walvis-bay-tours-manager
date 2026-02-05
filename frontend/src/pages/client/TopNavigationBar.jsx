// components/TopNavigationBar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bell, 
  LogOut, 
  Settings, 
  Calendar, 
  CreditCard, 
  TrendingUp,
  Heart,
  Star,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import "./TopNavigationBar.css";

export default function TopNavigationBar({ 
  userData, 
  activeTab, 
  setActiveTab, 
  notifications = [], 
  markAllNotificationsRead,
  handleLogout 
}) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    if (notification.link) {
      navigate(notification.link);
      setNotificationOpen(false);
    }
  };

  const handleUserMenuItemClick = (path, tab = null) => {
    if (tab) setActiveTab(tab);
    navigate(path);
    setUserMenuOpen(false);
  };

  const handleTabClick = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

  // Navigation tabs configuration
  const navTabs = [
    { id: "dashboard", label: "Dashboard", path: "/client/dashboard" },
    { id: "bookings", label: "My Bookings", path: "/client/bookings" },
    { id: "profile", label: "Profile", path: "/client/settings" },
  ];

  // User menu items
  const userMenuItems = [
    { icon: <TrendingUp size={18} />, label: "Dashboard", path: "/client/dashboard", tab: "dashboard" },
    { icon: <Settings size={18} />, label: "Settings", path: "/client/settings", tab: "profile" },
    { icon: <Calendar size={18} />, label: "My Bookings", path: "/client/bookings", tab: "bookings" },
    { icon: <CreditCard size={18} />, label: "Payments", path: "/client/payments" },
  ];

  // Mobile menu items
  const mobileMenuItems = [
    ...userMenuItems,
    { icon: <Heart size={20} />, label: "Wishlist", path: "/client/wishlist" },
    { icon: <Star size={20} />, label: "Reviews", path: "/client/reviews" },
    { icon: <HelpCircle size={20} />, label: "Support", path: "/client/support" },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="top-navbar">
        {/* Left: Logo */}
        <div className="top-nav-left">
          <Link to="/" className="top-nav-brand">
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
            <span className="top-nav-brand-text">WalvisBay Tours</span>
          </Link>
        </div>

        {/* Center: Navigation Tabs */}
        <div className="top-nav-center">
          <div className="top-nav-tabs">
            {navTabs.map(tab => (
              <button
                key={tab.id}
                className={`top-nav-tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTabClick(tab.id, tab.path)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="top-nav-right">
          <div className="top-nav-actions">
            {/* Notifications */}
            <div 
              className="top-nav-notification-wrapper"
              onMouseEnter={() => setNotificationOpen(true)}
              onMouseLeave={() => setNotificationOpen(false)}
            >
              <button 
                className="top-nav-notification-btn"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <Bell size={22} />
                {unreadNotifications > 0 && (
                  <span className="top-nav-notification-badge">{unreadNotifications}</span>
                )}
              </button>
              
              {notificationOpen && (
                <div className="top-nav-notification-dropdown">
                  <div className="top-nav-dropdown-header">
                    <h4>Notifications</h4>
                    {unreadNotifications > 0 && (
                      <button 
                        className="top-nav-mark-all-read"
                        onClick={markAllNotificationsRead}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  
                  <div className="top-nav-notifications-list">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map(notification => (
                        <div 
                          key={notification.id} 
                          className={`top-nav-notification-item ${!notification.read ? 'unread' : ''}`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="top-nav-notification-dot"></div>
                          <div className="top-nav-notification-content">
                            <p className="top-nav-notification-message">{notification.message}</p>
                            <span className="top-nav-notification-time">{notification.time}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="top-nav-no-notifications">
                        <Bell size={24} />
                        <p>No notifications</p>
                      </div>
                    )}
                  </div>
                  
                  {notifications.length > 0 && (
                    <Link 
                      to="/client/notifications" 
                      className="top-nav-view-all-notifications"
                      onClick={() => setNotificationOpen(false)}
                    >
                      View all notifications
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div 
              className="top-nav-user-menu-wrapper"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button 
                className="top-nav-user-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="top-nav-user-avatar">
                  <span className="top-nav-avatar-initials">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <span className="top-nav-user-name">
                  {userData?.name?.split(' ')[0] || "User"}
                </span>
                {userMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {userMenuOpen && (
                <div className="top-nav-user-dropdown">
                  <div className="top-nav-user-info">
                    <div className="top-nav-user-avatar-large">
                      <span className="top-nav-avatar-initials-large">
                        {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    </div>
                    <div className="top-nav-user-details">
                      <h4>{userData?.name || "User"}</h4>
                      <p className="top-nav-user-email">{userData?.email || "user@example.com"}</p>
                    </div>
                  </div>

                  <div className="top-nav-user-links">
                    {userMenuItems.map((item, index) => (
                      <button
                        key={index}
                        className="top-nav-user-link"
                        onClick={() => handleUserMenuItemClick(item.path, item.tab)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                    
                    <div className="top-nav-divider"></div>
                    
                    <button 
                      className="top-nav-logout-btn"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="top-nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="top-nav-mobile-overlay">
          <div className="top-nav-mobile-menu">
            <div className="top-nav-mobile-header">
              <div className="top-nav-mobile-user">
                <div className="top-nav-mobile-avatar">
                  <span className="top-nav-avatar-initials-mobile">
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div>
                  <h3>{userData?.name || "User"}</h3>
                  <p className="top-nav-mobile-email">{userData?.email || "user@example.com"}</p>
                </div>
              </div>
              <button 
                className="top-nav-mobile-close"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="top-nav-mobile-tabs">
              {navTabs.map(tab => (
                <button
                  key={tab.id}
                  className={`top-nav-mobile-tab ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => {
                    handleTabClick(tab.id, tab.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="top-nav-mobile-links">
              {mobileMenuItems.map((item, index) => (
                <button
                  key={index}
                  className="top-nav-mobile-link"
                  onClick={() => {
                    handleUserMenuItemClick(item.path, item.tab);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="top-nav-mobile-footer">
              <button 
                className="top-nav-mobile-logout"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}