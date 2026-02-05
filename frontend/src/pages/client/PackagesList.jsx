import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './ClientPackagesPage.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Users,
  Clock,
  ChevronRight,
  ChevronLeft,
  Heart,
  TrendingUp,
  Shield,
  Award,
  Sparkles,
  Eye,
  Share2,
  Zap,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Tag,
  Navigation,
  Camera
} from 'lucide-react';

// Import images
import Image from '../../assets/img/Image.jpeg';
import Image1 from '../../assets/img/Image1.jpeg';
import Image2 from '../../assets/img/Image2.jpeg';
import Image3 from '../../assets/img/Image3.jpeg';
import Image4 from '../../assets/img/Image4.jpeg';
import Image5 from '../../assets/img/Image5.jpeg';
import Image6 from '../../assets/img/Image6.jpeg';
import Image7 from '../../assets/img/Image7.jpeg';
import Image8 from '../../assets/img/Image8.jpeg';
import Image9 from '../../assets/img/Image9.jpeg';
import Image10 from '../../assets/img/Image10.jpeg';
import Image11 from '../../assets/img/Image11.jpeg';
import Image12 from '../../assets/img/Image12.jpeg';
import Image13 from '../../assets/img/Image13.jpeg';
import Image14 from '../../assets/img/Image14.jpeg';
import Image15 from '../../assets/img/Image15.jpeg';

