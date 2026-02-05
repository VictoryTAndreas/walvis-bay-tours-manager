// Payments.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Download,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  FileText,
  Receipt,
  Shield,
  AlertCircle,
  ChevronDown,
  Users,
  Package,
  Star,
  Heart,
  MessageSquare,
  HelpCircle,
  LogOut,
  Bell,
  Settings,
  TrendingUp as OverviewIcon,
  MapPin
} from "lucide-react";
import TopNavigationBar from "./TopNavigationBar";
import "./payments.css";
import "./Dashboard.css"; // Assuming you have Dashboard.css from previous code

export default function Payments() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("payments");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPayment, setExpandedPayment] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Payment for kayaking tour successful", time: "2 days ago", read: true, link: "/client/payments" },
    { id: 2, message: "Upcoming payment due for Marine Tour", time: "3 days ago", read: false, link: "/client/payments" },
  ]);

  // Load user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    const storedUserData = localStorage.getItem('clientData');
    
    if (!token) {
      navigate("/client/login", { 
        state: { message: "Please login to access your payments." } 
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

  const payments = [
    {
      id: "PAY-2024-001",
      amount: 300,
      date: "2024-05-20",
      status: "completed",
      method: "credit_card",
      cardLast4: "4242",
      bookingId: "WB-2024-001",
      description: "Desert Safari Booking",
      invoiceUrl: "#"
    },
    {
      id: "PAY-2024-002",
      amount: 480,
      date: "2024-05-25",
      status: "partial",
      method: "paypal",
      cardLast4: null,
      bookingId: "WB-2024-002",
      description: "Marine Tour Booking",
      invoiceUrl: "#"
    },
    {
      id: "PAY-2024-003",
      amount: 120,
      date: "2024-05-28",
      status: "completed",
      method: "credit_card",
      cardLast4: "1881",
      bookingId: "WB-2024-003",
      description: "Kayaking Adventure",
      invoiceUrl: "#"
    },
    {
      id: "PAY-2024-004",
      amount: 240,
      date: "2024-04-15",
      status: "refunded",
      method: "credit_card",
      cardLast4: "4242",
      bookingId: "WB-2024-004",
      description: "Dolphin Cruise",
      invoiceUrl: "#"
    },
    {
      id: "PAY-2024-005",
      amount: 180,
      date: "2024-03-30",
      status: "completed",
      method: "bank_transfer",
      cardLast4: null,
      bookingId: "WB-2024-005",
      description: "Sandboarding Experience",
      invoiceUrl: "#"
    }
  ];

  const cards = [
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "12/25",
      name: userData?.name || "Victory Andreas",
      isDefault: true
    },
    {
      id: 2,
      type: "mastercard",
      last4: "1881",
      expiry: "08/24",
      name: userData?.name || "Victory Andreas",
      isDefault: false
    }
  ];

  const filteredPayments = payments.filter(payment => {
    if (activeTab === "all") return true;
    return payment.status === activeTab;
  });

  const totalSpent = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const upcomingPayments = payments
    .filter(p => p.status === "partial")
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status) => {
    const colors = {
      completed: "#10b981",
      pending: "#f59e0b",
      partial: "#f59e0b",
      refunded: "#6b7280",
      failed: "#ef4444"
    };
    return colors[status] || "#6b7280";
  };

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        userData={userData}
        activeTab="payments"
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
            
            <Link to="/client/wishlist" className="menu-item">
              <Heart size={20} />
              {!sidebarCollapsed && <span>Wishlist</span>}
            </Link>
            
            <Link to="/client/payments" className="menu-item active">
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
        <main className="dashboard-main payments-page">
          {/* Header */}
          <div className="payments-header">
            <div className="header-left">
              <h1>Payment History</h1>
              <p className="subtitle">View and manage all your transactions</p>
            </div>
            
            <div className="header-actions">
              <button className="btn primary">
                <Download size={18} />
                Export Statements
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="payment-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <DollarSign size={24} />
              </div>
              <div className="stat-info">
                <h3>${totalSpent}</h3>
                <p>Total Spent</p>
                <span className="stat-change positive">
                  <TrendingUp size={14} />
                  +12% this month
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Clock size={24} />
              </div>
              <div className="stat-info">
                <h3>${upcomingPayments}</h3>
                <p>Upcoming Payments</p>
                <span className="stat-change">
                  Due soon
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <CreditCard size={24} />
              </div>
              <div className="stat-info">
                <h3>{cards.length}</h3>
                <p>Payment Methods</p>
                <span className="stat-change">
                  {cards.filter(c => c.isDefault).length} default
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <CheckCircle size={24} />
              </div>
              <div className="stat-info">
                <h3>{payments.filter(p => p.status === "completed").length}</h3>
                <p>Successful Payments</p>
                <span className="stat-change positive">
                  100% success rate
                </span>
              </div>
            </div>
          </div>

          <div className="payments-content">
            {/* Payment Methods */}
            <div className="payment-methods">
              <div className="section-header">
                <h2>Payment Methods</h2>
                <button className="btn outline">
                  Add New Card
                </button>
              </div>
              
              <div className="cards-grid">
                {cards.map(card => (
                  <div key={card.id} className={`card-item ${card.isDefault ? "default" : ""}`}>
                    <div className="card-header">
                      <div className="card-type">
                        {card.type === "visa" ? "💳" : "💳"}
                        <span>{card.type.toUpperCase()}</span>
                      </div>
                      {card.isDefault && (
                        <span className="default-badge">Default</span>
                      )}
                    </div>
                    
                    <div className="card-number">
                      •••• •••• •••• {card.last4}
                    </div>
                    
                    <div className="card-details">
                      <div>
                        <span className="label">Cardholder</span>
                        <span>{card.name}</span>
                      </div>
                      <div>
                        <span className="label">Expires</span>
                        <span>{card.expiry}</span>
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      <button className="btn outline small">
                        Edit
                      </button>
                      {!card.isDefault && (
                        <button className="btn outline small">
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="security-note">
                <Shield size={16} />
                <span>Your payment information is secured with 256-bit SSL encryption</span>
              </div>
            </div>

            {/* Transactions */}
            <div className="transactions-section">
              <div className="section-header">
                <h2>Transaction History</h2>
                
                <div className="transaction-filters">
                  <div className="search-box">
                    <Search size={18} />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="tabs">
                    {["all", "completed", "pending", "refunded"].map(tab => (
                      <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="transactions-list">
                {filteredPayments.length === 0 ? (
                  <div className="empty-state">
                    <CreditCard size={48} />
                    <h3>No transactions found</h3>
                    <p>Try adjusting your filters</p>
                  </div>
                ) : (
                  filteredPayments.map(payment => (
                    <div 
                      key={payment.id} 
                      className={`transaction-item ${expandedPayment === payment.id ? "expanded" : ""}`}
                    >
                      <div className="transaction-header">
                        <div className="transaction-info">
                          <div className="transaction-id">
                            <span className="badge">#{payment.id}</span>
                            <h4>{payment.description}</h4>
                          </div>
                          
                          <div className="transaction-meta">
                            <div className="meta-item">
                              <Calendar size={14} />
                              <span>{new Date(payment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="meta-item">
                              <FileText size={14} />
                              <span>Booking: {payment.bookingId}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="transaction-amount">
                          <div className="amount">${payment.amount}</div>
                          <div 
                            className="status-badge"
                            style={{ 
                              backgroundColor: `${getStatusColor(payment.status)}15`,
                              color: getStatusColor(payment.status)
                            }}
                          >
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </div>
                        </div>
                        
                        <button 
                          className="expand-btn"
                          onClick={() => setExpandedPayment(expandedPayment === payment.id ? null : payment.id)}
                        >
                          <ChevronDown size={20} />
                        </button>
                      </div>
                      
                      {expandedPayment === payment.id && (
                        <div className="transaction-details">
                          <div className="details-grid">
                            <div className="detail-group">
                              <h5>Payment Details</h5>
                              <div className="detail-item">
                                <span className="label">Payment Method:</span>
                                <span className="value">
                                  {payment.method === "credit_card" ? "Credit Card" : 
                                   payment.method === "paypal" ? "PayPal" : 
                                   "Bank Transfer"}
                                  {payment.cardLast4 && ` •••• ${payment.cardLast4}`}
                                </span>
                              </div>
                              <div className="detail-item">
                                <span className="label">Date:</span>
                                <span className="value">{new Date(payment.date).toLocaleString()}</span>
                              </div>
                              <div className="detail-item">
                                <span className="label">Booking ID:</span>
                                <span className="value">{payment.bookingId}</span>
                              </div>
                            </div>
                            
                            <div className="detail-group">
                              <h5>Amount Details</h5>
                              <div className="detail-item">
                                <span className="label">Subtotal:</span>
                                <span className="value">${payment.amount}</span>
                              </div>
                              <div className="detail-item">
                                <span className="label">Tax:</span>
                                <span className="value">$0.00</span>
                              </div>
                              <div className="detail-item">
                                <span className="label">Total:</span>
                                <span className="value total">${payment.amount}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="transaction-actions">
                            <button className="btn outline">
                              <Receipt size={16} />
                              Download Invoice
                            </button>
                            <button className="btn outline">
                              <FileText size={16} />
                              View Receipt
                            </button>
                            {payment.status === "completed" && (
                              <button className="btn outline">
                                <AlertCircle size={16} />
                                Report Issue
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}