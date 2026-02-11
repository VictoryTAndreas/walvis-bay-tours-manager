import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Shield, AlertCircle, Check, Facebook } from "lucide-react";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage || 
                         new URLSearchParams(location.search).get('success');

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(!!successMessage);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsSubmitting(true);
  
  try {
    // 🔗 TODO: Replace with actual API call
    console.log("Logging in:", form);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save user data to localStorage/sessionStorage
    const userData = {
      email: form.email,
      name: "Victory Andreas", // This should come from API
      token: "demo-token-123", // This should come from API
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('clientToken', userData.token);
    localStorage.setItem('clientData', JSON.stringify(userData));
    
    // Success - redirect to dashboard
    navigate("/client/dashboard", { 
      state: { 
        welcomeMessage: `Welcome back, ${form.email.split('@')[0]}!`,
        user: userData
      }
    });
    
  } catch (error) {
    console.error("Login failed:", error);
    setErrors({ submit: "Invalid email or password. Please try again." });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  const handleForgotPassword = () => {
    navigate("/client/forgot-password");
  };

  const demoAccounts = [
    { email: "demo@walvisbaytours.com", password: "demo123", label: "Demo Account" },
    { email: "admin@walvisbaytours.com", password: "admin123", label: "Admin Account" },
  ];

  const fillDemoAccount = (account) => {
    setForm({
      email: account.email,
      password: account.password,
      rememberMe: false
    });
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="login-container">
        {/* Left side - Welcome & Features */}
        <div className="login-welcome">
          <Link to="/" className="back-home">
            ← Back to Home
          </Link>
          
          <div className="welcome-content">
            <div className="logo">
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
              <h2>WalvisBay Tours</h2>
            </div>
            
            <h1>Welcome Back to Your Adventure Hub</h1>
            <p className="welcome-text">
              Access your bookings, manage tours, and continue your journey with us.
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <Check size={20} />
                <span>Manage your bookings & reservations</span>
              </div>
              <div className="feature-item">
                <Check size={20} />
                <span>View your tour history & photos</span>
              </div>
              <div className="feature-item">
                <Check size={20} />
                <span>Get personalized recommendations</span>
              </div>
              <div className="feature-item">
                <Check size={20} />
                <span>Access exclusive member deals</span>
              </div>
            </div>
            
            <div className="testimonial">
              <div className="quote">"The most seamless booking experience I've ever had!"</div>
              <div className="author">— Sarah M., Adventure Traveler</div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="login-form-container">
          <div className="form-header">
            <h2>Sign In to Your Account</h2>
            <p className="subtitle">Enter your credentials to continue your adventure</p>
          </div>

          {showSuccess && (
            <div className="alert alert-success">
              <Check size={18} />
              <span>{successMessage === 'registered' 
                ? 'Account created successfully! Please sign in.' 
                : successMessage}</span>
              <button 
                className="close-alert"
                onClick={() => setShowSuccess(false)}
              >
                ×
              </button>
            </div>
          )}

          {errors.submit && (
            <div className="alert alert-danger">
              <AlertCircle size={18} />
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Demo Accounts (for testing) */}
          <div className="demo-accounts">
            <p className="demo-label">Quick Login (Demo):</p>
            <div className="demo-buttons">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  className="demo-btn"
                  onClick={() => fillDemoAccount(account)}
                >
                  {account.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <div className="input-with-icon">
                <Mail size={20} />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <div className="input-with-icon password-input">
                <Lock size={20} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkbox-custom"></span>
                <span>Remember me</span>
              </label>
              
              <button 
                type="button" 
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit" 
              className="btn primary full login-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button 
                type="button" 
                className="social-btn google"
                onClick={() => handleSocialLogin('google')}
              >
                <span className="google-icon">G</span>
                <span>Google</span>
              </button>
              
              <button 
                type="button" 
                className="social-btn facebook"
                onClick={() => handleSocialLogin('facebook')}
              >
                <Facebook size={20} />
                <span>Facebook</span>
              </button>
            </div>
          </form>

          <div className="switch-auth">
            <p>
              New to WalvisBay Tours?{" "}
              <Link to="/client/signup" className="signup-link">
                Create an account
              </Link>
            </p>
            
            <div className="security-info">
              <div className="security-item">
                <Shield size={14} />
                <span>256-bit SSL encryption</span>
              </div>
              <div className="security-item">
                <Shield size={14} />
                <span>Secure login</span>
              </div>
            </div>
          </div>
          
          <div className="additional-info">
            <p className="info-note">
              <AlertCircle size={14} />
              Need help? <Link to="/client/support">Contact Support</Link> or call +264 81 266 4189
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}