const ClientPackagesPage = () => {
  const heroImages = [Image, Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10, Image11, Image12, Image13, Image14, Image15];
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [wishlist, setWishlist] = useState([]);
  const [showQuickView, setShowQuickView] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const carouselRef = useRef(null);

  // Auto-slide hero every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Fetch packages
  useEffect(() => {
    axios.get("http://localhost:8080/api/packages/with-availability")
      .then(res => {
        const activePackages = res.data.filter(pkg => pkg.status === "ACTIVE");
        // Add mock data for demonstration
        const enhancedPackages = activePackages.map(pkg => ({
          ...pkg,
          category: pkg.category || ['Adventure', 'Wildlife', 'Cultural'][Math.floor(Math.random() * 3)],
          duration: pkg.duration || `${Math.floor(Math.random() * 3) + 2} hours`,
          groupSize: pkg.groupSize || `Max ${Math.floor(Math.random() * 12) + 4} people`,
          difficulty: pkg.difficulty || ['Easy', 'Moderate', 'Challenging'][Math.floor(Math.random() * 3)],
          rating: pkg.rating || (Math.random() * 2 + 3.5).toFixed(1),
          reviewCount: pkg.reviews || Math.floor(Math.random() * 50) + 10,
          features: pkg.features || ['Transport', 'Guide', 'Meals', 'Equipment'],
          isFeatured: Math.random() > 0.7,
          isPopular: Math.random() > 0.5,
        }));
        setPackages(enhancedPackages);
      })
      .catch(err => {
        console.error("Error:", err);
        // Fallback to mock data
        const mockPackages = Array.from({ length: 12 }, (_, i) => ({
          packageID: i + 1,
          title: `Amazing Tour ${i + 1}`,
          location: 'Walvis Bay',
          description: 'Experience the beauty of Namibia with this incredible tour package.',
          price: 800 + i * 100,
          offer: 600 + i * 80,
          image: heroImages[i % heroImages.length],
          available: 15,
          category: ['Adventure', 'Wildlife', 'Cultural'][i % 3],
          duration: `${(i % 3) + 2} hours`,
          groupSize: `Max ${(i % 6) + 6} people`,
          difficulty: ['Easy', 'Moderate', 'Challenging'][i % 3],
          rating: (Math.random() * 2 + 3.5).toFixed(1),
          reviewCount: Math.floor(Math.random() * 50) + 10,
          features: ['Transport', 'Guide', 'Meals', 'Equipment'],
          isFeatured: i < 3,
          isPopular: i < 6,
        }));
        setPackages(mockPackages);
      });
  }, []);

  // Filter & sort
  const filteredPackages = packages
    .filter(pkg => {
      // Search filter
      if (searchTerm && !pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !pkg.location?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (activeFilter !== 'all' && pkg.category !== activeFilter) {
        return false;
      }
      
      // Price filter
      if (pkg.offer < priceRange[0] || pkg.offer > priceRange[1]) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.offer - b.offer;
      if (sortBy === 'price-high') return b.offer - a.offer;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      return 0; // recommended - featured first, then by rating
    });

  const categories = ['all', 'Adventure', 'Wildlife', 'Cultural', 'Luxury', 'Family'];

  const stats = {
    totalPackages: packages.length,
    averageRating: packages.reduce((sum, pkg) => sum + parseFloat(pkg.rating || 0), 0) / packages.length,
    totalReviews: packages.reduce((sum, pkg) => sum + (pkg.reviewCount || 0), 0),
    featuredCount: packages.filter(p => p.isFeatured).length
  };

  const handleBooking = (pkg) => {
    if (pkg.available !== undefined && pkg.available <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Fully Booked',
        text: 'Sorry, this package is fully booked!',
        confirmButtonColor: '#667eea',
        background: '#0f3057',
        color: 'white'
      });
      return;
    }
    
    Swal.fire({
      title: `<span style="color: #0f3057">Book "${pkg.title}"</span>`,
      html: `
        <div style="text-align: left">
          <p style="color: #64748b; margin-bottom: 1rem">Ready to book this amazing tour?</p>
          <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
              <span style="color: #64748b">Price:</span>
              <span style="font-weight: bold; color: #0f3057">N$${pkg.offer}</span>
            </div>
            <div style="display: flex; justify-content: space-between">
              <span style="color: #64748b">Duration:</span>
              <span style="color: #0f3057">${pkg.duration}</span>
            </div>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1d86e9',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Confirm Booking',
      cancelButtonText: 'Maybe Later',
      background: '#ffffff',
      customClass: {
        popup: 'booking-modal'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          text: `Your booking for "${pkg.title}" has been confirmed.`,
          confirmButtonColor: '#10b981',
          background: '#0f3057',
          color: 'white'
        });
        navigate('/client/bookings');
      }
    });
  };

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const calculateDiscount = (original, offer) => {
    if (!original || !offer || original <= offer) return 0;
    return Math.round(((original - offer) / original) * 100);
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < Math.floor(rating) ? "#FFD700" : "none"}
            color={i < Math.floor(rating) ? "#FFD700" : "#CBD5E1"}
          />
        ))}
      </div>
    );
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': '#10b981',
      'Moderate': '#f59e0b',
      'Challenging': '#ef4444'
    };
    return colors[difficulty] || '#64748b';
  };

  const scrollCarousel = (direction) => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth / 2;
    container.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="client-packages-page">
      {/* Hero Section with Parallax */}
      <section className="hero-section">
        <div className="hero-background" style={{ backgroundImage: `url(${heroImages[currentHeroIndex]})` }}>
          <div className="hero-overlay" />
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Premium Adventure Tours</span>
          </div>
          
          <h1 className="hero-title">
            Discover Namibia's
            <span className="hero-highlight"> Hidden Wonders</span>
          </h1>
          
          <p className="hero-subtitle">
            Experience breathtaking landscapes, unique wildlife, and unforgettable adventures 
            with our handcrafted tour packages
          </p>
          
          <div className="hero-search">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search tours, destinations, or activities..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-btn">
                <Search size={20} />
              </button>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">{stats.totalPackages}+</div>
              <div className="stat-label">Premium Tours</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.averageRating.toFixed(1)}</div>
              <div className="stat-label">Avg. Rating</div>
            </div>
            <div className="stat">
              <div className="stat-value">{stats.totalReviews}+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Features Banner */}
      <section className="features-banner">
        <div className="features-container">
          <div className="feature">
            <Shield size={24} />
            <div>
              <h4>Safety First</h4>
              <p>Certified guides & insured tours</p>
            </div>
          </div>
          <div className="feature">
            <Award size={24} />
            <div>
              <h4>Premium Quality</h4>
              <p>Luxury vehicles & equipment</p>
            </div>
          </div>
          <div className="feature">
            <Sparkles size={24} />
            <div>
              <h4>Unique Experiences</h4>
              <p>Handcrafted adventure tours</p>
            </div>
          </div>
          <div className="feature">
            <Zap size={24} />
            <div>
              <h4>Instant Booking</h4>
              <p>Secure & instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="packages-container">
        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${filterOpen ? 'open' : ''}`}>
          <div className="filters-header">
            <h3>
              <Filter size={18} />
              Filters & Sorting
            </h3>
            <button 
              className="close-filters"
              onClick={() => setFilterOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className="filter-section">
            <h4>Categories</h4>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-filter ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category === 'all' ? 'All Tours' : category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range">
              <div className="price-values">
                <span>N${priceRange[0]}</span>
                <span>N${priceRange[1]}+</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="price-slider"
              />
            </div>
          </div>
          
          <div className="filter-section">
            <h4>Sort By</h4>
            <div className="sort-options">
              {[
                { id: 'recommended', label: 'Recommended' },
                { id: 'popular', label: 'Most Popular' },
                { id: 'rating', label: 'Highest Rated' },
                { id: 'price-low', label: 'Price: Low to High' },
                { id: 'price-high', label: 'Price: High to Low' }
              ].map(option => (
                <label key={option.id} className="sort-option">
                  <input
                    type="radio"
                    name="sort"
                    value={option.id}
                    checked={sortBy === option.id}
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                  <span className="checkmark"></span>
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button 
            className="btn outline full"
            onClick={() => {
              setActiveFilter('all');
              setPriceRange([0, 5000]);
              setSortBy('recommended');
            }}
          >
            Clear All Filters
          </button>
        </aside>

        {/* Main Packages Area */}
        <main className="packages-main">
          {/* Header */}
          <div className="packages-header">
            <div className="header-left">
              <h2>Explore Our Tours</h2>
              <p className="results-count">
                {filteredPackages.length} amazing tours found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
            
            <div className="header-actions">
              <button 
                className="btn outline"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>

          {/* Featured Tours */}
          {filteredPackages.filter(p => p.isFeatured).length > 0 && (
            <div className="featured-section">
              <div className="section-header">
                <h3>
                  <Sparkles size={20} />
                  Featured Tours
                </h3>
                <span className="section-subtitle">Handpicked by our experts</span>
              </div>
              
              <div className="featured-carousel">
                <button className="carousel-btn prev" onClick={() => scrollCarousel('prev')}>
                  <ChevronLeft size={24} />
                </button>
                
                <div className="featured-grid" ref={carouselRef}>
                  {filteredPackages.filter(p => p.isFeatured).map(pkg => (
                    <div key={pkg.packageID} className="featured-card">
                      <div className="featured-image">
                        <img src={pkg.image} alt={pkg.title} />
                        <div className="featured-badge">
                          <Sparkles size={14} />
                          Featured
                        </div>
                        <button 
                          className="wishlist-btn"
                          onClick={() => toggleWishlist(pkg.packageID)}
                        >
                          <Heart 
                            size={20} 
                            fill={wishlist.includes(pkg.packageID) ? "#ef4444" : "none"}
                            color={wishlist.includes(pkg.packageID) ? "#ef4444" : "white"}
                          />
                        </button>
                      </div>
                      
                      <div className="featured-content">
                        <div className="tour-category">
                          <Tag size={14} />
                          <span>{pkg.category}</span>
                        </div>
                        
                        <h3>{pkg.title}</h3>
                        
                        <div className="tour-meta">
                          <div className="meta-item">
                            <MapPin size={14} />
                            <span>{pkg.location}</span>
                          </div>
                          <div className="meta-item">
                            <Clock size={14} />
                            <span>{pkg.duration}</span>
                          </div>
                          <div className="meta-item">
                            <Users size={14} />
                            <span>{pkg.groupSize}</span>
                          </div>
                        </div>
                        
                        <div className="tour-rating">
                          {renderStars(pkg.rating)}
                          <span className="rating-number">{pkg.rating}</span>
                          <span className="review-count">({pkg.reviewCount} reviews)</span>
                        </div>
                        
                        <div className="tour-features">
                          {pkg.features?.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="feature-tag">
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <div className="tour-pricing">
                          {calculateDiscount(pkg.price, pkg.offer) > 0 && (
                            <div className="discount-badge">
                              Save {calculateDiscount(pkg.price, pkg.offer)}%
                            </div>
                          )}
                          <div className="price-container">
                            {pkg.offer < pkg.price ? (
                              <>
                                <span className="original-price">N${pkg.price}</span>
                                <span className="current-price">N${pkg.offer}</span>
                              </>
                            ) : (
                              <span className="current-price">N${pkg.price}</span>
                            )}
                            <span className="price-per">/person</span>
                          </div>
                        </div>
                        
                        <div className="tour-actions">
                          <button 
                            className="btn outline"
                            onClick={() => setShowQuickView(pkg)}
                          >
                            <Eye size={16} />
                            Quick View
                          </button>
                          <button 
                            className={`btn primary ${pkg.available <= 0 ? 'disabled' : ''}`}
                            onClick={() => handleBooking(pkg)}
                            disabled={pkg.available <= 0}
                          >
                            {pkg.available <= 0 ? 'Fully Booked' : 'Book Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="carousel-btn next" onClick={() => scrollCarousel('next')}>
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          )}

          {/* All Tours Grid */}
          <div className="all-tours-section">
            <div className="section-header">
              <h3>All Available Tours</h3>
              <span className="section-subtitle">Browse our complete collection</span>
            </div>
            
            <div className="tours-grid">
              {filteredPackages.map(pkg => (
                <div key={pkg.packageID} className="tour-card">
                  <div className="tour-image">
                    <img src={pkg.image} alt={pkg.title} />
                    <div className="tour-overlay">
                      <button 
                        className="wishlist-btn"
                        onClick={() => toggleWishlist(pkg.packageID)}
                      >
                        <Heart 
                          size={20} 
                          fill={wishlist.includes(pkg.packageID) ? "#ef4444" : "none"}
                          color={wishlist.includes(pkg.packageID) ? "#ef4444" : "white"}
                        />
                      </button>
                      
                      {pkg.isPopular && (
                        <div className="popular-badge">
                          <TrendingUp size={14} />
                          Popular
                        </div>
                      )}
                    </div>
                    
                    {calculateDiscount(pkg.price, pkg.offer) > 0 && (
                      <div className="discount-badge">
                        Save {calculateDiscount(pkg.price, pkg.offer)}%
                      </div>
                    )}
                  </div>
                  
                  <div className="tour-content">
                    <div className="tour-header">
                      <div className="tour-category">
                        <span style={{ 
                          backgroundColor: `${getDifficultyColor(pkg.difficulty)}15`,
                          color: getDifficultyColor(pkg.difficulty)
                        }}>
                          {pkg.difficulty}
                        </span>
                        <span>{pkg.category}</span>
                      </div>
                      
                      <div className="tour-rating">
                        {renderStars(pkg.rating)}
                        <span>{pkg.rating}</span>
                      </div>
                    </div>
                    
                    <h3>{pkg.title}</h3>
                    
                    <div className="tour-meta">
                      <div className="meta-item">
                        <MapPin size={14} />
                        <span>{pkg.location}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                    
                    <p className="tour-description">{pkg.description}</p>
                    
                    <div className="tour-features">
                      {pkg.features?.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="tour-footer">
                      <div className="tour-pricing">
                        {pkg.offer < pkg.price ? (
                          <>
                            <span className="original-price">N${pkg.price}</span>
                            <span className="current-price">N${pkg.offer}</span>
                          </>
                        ) : (
                          <span className="current-price">N${pkg.price}</span>
                        )}
                        <span className="price-label">per person</span>
                      </div>
                      
                      <div className="tour-actions">
                        <button 
                          className="btn outline small"
                          onClick={() => setShowQuickView(pkg)}
                        >
                          View
                        </button>
                        <button 
                          className={`btn primary small ${pkg.available <= 0 ? 'disabled' : ''}`}
                          onClick={() => handleBooking(pkg)}
                          disabled={pkg.available <= 0}
                        >
                          {pkg.available <= 0 ? 'Sold Out' : 'Book'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredPackages.length === 0 && (
              <div className="empty-state">
                <Navigation size={48} />
                <h3>No tours found</h3>
                <p>Try adjusting your search or filters</p>
                <button 
                  className="btn outline"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                    setPriceRange([0, 5000]);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="modal-overlay" onClick={() => setShowQuickView(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tour Details</h3>
              <button className="close-modal" onClick={() => setShowQuickView(null)}>
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={showQuickView.image} alt={showQuickView.title} />
              </div>
              
              <div className="modal-details">
                <div className="modal-header-info">
                  <div>
                    <h2>{showQuickView.title}</h2>
                    <div className="location">
                      <MapPin size={16} />
                      <span>{showQuickView.location}</span>
                    </div>
                  </div>
                  
                  <div className="modal-rating">
                    {renderStars(showQuickView.rating)}
                    <span className="rating-number">{showQuickView.rating}</span>
                    <span className="review-count">({showQuickView.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="modal-meta">
                  <div className="meta-grid">
                    <div className="meta-item">
                      <Clock size={18} />
                      <div>
                        <span className="meta-label">Duration</span>
                        <span className="meta-value">{showQuickView.duration}</span>
                      </div>
                    </div>
                    
                    <div className="meta-item">
                      <Users size={18} />
                      <div>
                        <span className="meta-label">Group Size</span>
                        <span className="meta-value">{showQuickView.groupSize}</span>
                      </div>
                    </div>
                    
                    <div className="meta-item">
                      <Tag size={18} />
                      <div>
                        <span className="meta-label">Category</span>
                        <span className="meta-value">{showQuickView.category}</span>
                      </div>
                    </div>
                    
                    <div className="meta-item">
                      <div style={{ color: getDifficultyColor(showQuickView.difficulty) }}>
                        ●
                      </div>
                      <div>
                        <span className="meta-label">Difficulty</span>
                        <span className="meta-value">{showQuickView.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="modal-description">
                  <h4>Description</h4>
                  <p>{showQuickView.description}</p>
                </div>
                
                <div className="modal-features">
                  <h4>What's Included</h4>
                  <div className="features-list">
                    {showQuickView.features?.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <CheckCircle size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="modal-pricing">
                  <div className="pricing-info">
                    {showQuickView.offer < showQuickView.price ? (
                      <>
                        <div className="original-price">N${showQuickView.price}</div>
                        <div className="current-price">N${showQuickView.offer}</div>
                        <div className="discount">
                          Save {calculateDiscount(showQuickView.price, showQuickView.offer)}%
                        </div>
                      </>
                    ) : (
                      <div className="current-price">N${showQuickView.price}</div>
                    )}
                    <div className="price-label">per person</div>
                  </div>
                  
                  <div className="modal-actions">
                    <button className="btn outline">
                      <Share2 size={16} />
                      Share
                    </button>
                    <button 
                      className={`btn primary ${showQuickView.available <= 0 ? 'disabled' : ''}`}
                      onClick={() => {
                        handleBooking(showQuickView);
                        setShowQuickView(null);
                      }}
                      disabled={showQuickView.available <= 0}
                    >
                      {showQuickView.available <= 0 ? 'Fully Booked' : 'Book This Tour'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientPackagesPage;