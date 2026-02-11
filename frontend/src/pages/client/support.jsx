// Support.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Clock,
  CheckCircle,
  Send,
  Search,
  ChevronDown,
  ExternalLink,
  Users,
  Shield,
  Globe,
  Smartphone,
  Video,
  Calendar,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Heart,
  CreditCard,
  Settings,
  TrendingUp as OverviewIcon,
  Star,
  Bell,
  LogOut
} from "lucide-react";
import TopNavigationBar from "./TopNavigationBar";
import "./support.css";
import "./Dashboard.css"; // Assuming you have Dashboard.css from previous code

export default function Support() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("support"); // For navbar
  const [supportActiveTab, setSupportActiveTab] = useState("contact"); // For support section
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [rating, setRating] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
    urgency: "normal"
  });
  
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your support ticket has been received", time: "2 hours ago", read: true, link: "/client/support" },
    { id: 2, message: "New FAQ article available", time: "1 day ago", read: false, link: "/client/support" },
  ]);

  // Load user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    const storedUserData = localStorage.getItem('clientData');
    
    if (!token) {
      navigate("/client/login", { 
        state: { message: "Please login to access support." } 
      });
      return;
    }

    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        setUserData(parsedData);
        // Pre-fill contact form with user data
        setContactForm(prev => ({
          ...prev,
          name: parsedData.name || "",
          email: parsedData.email || "",
          phone: parsedData.phone || ""
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

  // FAQ Data
  const faqCategories = [
    {
      id: "booking",
      name: "Booking & Reservations",
      icon: "📅",
      questions: [
        {
          id: 1,
          question: "How do I book a tour?",
          answer: "You can book a tour through our website, mobile app, or by calling our booking office. Simply select your preferred tour, choose your date and time, add the number of participants, and proceed to checkout."
        },
        {
          id: 2,
          question: "Can I modify or cancel my booking?",
          answer: "Yes, you can modify or cancel your booking up to 48 hours before the tour start time through your account dashboard. Cancellations within 48 hours may be subject to fees depending on the tour type."
        },
        {
          id: 3,
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for local bookings. Some tours also accept cash payments on-site."
        }
      ]
    },
    {
      id: "preparation",
      name: "Tour Preparation",
      icon: "🎒",
      questions: [
        {
          id: 4,
          question: "What should I bring on a desert safari?",
          answer: "We recommend bringing sunscreen, a hat, sunglasses, comfortable closed shoes, a light jacket for cooler evenings, and a camera. We provide water and all necessary safety equipment."
        },
        {
          id: 5,
          question: "Are there any age restrictions?",
          answer: "Age restrictions vary by tour. Most tours are suitable for ages 6+, but some adventure activities may have minimum age requirements of 12 or 16. Check individual tour descriptions for specific requirements."
        },
        {
          id: 6,
          question: "What if I have dietary restrictions?",
          answer: "Please inform us of any dietary restrictions at least 24 hours before your tour. We can accommodate most common dietary needs including vegetarian, vegan, gluten-free, and allergies."
        }
      ]
    },
    {
      id: "technical",
      name: "Technical Issues",
      icon: "💻",
      questions: [
        {
          id: 7,
          question: "I can't login to my account",
          answer: "Try resetting your password using the 'Forgot Password' link. If you still can't access your account, contact our support team with your registered email address."
        },
        {
          id: 8,
          question: "My payment failed but money was deducted",
          answer: "Sometimes payments can appear as failed but the transaction may still be processing. Check your bank statement after 24 hours. If the amount is still deducted without confirmation, contact us with your transaction details."
        },
        {
          id: 9,
          question: "How do I update my account information?",
          answer: "You can update your personal information, contact details, and preferences in the 'Settings' section of your account dashboard."
        }
      ]
    }
  ];

  // Contact Options
  const contactOptions = [
    {
      id: "phone",
      title: "Call Us",
      description: "Speak directly with our support team",
      icon: <Phone size={24} />,
      details: "+264 81 123 4567",
      hours: "Mon-Sun: 7 AM - 9 PM",
      color: "#3b82f6"
    },
    {
      id: "email",
      title: "Email Us",
      description: "Send us a detailed message",
      icon: <Mail size={24} />,
      details: "support@walvisbaytours.com",
      hours: "Response within 24 hours",
      color: "#10b981"
    },
    {
      id: "chat",
      title: "Live Chat",
      description: "Instant messaging support",
      icon: <MessageSquare size={24} />,
      details: "Click to start chat",
      hours: "Mon-Fri: 8 AM - 8 PM",
      color: "#8b5cf6"
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      description: "Text us on WhatsApp",
      icon: <Smartphone size={24} />,
      details: "+264 81 765 4321",
      hours: "24/7 for emergencies",
      color: "#25D366"
    }
  ];

  // Support Team
  const supportTeam = [
    {
      name: "Sarah Johnson",
      role: "Support Manager",
      email: "sarah@walvisbaytours.com",
      expertise: "Booking & Reservations",
      image: "👩‍💼"
    },
    {
      name: "Michael Brown",
      role: "Tour Specialist",
      email: "michael@walvisbaytours.com",
      expertise: "Tour Preparation",
      image: "🧑‍✈️"
    },
    {
      name: "Lisa Chen",
      role: "Technical Support",
      email: "lisa@walvisbaytours.com",
      expertise: "Account & Payment Issues",
      image: "👩‍💻"
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // Generate ticket ID
    const newTicketId = `TKT-${Date.now().toString().slice(-6)}`;
    setTicketId(newTicketId);
    
    // Show success message
    setTicketSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setContactForm({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        subject: "general",
        message: "",
        urgency: "normal"
      });
      setTicketSubmitted(false);
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: "#10b981",
      normal: "#f59e0b",
      high: "#ef4444"
    };
    return colors[urgency] || "#f59e0b";
  };

  const supportTabs = [
    { id: "contact", label: "Contact Support", icon: <MessageSquare size={18} /> },
    { id: "faq", label: "FAQ", icon: <HelpCircle size={18} /> },
    { id: "resources", label: "Resources", icon: <FileText size={18} /> },
    { id: "status", label: "Check Ticket Status", icon: <Clock size={18} /> }
  ];

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        userData={userData}
        activeTab="support"
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
            
            <Link to="/client/payments" className="menu-item">
              <CreditCard size={20} />
              {!sidebarCollapsed && <span>Payments</span>}
            </Link>
            
            <Link to="/client/reviews" className="menu-item">
              <Star size={20} />
              {!sidebarCollapsed && <span>My Reviews</span>}
            </Link>
            
            <Link to="/client/support" className="menu-item active">
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
        <main className="dashboard-main support-page">
          {/* Hero Section */}
          <div className="support-hero">
            <div className="hero-content">
              <h1>How can we help you today?</h1>
              <p className="hero-subtitle">Get support for bookings, tours, or any questions you have</p>
              
              <div className="search-container">
                <Search size={20} />
                <input 
                  type="text" 
                  placeholder="Search for help articles, FAQs, or topics..."
                  className="search-input"
                />
                <button className="search-btn">Search</button>
              </div>
              
              <div className="quick-stats">
                <div className="stat">
                  <CheckCircle size={18} />
                  <span>24/7 Emergency Support</span>
                </div>
                <div className="stat">
                  <Clock size={18} />
                  <span>Avg. Response: 2 hours</span>
                </div>
                <div className="stat">
                  <ThumbsUp size={18} />
                  <span>98% Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="support-content">
            {/* Left Navigation */}
            <aside className="support-nav">
              <div className="nav-header">
                <h3>Support Center</h3>
                <p>Choose how you'd like to get help</p>
              </div>
              
              <div className="nav-tabs">
                {supportTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`nav-tab ${supportActiveTab === tab.id ? "active" : ""}`}
                    onClick={() => setSupportActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="contact-cards">
                <h4>Quick Contact</h4>
                {contactOptions.map(option => (
                  <div 
                    key={option.id} 
                    className="contact-card"
                    style={{ borderLeftColor: option.color }}
                  >
                    <div className="contact-icon" style={{ color: option.color }}>
                      {option.icon}
                    </div>
                    <div className="contact-info">
                      <h5>{option.title}</h5>
                      <p className="contact-detail">{option.details}</p>
                      <p className="contact-hours">{option.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <main className="support-main">
              {/* Contact Form Tab */}
              {supportActiveTab === "contact" && (
                <div className="support-tab">
                  <div className="tab-header">
                    <h2>Contact Our Support Team</h2>
                    <p>Fill out the form below and we'll get back to you as soon as possible</p>
                  </div>
                  
                  {ticketSubmitted ? (
                    <div className="success-message">
                      <div className="success-icon">
                        <CheckCircle size={48} />
                      </div>
                      <h3>Support Ticket Created!</h3>
                      <p className="ticket-id">Ticket ID: <strong>{ticketId}</strong></p>
                      <p>We've received your request and will respond within 2 hours.</p>
                      <p className="note">A confirmation email has been sent to {contactForm.email}</p>
                      <button 
                        className="btn outline"
                        onClick={() => setTicketSubmitted(false)}
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="contact-form">
                      <div className="form-grid">
                        <div className="input-group">
                          <label>Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={contactForm.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div className="input-group">
                          <label>Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={contactForm.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                          />
                        </div>
                        
                        <div className="input-group">
                          <label>Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        
                        <div className="input-group">
                          <label>Subject *</label>
                          <select
                            name="subject"
                            value={contactForm.subject}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="general">General Inquiry</option>
                            <option value="booking">Booking & Reservation</option>
                            <option value="payment">Payment Issues</option>
                            <option value="technical">Technical Support</option>
                            <option value="cancellation">Cancellation Request</option>
                            <option value="feedback">Feedback & Suggestions</option>
                            <option value="emergency">Emergency Assistance</option>
                          </select>
                        </div>
                        
                        <div className="input-group full">
                          <label>Message *</label>
                          <textarea
                            name="message"
                            value={contactForm.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Describe your issue or question in detail..."
                            rows="6"
                          />
                        </div>
                        
                        <div className="input-group">
                          <label>Urgency Level</label>
                          <div className="urgency-options">
                            {["low", "normal", "high"].map(level => (
                              <label key={level} className="urgency-option">
                                <input
                                  type="radio"
                                  name="urgency"
                                  value={level}
                                  checked={contactForm.urgency === level}
                                  onChange={handleInputChange}
                                />
                                <span 
                                  className="urgency-dot"
                                  style={{ backgroundColor: getUrgencyColor(level) }}
                                ></span>
                                <span className="urgency-label">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-footer">
                        <div className="privacy-note">
                          <Shield size={16} />
                          <span>Your information is secure and will only be used to assist you</span>
                        </div>
                        
                        <button type="submit" className="btn primary">
                          <Send size={18} />
                          Submit Request
                        </button>
                      </div>
                    </form>
                  )}
                  
                  {/* Support Team */}
                  <div className="support-team">
                    <h3>Our Support Team</h3>
                    <p>Meet the experts ready to help you</p>
                    
                    <div className="team-grid">
                      {supportTeam.map(member => (
                        <div key={member.name} className="team-member">
                          <div className="member-avatar">
                            {member.image}
                          </div>
                          <div className="member-info">
                            <h4>{member.name}</h4>
                            <p className="member-role">{member.role}</p>
                            <p className="member-expertise">{member.expertise}</p>
                            <p className="member-email">{member.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Tab */}
              {supportActiveTab === "faq" && (
                <div className="support-tab">
                  <div className="tab-header">
                    <h2>Frequently Asked Questions</h2>
                    <p>Find quick answers to common questions</p>
                  </div>
                  
                  <div className="faq-categories">
                    {faqCategories.map(category => (
                      <div key={category.id} className="faq-category">
                        <div className="category-header">
                          <span className="category-icon">{category.icon}</span>
                          <h3>{category.name}</h3>
                        </div>
                        
                        <div className="faq-list">
                          {category.questions.map(q => (
                            <div 
                              key={q.id} 
                              className={`faq-item ${expandedFaq === q.id ? "expanded" : ""}`}
                            >
                              <div 
                                className="faq-question"
                                onClick={() => setExpandedFaq(expandedFaq === q.id ? null : q.id)}
                              >
                                <h4>{q.question}</h4>
                                <ChevronDown size={20} className="expand-icon" />
                              </div>
                              
                              {expandedFaq === q.id && (
                                <div className="faq-answer">
                                  <p>{q.answer}</p>
                                  <div className="faq-helpful">
                                    <span>Was this helpful?</span>
                                    <button 
                                      className={`helpful-btn ${rating === q.id ? "active" : ""}`}
                                      onClick={() => setRating(q.id)}
                                    >
                                      <ThumbsUp size={16} />
                                    </button>
                                    <button className="helpful-btn">
                                      <ThumbsDown size={16} />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="faq-contact">
                    <div className="contact-banner">
                      <AlertCircle size={24} />
                      <div>
                        <h4>Still need help?</h4>
                        <p>Can't find what you're looking for? Contact our support team directly.</p>
                      </div>
                      <button 
                        className="btn primary"
                        onClick={() => setSupportActiveTab("contact")}
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Resources Tab */}
              {supportActiveTab === "resources" && (
                <div className="support-tab">
                  <div className="tab-header">
                    <h2>Helpful Resources</h2>
                    <p>Download guides, watch tutorials, and learn more</p>
                  </div>
                  
                  <div className="resources-grid">
                    <div className="resource-card">
                      <div className="resource-icon">
                        <FileText size={32} />
                      </div>
                      <h3>Tour Preparation Guide</h3>
                      <p>Complete guide to preparing for your adventure</p>
                      <button className="btn outline">
                        Download PDF <ExternalLink size={16} />
                      </button>
                    </div>
                    
                    <div className="resource-card">
                      <div className="resource-icon">
                        <Video size={32} />
                      </div>
                      <h3>Video Tutorials</h3>
                      <p>Watch how-to videos for booking and account management</p>
                      <button className="btn outline">
                        Watch Now <ExternalLink size={16} />
                      </button>
                    </div>
                    
                    <div className="resource-card">
                      <div className="resource-icon">
                        <Globe size={32} />
                      </div>
                      <h3>Travel Tips Blog</h3>
                      <p>Read articles about traveling in Namibia</p>
                      <button className="btn outline">
                        Visit Blog <ExternalLink size={16} />
                      </button>
                    </div>
                    
                    <div className="resource-card">
                      <div className="resource-icon">
                        <Calendar size={32} />
                      </div>
                      <h3>Seasonal Calendar</h3>
                      <p>Best times to visit and seasonal activities</p>
                      <button className="btn outline">
                        View Calendar <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="emergency-info">
                    <h3>🚨 Emergency Contact</h3>
                    <div className="emergency-card">
                      <div className="emergency-details">
                        <div className="detail">
                          <strong>Emergency Hotline:</strong>
                          <span>+264 81 999 1111</span>
                        </div>
                        <div className="detail">
                          <strong>24/7 WhatsApp:</strong>
                          <span>+264 81 999 2222</span>
                        </div>
                        <div className="detail">
                          <strong>Email:</strong>
                          <span>emergency@walvisbaytours.com</span>
                        </div>
                      </div>
                      <div className="emergency-note">
                        <AlertCircle size={20} />
                        <p>For medical emergencies, call 10111 (Namibia emergency number) immediately</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Ticket Status Tab */}
              {supportActiveTab === "status" && (
                <div className="support-tab">
                  <div className="tab-header">
                    <h2>Check Ticket Status</h2>
                    <p>Track the progress of your support requests</p>
                  </div>
                  
                  <div className="ticket-status">
                    <div className="status-search">
                      <input
                        type="text"
                        placeholder="Enter your ticket ID (e.g., TKT-123456)"
                        className="ticket-input"
                      />
                      <button className="btn primary">
                        Check Status
                      </button>
                    </div>
                    
                    <div className="status-example">
                      <p>Example ticket ID: <code>TKT-{Date.now().toString().slice(-6)}</code></p>
                      <p className="help-text">You can find your ticket ID in the confirmation email we sent you</p>
                    </div>
                    
                    <div className="status-timeline">
                      <h3>Typical Response Times</h3>
                      <div className="timeline">
                        <div className="timeline-item">
                          <div className="timeline-dot"></div>
                          <div className="timeline-content">
                            <h4>Immediate</h4>
                            <p>Emergency requests (marked as High Urgency)</p>
                          </div>
                          <div className="timeline-time">Within 30 minutes</div>
                        </div>
                        
                        <div className="timeline-item">
                          <div className="timeline-dot"></div>
                          <div className="timeline-content">
                            <h4>Fast Track</h4>
                            <p>Booking modifications & cancellations</p>
                          </div>
                          <div className="timeline-time">Within 2 hours</div>
                        </div>
                        
                        <div className="timeline-item">
                          <div className="timeline-dot"></div>
                          <div className="timeline-content">
                            <h4>Standard</h4>
                            <p>General inquiries & technical support</p>
                          </div>
                          <div className="timeline-time">Within 24 hours</div>
                        </div>
                      </div>
                    </div>
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