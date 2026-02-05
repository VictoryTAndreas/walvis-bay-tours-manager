// Reviews.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  Edit,
  Trash2,
  Filter,
  Search,
  Calendar,
  Users,
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  Share2,
  Download,
  Plus,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Camera,
  Send,
  Smile,
  Frown,
  Meh,
  Heart,
  CreditCard,
  Settings,
  TrendingUp as OverviewIcon,
  HelpCircle,
  Bell,
  LogOut
} from "lucide-react";
import TopNavigationBar from "./TopNavigationBar";
import "./reviews.css";
import "./Dashboard.css"; // Assuming you have Dashboard.css from previous code

export default function Reviews() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("reviews"); // For navbar
  const [reviewsActiveTab, setReviewsActiveTab] = useState("my-reviews"); // For reviews section
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedReview, setExpandedReview] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your review for Dolphin Cruise got 5 likes", time: "1 day ago", read: false, link: "/client/reviews" },
    { id: 2, message: "New review response from tour operator", time: "2 days ago", read: false, link: "/client/reviews" },
  ]);

  const [filters, setFilters] = useState({
    rating: "all",
    dateRange: "all",
    tourType: "all",
    hasResponse: "all"
  });

  const [newReview, setNewReview] = useState({
    tourId: "",
    rating: 5,
    title: "",
    review: "",
    photos: [],
    wouldRecommend: true,
    tags: []
  });

  // Load user data on component mount
  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    const storedUserData = localStorage.getItem('clientData');
    
    if (!token) {
      navigate("/client/login", { 
        state: { message: "Please login to access your reviews." } 
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

  // Mock reviews data
  const reviewsData = {
    "my-reviews": [
      {
        id: 1,
        tourName: "Desert Safari Adventure",
        date: "2024-05-10",
        rating: 5,
        title: "Absolutely Amazing Experience!",
        review: "The desert safari was beyond incredible. Our guide John was extremely knowledgeable and made sure we had the best experience possible. The sunset views were breathtaking and the dunes were so much fun to explore. Highly recommend this tour to anyone visiting Walvis Bay!",
        photos: ["desert1.jpg", "desert2.jpg"],
        tourType: "Adventure",
        duration: "8 hours",
        guide: "John M.",
        likes: 24,
        comments: 3,
        hasResponse: true,
        response: {
          date: "2024-05-11",
          message: "Thank you for your wonderful review! We're thrilled to hear you enjoyed your desert safari with John. He's one of our most experienced guides. We look forward to welcoming you back for another adventure!",
          responder: "Sarah - Customer Experience Manager"
        },
        tags: ["Knowledgeable Guide", "Beautiful Scenery", "Family Friendly"]
      },
      {
        id: 2,
        tourName: "Marine Wildlife Tour",
        date: "2024-04-22",
        rating: 4,
        title: "Great dolphin sightings",
        review: "Saw plenty of dolphins and seals during the tour. The boat was comfortable and the guide was informative. Only reason for 4 stars instead of 5 is that the tour felt a bit rushed in some areas.",
        photos: ["marine1.jpg"],
        tourType: "Wildlife",
        duration: "6 hours",
        guide: "Sarah K.",
        likes: 12,
        comments: 1,
        hasResponse: false,
        tags: ["Dolphins", "Seals", "Good Guide"]
      },
      {
        id: 3,
        tourName: "Sunset Kayaking",
        date: "2024-04-15",
        rating: 5,
        title: "Peaceful and beautiful",
        review: "Kayaking during sunset was magical. The water was calm and the colors in the sky were incredible. Mike, our guide, was very patient and took great photos for us.",
        photos: ["kayak1.jpg", "kayak2.jpg", "kayak3.jpg"],
        tourType: "Adventure",
        duration: "3 hours",
        guide: "Mike T.",
        likes: 18,
        comments: 2,
        hasResponse: true,
        response: {
          date: "2024-04-16",
          message: "We're so glad you enjoyed the sunset kayaking experience! Mike is indeed an excellent guide and photographer. We hope to see you again for more adventures on the water!",
          responder: "Tour Operations Team"
        },
        tags: ["Sunset", "Peaceful", "Great Photos"]
      }
    ],
    "tours-to-review": [
      {
        id: 4,
        tourName: "Sandboarding Experience",
        date: "2024-06-01",
        rating: null,
        title: "",
        review: "",
        tourType: "Adventure",
        duration: "5 hours",
        guide: "David L.",
        expiresIn: 7 // days left to review
      }
    ],
    "liked-reviews": [
      {
        id: 5,
        tourName: "Private Helicopter Tour",
        author: "Michael R.",
        date: "2024-05-25",
        rating: 5,
        title: "Breathtaking aerial views!",
        excerpt: "The helicopter tour provided incredible views of Walvis Bay that you simply can't get any other way...",
        likes: 42,
        comments: 8
      },
      {
        id: 6,
        tourName: "Desert Stargazing",
        author: "Lisa P.",
        date: "2024-05-20",
        rating: 5,
        title: "Magical night under the stars",
        excerpt: "The astronomy guide was incredibly knowledgeable and the telescope setup was professional...",
        likes: 38,
        comments: 5
      }
    ]
  };

  const [reviews, setReviews] = useState(reviewsData["my-reviews"]);
  const [toursToReview, setToursToReview] = useState(reviewsData["tours-to-review"]);
  const [likedReviews, setLikedReviews] = useState(reviewsData["liked-reviews"]);

  const stats = {
    totalReviews: reviews.length,
    averageRating: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    helpfulCount: reviews.reduce((sum, r) => sum + r.likes, 0),
    responseRate: reviews.length > 0 ? (reviews.filter(r => r.hasResponse).length / reviews.length * 100).toFixed(0) : 0
  };

  const filteredReviews = reviews.filter(review => {
    // Search filter
    if (searchTerm && !review.tourName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !review.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Rating filter
    if (filters.rating !== "all" && review.rating !== parseInt(filters.rating)) {
      return false;
    }
    
    // Response filter
    if (filters.hasResponse === "yes" && !review.hasResponse) return false;
    if (filters.hasResponse === "no" && review.hasResponse) return false;
    
    return true;
  });

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({
      tourId: review.id,
      rating: review.rating,
      title: review.title,
      review: review.review,
      photos: review.photos,
      wouldRecommend: true,
      tags: review.tags
    });
  };

  const handleSaveReview = () => {
    // Update the review
    setReviews(prev => prev.map(r => 
      r.id === editingReview.id 
        ? { ...r, ...newReview }
        : r
    ));
    
    setEditingReview(null);
    setNewReview({
      tourId: "",
      rating: 5,
      title: "",
      review: "",
      photos: [],
      wouldRecommend: true,
      tags: []
    });
  };

  const handleDeleteReview = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleLikeReview = (id) => {
    setReviews(prev => prev.map(r => 
      r.id === id 
        ? { ...r, likes: r.likes + 1 }
        : r
    ));
  };

  const handleSubmitReply = (reviewId) => {
    // In a real app, this would send to API
    setShowReplyForm(null);
    setReplyText("");
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "#10b981";
    if (rating >= 3.5) return "#f59e0b";
    return "#ef4444";
  };

  const getSentimentIcon = (rating) => {
    if (rating >= 4.5) return <Smile size={20} color="#10b981" />;
    if (rating >= 3.5) return <Meh size={20} color="#f59e0b" />;
    return <Frown size={20} color="#ef4444" />;
  };

  const renderStars = (rating, size = 16) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={size} 
            fill={i < rating ? "#FFD700" : "none"}
            color={i < rating ? "#FFD700" : "#CBD5E1"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <TopNavigationBar
        userData={userData}
        activeTab="reviews"
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
            
            <Link to="/client/reviews" className="menu-item active">
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
        <main className="dashboard-main reviews-page">
          {/* Header */}
          <div className="reviews-header">
            <div className="header-left">
              <h1>My Reviews</h1>
              <p className="subtitle">Share your experiences and read what others think</p>
            </div>
            
            <div className="header-actions">
              <button 
                className="btn primary"
                onClick={() => setReviewsActiveTab("tours-to-review")}
              >
                <Plus size={18} />
                Write a Review
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="reviews-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <Star size={24} />
              </div>
              <div className="stat-info">
                <h3>{stats.averageRating.toFixed(1)}</h3>
                <p>Average Rating</p>
                <div className="rating-stars">
                  {renderStars(Math.round(stats.averageRating), 14)}
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <MessageSquare size={24} />
              </div>
              <div className="stat-info">
                <h3>{stats.totalReviews}</h3>
                <p>Reviews Written</p>
                <span className="stat-change">
                  {stats.totalReviews > 0 ? `${stats.responseRate}% with response` : 'No reviews yet'}
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <ThumbsUp size={24} />
              </div>
              <div className="stat-info">
                <h3>{stats.helpfulCount}</h3>
                <p>Helpful Votes</p>
                <span className="stat-change positive">
                  Your reviews helped others
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <CheckCircle size={24} />
              </div>
              <div className="stat-info">
                <h3>{toursToReview.length}</h3>
                <p>Tours to Review</p>
                {toursToReview.length > 0 && (
                  <span className="stat-change warning">
                    {toursToReview.length} pending
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="reviews-content">
            {/* Sidebar */}
            <aside className="reviews-sidebar">
              <div className="sidebar-tabs">
                <button 
                  className={`sidebar-tab ${reviewsActiveTab === "my-reviews" ? "active" : ""}`}
                  onClick={() => {
                    setReviewsActiveTab("my-reviews");
                    setReviews(reviewsData["my-reviews"]);
                  }}
                >
                  <MessageSquare size={18} />
                  <span>My Reviews</span>
                  <span className="tab-count">{reviewsData["my-reviews"].length}</span>
                </button>
                
                <button 
                  className={`sidebar-tab ${reviewsActiveTab === "tours-to-review" ? "active" : ""}`}
                  onClick={() => {
                    setReviewsActiveTab("tours-to-review");
                    setReviews(reviewsData["tours-to-review"]);
                  }}
                >
                  <Edit size={18} />
                  <span>To Review</span>
                  <span className="tab-count warning">{reviewsData["tours-to-review"].length}</span>
                </button>
                
                <button 
                  className={`sidebar-tab ${reviewsActiveTab === "liked-reviews" ? "active" : ""}`}
                  onClick={() => {
                    setReviewsActiveTab("liked-reviews");
                    setReviews(reviewsData["liked-reviews"]);
                  }}
                >
                  <ThumbsUp size={18} />
                  <span>Liked Reviews</span>
                  <span className="tab-count">{reviewsData["liked-reviews"].length}</span>
                </button>
              </div>

              <div className="filter-section">
                <div className="filter-header" onClick={() => setFilterOpen(!filterOpen)}>
                  <h3>
                    <Filter size={18} />
                    Filter Reviews
                  </h3>
                  <ChevronDown size={18} className={filterOpen ? "open" : ""} />
                </div>
                
                {filterOpen && (
                  <div className="filter-content">
                    <div className="filter-group">
                      <label>Rating</label>
                      <select 
                        value={filters.rating}
                        onChange={(e) => setFilters({...filters, rating: e.target.value})}
                      >
                        <option value="all">All Ratings</option>
                        <option value="5">★★★★★ (5)</option>
                        <option value="4">★★★★☆ (4)</option>
                        <option value="3">★★★☆☆ (3)</option>
                        <option value="2">★★☆☆☆ (2)</option>
                        <option value="1">★☆☆☆☆ (1)</option>
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label>Date Range</label>
                      <select 
                        value={filters.dateRange}
                        onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                      >
                        <option value="all">All Time</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="quarter">Last 3 Months</option>
                        <option value="year">Last Year</option>
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label>Has Response</label>
                      <select 
                        value={filters.hasResponse}
                        onChange={(e) => setFilters({...filters, hasResponse: e.target.value})}
                      >
                        <option value="all">All Reviews</option>
                        <option value="yes">With Response</option>
                        <option value="no">Without Response</option>
                      </select>
                    </div>
                    
                    <button 
                      className="btn outline full"
                      onClick={() => setFilters({
                        rating: "all",
                        dateRange: "all",
                        tourType: "all",
                        hasResponse: "all"
                      })}
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>

              <div className="review-tips">
                <h3>💡 Writing Tips</h3>
                <ul>
                  <li>Be specific about what you liked</li>
                  <li>Mention your tour guide by name</li>
                  <li>Share photos if you have them</li>
                  <li>Be honest but constructive</li>
                  <li>Focus on your personal experience</li>
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <main className="reviews-main">
              {/* Search Bar */}
              <div className="reviews-toolbar">
                <div className="search-box">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="sort-options">
                  <select className="sort-select">
                    <option value="recent">Most Recent</option>
                    <option value="rating">Highest Rated</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="comments">Most Comments</option>
                  </select>
                  
                  <button className="btn outline">
                    <Download size={18} />
                    Export
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="reviews-list">
                {reviewsActiveTab === "my-reviews" && (
                  <>
                    {filteredReviews.length === 0 ? (
                      <div className="empty-state">
                        <MessageSquare size={48} />
                        <h3>No reviews found</h3>
                        <p>Try adjusting your filters or write your first review</p>
                        <button 
                          className="btn primary"
                          onClick={() => setReviewsActiveTab("tours-to-review")}
                        >
                          Write a Review
                        </button>
                      </div>
                    ) : (
                      filteredReviews.map(review => (
                        <div key={review.id} className="review-card">
                          <div className="review-header">
                            <div className="review-tour">
                              <h3>{review.tourName}</h3>
                              <div className="tour-meta">
                                <div className="meta-item">
                                  <Calendar size={14} />
                                  <span>{new Date(review.date).toLocaleDateString()}</span>
                                </div>
                                <div className="meta-item">
                                  <Clock size={14} />
                                  <span>{review.duration}</span>
                                </div>
                                <div className="meta-item">
                                  <Users size={14} />
                                  <span>Guide: {review.guide}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="review-actions">
                              <button 
                                className="icon-btn"
                                onClick={() => handleEditReview(review)}
                                title="Edit review"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                className="icon-btn danger"
                                onClick={() => handleDeleteReview(review.id)}
                                title="Delete review"
                              >
                                <Trash2 size={18} />
                              </button>
                              <button 
                                className="icon-btn"
                                onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                                title={expandedReview === review.id ? "Collapse" : "Expand"}
                              >
                                <ChevronDown size={18} className={expandedReview === review.id ? "expanded" : ""} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="review-content">
                            <div className="rating-header">
                              <div className="rating-display">
                                {renderStars(review.rating, 20)}
                                <span className="rating-number">{review.rating.toFixed(1)}</span>
                                {getSentimentIcon(review.rating)}
                              </div>
                              <h4>{review.title}</h4>
                            </div>
                            
                            <p className="review-text">{review.review}</p>
                            
                            {review.photos.length > 0 && (
                              <div className="review-photos">
                                <div className="photos-header">
                                  <Camera size={16} />
                                  <span>{review.photos.length} photo{review.photos.length > 1 ? 's' : ''}</span>
                                </div>
                                <div className="photos-grid">
                                  {review.photos.map((photo, index) => (
                                    <div key={index} className="photo-thumbnail">
                                      <div className="thumbnail-placeholder">
                                        <Camera size={20} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {review.tags.length > 0 && (
                              <div className="review-tags">
                                {review.tags.map((tag, index) => (
                                  <span key={index} className="tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            <div className="review-stats">
                              <button 
                                className="stat-btn"
                                onClick={() => handleLikeReview(review.id)}
                              >
                                <ThumbsUp size={16} />
                                <span>{review.likes} helpful</span>
                              </button>
                              <button 
                                className="stat-btn"
                                onClick={() => setShowReplyForm(showReplyForm === review.id ? null : review.id)}
                              >
                                <MessageSquare size={16} />
                                <span>{review.comments} comments</span>
                              </button>
                              <button className="stat-btn">
                                <Share2 size={16} />
                                <span>Share</span>
                              </button>
                            </div>
                            
                            {review.hasResponse && review.response && (
                              <div className="review-response">
                                <div className="response-header">
                                  <CheckCircle size={16} color="#10b981" />
                                  <span className="response-title">Tour Operator Response</span>
                                  <span className="response-date">{review.response.date}</span>
                                </div>
                                <p className="response-text">{review.response.message}</p>
                                <div className="responder">{review.response.responder}</div>
                              </div>
                            )}
                            
                            {showReplyForm === review.id && (
                              <div className="reply-form">
                                <textarea
                                  placeholder="Add a comment or reply..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  rows="3"
                                />
                                <div className="reply-actions">
                                  <button 
                                    className="btn outline"
                                    onClick={() => setShowReplyForm(null)}
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    className="btn primary"
                                    onClick={() => handleSubmitReply(review.id)}
                                    disabled={!replyText.trim()}
                                  >
                                    <Send size={16} />
                                    Post Comment
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </>
                )}

                {/* Tours to Review */}
                {reviewsActiveTab === "tours-to-review" && (
                  <div className="tours-to-review">
                    {toursToReview.length === 0 ? (
                      <div className="empty-state">
                        <CheckCircle size={48} />
                        <h3>All caught up!</h3>
                        <p>You've reviewed all your recent tours</p>
                      </div>
                    ) : (
                      toursToReview.map(tour => (
                        <div key={tour.id} className="review-prompt">
                          <div className="prompt-header">
                            <div>
                              <h3>{tour.tourName}</h3>
                              <p className="tour-info">
                                <Calendar size={14} />
                                <span>Taken on {new Date(tour.date).toLocaleDateString()}</span>
                                <span className="divider">•</span>
                                <Users size={14} />
                                <span>Guide: {tour.guide}</span>
                              </p>
                            </div>
                            <div className="expiry-badge">
                              <AlertCircle size={16} />
                              <span>Review expires in {tour.expiresIn} days</span>
                            </div>
                          </div>
                          
                          <div className="review-editor">
                            <div className="rating-selector">
                              <span>Your Rating:</span>
                              <div className="star-selector">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <button
                                    key={star}
                                    className={`star-btn ${newReview.rating >= star ? "active" : ""}`}
                                    onClick={() => setNewReview({...newReview, rating: star})}
                                  >
                                    <Star size={24} />
                                  </button>
                                ))}
                              </div>
                              <span className="rating-label">
                                {newReview.rating === 5 ? "Excellent" :
                                 newReview.rating === 4 ? "Good" :
                                 newReview.rating === 3 ? "Average" :
                                 newReview.rating === 2 ? "Poor" : "Terrible"}
                              </span>
                            </div>
                            
                            <div className="editor-inputs">
                              <input
                                type="text"
                                placeholder="Title your review..."
                                value={newReview.title}
                                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
                                className="title-input"
                              />
                              
                              <textarea
                                placeholder="Share details of your experience... What did you like? What could be improved?"
                                value={newReview.review}
                                onChange={(e) => setNewReview({...newReview, review: e.target.value})}
                                rows="6"
                                className="review-input"
                              />
                              
                              <div className="editor-options">
                                <label className="option">
                                  <input
                                    type="checkbox"
                                    checked={newReview.wouldRecommend}
                                    onChange={(e) => setNewReview({...newReview, wouldRecommend: e.target.checked})}
                                  />
                                  <span>I would recommend this tour</span>
                                </label>
                                
                                <div className="photo-upload">
                                  <Camera size={18} />
                                  <span>Add photos (optional)</span>
                                  <input type="file" multiple accept="image/*" style={{ display: 'none' }} />
                                </div>
                              </div>
                            </div>
                            
                            <div className="editor-tags">
                              <span>Add tags:</span>
                              {["Great Guide", "Beautiful Scenery", "Family Friendly", "Good Value", "Educational"].map(tag => (
                                <button
                                  key={tag}
                                  className={`tag-btn ${newReview.tags.includes(tag) ? "selected" : ""}`}
                                  onClick={() => {
                                    if (newReview.tags.includes(tag)) {
                                      setNewReview({...newReview, tags: newReview.tags.filter(t => t !== tag)});
                                    } else {
                                      setNewReview({...newReview, tags: [...newReview.tags, tag]});
                                    }
                                  }}
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                            
                            <div className="editor-actions">
                              <button className="btn outline">
                                Save Draft
                              </button>
                              <button 
                                className="btn primary"
                                onClick={handleSaveReview}
                                disabled={!newReview.title.trim() || !newReview.review.trim()}
                              >
                                Submit Review
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Liked Reviews */}
                {reviewsActiveTab === "liked-reviews" && (
                  <div className="liked-reviews">
                    {likedReviews.length === 0 ? (
                      <div className="empty-state">
                        <ThumbsUp size={48} />
                        <h3>No liked reviews yet</h3>
                        <p>Start liking reviews to see them here</p>
                      </div>
                    ) : (
                      likedReviews.map(review => (
                        <div key={review.id} className="liked-review-card">
                          <div className="liked-header">
                            <div className="author-info">
                              <div className="author-avatar">
                                {review.author.charAt(0)}
                              </div>
                              <div>
                                <h4>{review.author}</h4>
                                <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="liked-rating">
                              {renderStars(review.rating)}
                              <span>{review.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          
                          <h3 className="liked-tour">{review.tourName}</h3>
                          <h4 className="liked-title">{review.title}</h4>
                          <p className="liked-excerpt">{review.excerpt}</p>
                          
                          <div className="liked-stats">
                            <div className="stat">
                              <ThumbsUp size={14} />
                              <span>{review.likes}</span>
                            </div>
                            <div className="stat">
                              <MessageSquare size={14} />
                              <span>{review.comments}</span>
                            </div>
                            <button className="btn outline small">
                              Read Full Review
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Review Guidelines */}
              <div className="review-guidelines">
                <h3>📝 Review Guidelines</h3>
                <div className="guidelines-content">
                  <div className="guideline">
                    <CheckCircle size={16} color="#10b981" />
                    <span>Be honest and objective about your experience</span>
                  </div>
                  <div className="guideline">
                    <CheckCircle size={16} color="#10b981" />
                    <span>Focus on the tour itself, not unrelated factors</span>
                  </div>
                  <div className="guideline">
                    <CheckCircle size={16} color="#10b981" />
                    <span>Respect other reviewers and the tour operators</span>
                  </div>
                  <div className="guideline">
                    <CheckCircle size={16} color="#10b981" />
                    <span>Share helpful information for future travelers</span>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
      </div>
    </div>
  );
}