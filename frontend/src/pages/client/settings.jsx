// Settings.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Camera,
  Save,
  Upload,
  Eye,
  EyeOff,
  Globe,
  Bell,
  Lock,
  Smartphone,
  CreditCard,
  Check,
  Heart,
  Star,
  Settings as SettingsIcon,
  TrendingUp as OverviewIcon,
  HelpCircle,
  LogOut,
  Bell as BellIcon,
  Calendar as CalendarIcon
} from "lucide-react";
import TopNavigationBar from "./TopNavigationBar";
import "./settings.css";
import "./Dashboard.css"; // Assuming you have Dashboard.css from previous code

export default function Settings() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile"); // For navbar
  const [settingsActiveTab, setSettingsActiveTab] = useState("personal"); // For settings section
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your profile information has been updated", time: "1 day ago", read: true, link: "/client/settings" },
    { id: 2, message: "Security alert: New login detected", time: "2 days ago", read: false, link: "/client/settings" },
  ]);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Victory",
    lastName: "Andreas",
    email: "victory@example.com",
    phone: "+264 81 836 3567",
    nationality: "Namibian",
    dateOfBirth: "1990-05-15",
    address: "123 Ocean View Drive",
    city: "Walvis Bay",
    country: "Namibia",
    postalCode: "9000",
    emergencyContact: "Sarah Smith",
    emergencyPhone: "+264 81 987 6543"
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeout: 30
  });

  const [preferences, setPreferences] = useState({
    newsletter: true,
    marketingEmails: true,
    smsUpdates: false,
    tourRecommendations: true,
    language: "English",
    timezone: "Africa/Windhoek",
    currency: "USD"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    bookingConfirmations: true,
    bookingReminders: true,
    tourUpdates: true,
    specialOffers: true,
    reviewReminders: true,
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  });

  // Load user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    const storedUserData = localStorage.getItem('clientData');
    
    if (!token) {
      navigate("/client/login", { 
        state: { message: "Please login to access your settings." } 
      });
      return;
    }

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        // Update personal info with actual user data
        setPersonalInfo(prev => ({
          ...prev,
          firstName: parsedData.name?.split(' ')[0] || "Victory",
          lastName: parsedData.name?.split(' ')[1] || "Andreas",
          email: parsedData.email || "victory@example.com",
          phone: parsedData.phone || "+264 81 836 3567"
        }));
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

  const handleSave = async (section) => {
    // API call to save settings
    console.log(`Saving ${section} settings...`);
    
    // Show success message
    alert(`${section} settings saved successfully!`);
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      alert("Profile photo updated successfully!");
    }, 1500);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "preferences", label: "Preferences", icon: <Globe size={18} /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon size={18} /> },
    { id: "payment", label: "Payment Methods", icon: <CreditCard size={18} /> }
  ];

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        userData={userData}
        activeTab="profile"
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
              <CalendarIcon size={20} />
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
            
            <Link to="/client/settings" className="menu-item active">
              <SettingsIcon size={20} />
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
        <main className="dashboard-main settings-page">
          {/* Header */}
          <div className="settings-header">
            <div className="header-left">
              <h1>Account Settings</h1>
              <p className="subtitle">Manage your profile and preferences</p>
            </div>
            
            <div className="header-actions">
              <button className="btn outline">
                <Lock size={18} />
                Privacy Settings
              </button>
            </div>
          </div>

          <div className="settings-content">
            {/* Left Navigation */}
            <aside className="settings-nav">
              <div className="profile-card">
                <div className="profile-photo">
                  <div className="photo-placeholder">
                    <span className="initials">
                      {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                    </span>
                    <div className="photo-upload">
                      <label htmlFor="photo-upload">
                        <Camera size={16} />
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                  {isUploading && <div className="uploading-overlay">Uploading...</div>}
                </div>
                <div className="profile-info">
                  <h3>{userData?.name || "User"}</h3>
                  <p className="email">{userData?.email || "user@example.com"}</p>
                  <div className="profile-stats">
                    <div className="stat">
                      <span className="value">6</span>
                      <span className="label">Tours</span>
                    </div>
                    <div className="stat">
                      <span className="value">Member</span>
                      <span className="label">Since 2023</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="nav-tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`nav-tab ${settingsActiveTab === tab.id ? "active" : ""}`}
                    onClick={() => setSettingsActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <main className="settings-main">
              {/* Personal Info Tab */}
              {settingsActiveTab === "personal" && (
                <div className="settings-tab">
                  <div className="tab-header">
                    <h2>Personal Information</h2>
                    <p>Update your personal details and contact information</p>
                  </div>

                  <div className="form-section">
                    <h3>Basic Information</h3>
                    <div className="form-grid">
                      <div className="input-group">
                        <label>First Name</label>
                        <div className="input-with-icon">
                          <User size={18} />
                          <input
                            type="text"
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>Last Name</label>
                        <div className="input-with-icon">
                          <User size={18} />
                          <input
                            type="text"
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                          <Mail size={18} />
                          <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>Phone Number</label>
                        <div className="input-with-icon">
                          <Phone size={18} />
                          <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>Date of Birth</label>
                        <div className="input-with-icon">
                          <Calendar size={18} />
                          <input
                            type="date"
                            value={personalInfo.dateOfBirth}
                            onChange={(e) => setPersonalInfo({...personalInfo, dateOfBirth: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>Nationality</label>
                        <div className="input-with-icon">
                          <Globe size={18} />
                          <select
                            value={personalInfo.nationality}
                            onChange={(e) => setPersonalInfo({...personalInfo, nationality: e.target.value})}
                          >
                            <option value="Namibian">Namibian</option>
                            <option value="South African">South African</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Address Information</h3>
                    <div className="form-grid">
                      <div className="input-group full">
                        <label>Street Address</label>
                        <div className="input-with-icon">
                          <MapPin size={18} />
                          <input
                            type="text"
                            value={personalInfo.address}
                            onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>City</label>
                        <input
                          type="text"
                          value={personalInfo.city}
                          onChange={(e) => setPersonalInfo({...personalInfo, city: e.target.value})}
                        />
                      </div>
                      
                      <div className="input-group">
                        <label>Country</label>
                        <input
                          type="text"
                          value={personalInfo.country}
                          onChange={(e) => setPersonalInfo({...personalInfo, country: e.target.value})}
                        />
                      </div>
                      
                      <div className="input-group">
                        <label>Postal Code</label>
                        <input
                          type="text"
                          value={personalInfo.postalCode}
                          onChange={(e) => setPersonalInfo({...personalInfo, postalCode: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Emergency Contact</h3>
                    <div className="form-grid">
                      <div className="input-group">
                        <label>Contact Name</label>
                        <input
                          type="text"
                          value={personalInfo.emergencyContact}
                          onChange={(e) => setPersonalInfo({...personalInfo, emergencyContact: e.target.value})}
                        />
                      </div>
                      
                      <div className="input-group">
                        <label>Contact Phone</label>
                        <div className="input-with-icon">
                          <Phone size={18} />
                          <input
                            type="tel"
                            value={personalInfo.emergencyPhone}
                            onChange={(e) => setPersonalInfo({...personalInfo, emergencyPhone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="btn primary"
                      onClick={() => handleSave("personal")}
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button className="btn outline">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {settingsActiveTab === "security" && (
                <div className="settings-tab">
                  <div className="tab-header">
                    <h2>Security Settings</h2>
                    <p>Manage your password and account security</p>
                  </div>

                  <div className="security-status">
                    <div className="status-card">
                      <Shield size={24} />
                      <div>
                        <h4>Account Security</h4>
                        <p className="status-text">Strong</p>
                      </div>
                      <Check size={20} className="check-icon" />
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Change Password</h3>
                    <div className="form-grid">
                      <div className="input-group">
                        <label>Current Password</label>
                        <div className="input-with-icon">
                          <Lock size={18} />
                          <input
                            type="password"
                            value={security.currentPassword}
                            onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                            placeholder="Enter current password"
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>New Password</label>
                        <div className="input-with-icon">
                          <Lock size={18} />
                          <input
                            type="password"
                            value={security.newPassword}
                            onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                            placeholder="Enter new password"
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>Confirm New Password</label>
                        <div className="input-with-icon">
                          <Lock size={18} />
                          <input
                            type="password"
                            value={security.confirmPassword}
                            onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Two-Factor Authentication</h3>
                    <div className="toggle-setting">
                      <div className="toggle-info">
                        <h4>Enable 2FA</h4>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={security.twoFactorEnabled}
                          onChange={(e) => setSecurity({...security, twoFactorEnabled: e.target.checked})}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    
                    {security.twoFactorEnabled && (
                      <div className="two-factor-setup">
                        <h4>Set up Two-Factor Authentication</h4>
                        <div className="setup-steps">
                          <div className="step">
                            <Smartphone size={20} />
                            <span>Download Google Authenticator</span>
                          </div>
                          <div className="step">
                            <Lock size={20} />
                            <span>Scan QR code with the app</span>
                          </div>
                          <div className="step">
                            <Check size={20} />
                            <span>Enter verification code</span>
                          </div>
                        </div>
                        <button className="btn outline">
                          Set Up Now
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="form-section">
                    <h3>Active Sessions</h3>
                    <div className="sessions-list">
                      <div className="session-item current">
                        <div className="session-info">
                          <h4>Current Session</h4>
                          <p>Chrome • Windows • Walvis Bay, Namibia</p>
                          <span className="time">Active now</span>
                        </div>
                        <button className="btn outline danger small">
                          Logout
                        </button>
                      </div>
                      
                      <div className="session-item">
                        <div className="session-info">
                          <h4>Mobile App</h4>
                          <p>iOS • iPhone 14 • Walvis Bay, Namibia</p>
                          <span className="time">2 hours ago</span>
                        </div>
                        <button className="btn outline danger small">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="btn primary"
                      onClick={() => handleSave("security")}
                    >
                      <Save size={18} />
                      Update Security
                    </button>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {settingsActiveTab === "preferences" && (
                <div className="settings-tab">
                  <div className="tab-header">
                    <h2>Preferences</h2>
                    <p>Customize your experience on WalvisBay Tours</p>
                  </div>

                  <div className="form-section">
                    <h3>Communication Preferences</h3>
                    <div className="preferences-list">
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={preferences.newsletter}
                          onChange={(e) => setPreferences({...preferences, newsletter: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Newsletter</h4>
                          <p>Receive our monthly newsletter with updates and tips</p>
                        </div>
                      </label>
                      
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={preferences.marketingEmails}
                          onChange={(e) => setPreferences({...preferences, marketingEmails: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Marketing Emails</h4>
                          <p>Get notified about special offers and promotions</p>
                        </div>
                      </label>
                      
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={preferences.smsUpdates}
                          onChange={(e) => setPreferences({...preferences, smsUpdates: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>SMS Updates</h4>
                          <p>Receive booking confirmations via SMS</p>
                        </div>
                      </label>
                      
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={preferences.tourRecommendations}
                          onChange={(e) => setPreferences({...preferences, tourRecommendations: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Personalized Recommendations</h4>
                          <p>Get tour suggestions based on your interests</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Regional Settings</h3>
                    <div className="form-grid">
                      <div className="input-group">
                        <label>Language</label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                        >
                          <option value="English">English</option>
                          <option value="Afrikaans">Afrikaans</option>
                          <option value="German">German</option>
                        </select>
                      </div>
                      
                      <div className="input-group">
                        <label>Timezone</label>
                        <select
                          value={preferences.timezone}
                          onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                        >
                          <option value="Africa/Windhoek">Africa/Windhoek (GMT+2)</option>
                          <option value="UTC">UTC</option>
                        </select>
                      </div>
                      
                      <div className="input-group">
                        <label>Currency</label>
                        <select
                          value={preferences.currency}
                          onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                        >
                          <option value="USD">USD ($)</option>
                          <option value="NAD">NAD (N$)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="ZAR">ZAR (R)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="btn primary"
                      onClick={() => handleSave("preferences")}
                    >
                      <Save size={18} />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {settingsActiveTab === "notifications" && (
                <div className="settings-tab">
                  <div className="tab-header">
                    <h2>Notification Settings</h2>
                    <p>Control how and when you receive notifications</p>
                  </div>

                  <div className="form-section">
                    <h3>Booking Notifications</h3>
                    <div className="preferences-list">
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={notificationSettings.bookingConfirmations}
                          onChange={(e) => setNotificationSettings({...notificationSettings, bookingConfirmations: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Booking Confirmations</h4>
                          <p>Receive confirmation when bookings are successful</p>
                        </div>
                      </label>
                      
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={notificationSettings.bookingReminders}
                          onChange={(e) => setNotificationSettings({...notificationSettings, bookingReminders: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Booking Reminders</h4>
                          <p>Get reminders before your scheduled tours</p>
                        </div>
                      </label>
                      
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={notificationSettings.tourUpdates}
                          onChange={(e) => setNotificationSettings({...notificationSettings, tourUpdates: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Tour Updates</h4>
                          <p>Important updates about your scheduled tours</p>
                        </div>
                      </label>
                      
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={notificationSettings.reviewReminders}
                          onChange={(e) => setNotificationSettings({...notificationSettings, reviewReminders: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Review Reminders</h4>
                          <p>Reminders to review your completed tours</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Marketing Notifications</h3>
                    <div className="preferences-list">
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={notificationSettings.specialOffers}
                          onChange={(e) => setNotificationSettings({...notificationSettings, specialOffers: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Special Offers</h4>
                          <p>Notifications about discounts and promotions</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Delivery Methods</h3>
                    <div className="form-grid">
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={notificationSettings.pushNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Push Notifications</h4>
                          <p>Receive notifications in your browser</p>
                        </div>
                      </label>
                      
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>Email Notifications</h4>
                          <p>Receive notifications via email</p>
                        </div>
                      </label>
                      
                      <label className="preference-item">
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                        />
                        <span className="checkmark"></span>
                        <div className="preference-info">
                          <h4>SMS Notifications</h4>
                          <p>Receive notifications via text message</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="btn primary"
                      onClick={() => handleSave("notifications")}
                    >
                      <Save size={18} />
                      Save Notification Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Methods Tab */}
              {settingsActiveTab === "payment" && (
                <div className="settings-tab">
                  <div className="tab-header">
                    <h2>Payment Methods</h2>
                    <p>Manage your saved payment methods</p>
                  </div>

                  <div className="form-section">
                    <h3>Saved Payment Methods</h3>
                    <div className="payment-methods-list">
                      <div className="payment-method-card">
                        <div className="method-header">
                          <div className="method-type">
                            <CreditCard size={20} />
                            <span>Visa •••• 4242</span>
                          </div>
                          <span className="default-badge">Default</span>
                        </div>
                        <div className="method-details">
                          <span>Expires 12/25</span>
                          <span>Victory Andreas</span>
                        </div>
                        <div className="method-actions">
                          <button className="btn outline small">
                            Edit
                          </button>
                          <button className="btn outline danger small">
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="payment-method-card">
                        <div className="method-header">
                          <div className="method-type">
                            <CreditCard size={20} />
                            <span>Mastercard •••• 1881</span>
                          </div>
                        </div>
                        <div className="method-details">
                          <span>Expires 08/24</span>
                          <span>Victory Andreas</span>
                        </div>
                        <div className="method-actions">
                          <button className="btn outline small">
                            Set as Default
                          </button>
                          <button className="btn outline danger small">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Add New Payment Method</h3>
                    <div className="form-grid">
                      <div className="input-group">
                        <label>Card Number</label>
                        <div className="input-with-icon">
                          <CreditCard size={18} />
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>
                      
                      <div className="input-group">
                        <label>Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="Victory Andreas"
                        />
                      </div>
                      
                      <div className="input-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div className="input-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div className="privacy-note">
                      <Shield size={16} />
                      <span>Your payment information is secured with bank-level encryption</span>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn primary">
                      <Save size={18} />
                      Add Payment Method
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}