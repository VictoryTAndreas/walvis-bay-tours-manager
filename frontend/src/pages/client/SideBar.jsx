import { Link } from "react-router-dom";
import { 
  TrendingUp, Calendar, Heart, CreditCard, 
  Star, HelpCircle, Settings, LogOut,
  Package, Users, MapPin, MessageSquare,
  ChevronLeft, ChevronRight
} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ 
  userData = {}, 
  activeTab = "dashboard", 
  collapsed = false,
  onToggleCollapse = () => {},
  onLogout = () => {}
}) {
  const menuItems = [
    { id: "dashboard", icon: <TrendingUp size={20} />, label: "Overview", link: "/client/dashboard" },
    { id: "bookings", icon: <Calendar size={20} />, label: "My Bookings", link: "/client/bookings" },
    { id: "packages", icon: <Package size={20} />, label: "Tour Packages", link: "/client/packages" },
    { id: "wishlist", icon: <Heart size={20} />, label: "Wishlist", link: "/client/wishlist" },
    { id: "payments", icon: <CreditCard size={20} />, label: "Payments", link: "/client/payments" },
    { id: "reviews", icon: <Star size={20} />, label: "My Reviews", link: "/client/reviews" },
    { id: "guides", icon: <Users size={20} />, label: "Tour Guides", link: "/client/guides" },
    { id: "support", icon: <HelpCircle size={20} />, label: "Support", link: "/client/support" },
    { id: "settings", icon: <Settings size={20} />, label: "Settings", link: "/client/settings" },
  ];

  const quickActions = [
    { icon: <MapPin size={18} />, label: "Book Tour", link: "/client/packages" },
    { icon: <MessageSquare size={18} />, label: "Contact Support", link: "/client/support" },
  ];

  return (
    <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <Link to="/client/dashboard" className="sidebar-brand">
          <div className="brand-icon">🌊</div>
          {!collapsed && <span className="brand-text">WalvisBay Tours</span>}
        </Link>
        
        <button 
          className="sidebar-toggle"
          onClick={onToggleCollapse}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* User Profile */}
      <div className="sidebar-user">
        <div className="user-avatar">
          <span className="avatar-initials">
            {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
        
        {!collapsed && (
          <div className="user-info">
            <h3 className="user-name">{userData?.name || "User"}</h3>
            <p className="user-email">{userData?.email || "user@example.com"}</p>
            <div className="user-tier">
              <Star size={14} />
              <span>Explorer Member</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h4 className={`section-title ${collapsed ? 'collapsed' : ''}`}>
            {!collapsed && "Navigation"}
          </h4>
          
          <div className="nav-items">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                title={collapsed ? item.label : ""}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
                
                {!collapsed && activeTab === item.id && (
                  <div className="active-indicator"></div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="nav-section">
            <h4 className="section-title">Quick Actions</h4>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="quick-action-btn"
                >
                  {action.icon}
                  <span>{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="sidebar-promo">
            <div className="promo-icon">🎉</div>
            <div className="promo-content">
              <h5>Special Offer!</h5>
              <p>20% off next tour</p>
            </div>
          </div>
        )}
        
        <button 
          className="logout-btn"
          onClick={onLogout}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}