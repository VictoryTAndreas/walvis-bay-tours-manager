import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check, User, Mail, Phone, Lock, Calendar, Globe, MapPin, Shield } from "lucide-react";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    dateOfBirth: "",
    emergencyContact: "",
    emergencyPhone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    preferences: {
      newsletter: true,
      specialOffers: true,
      smsUpdates: false
    }
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: checked
        }
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!form.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    }
    
    if (step === 2) {
      if (!form.password) newErrors.password = "Password is required";
      else if (form.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    
    try {
      // 🔗 TODO: Replace with API call
      console.log("Registering client:", form);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - redirect to login
      navigate("/client/login?success=registered&email=" + encodeURIComponent(form.email));
      
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = () => {
    if (!form.password) return 0;
    let strength = 0;
    if (form.password.length >= 8) strength += 25;
    if (/[A-Z]/.test(form.password)) strength += 25;
    if (/[0-9]/.test(form.password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(form.password)) strength += 25;
    return strength;
  };

  const strength = passwordStrength();
  const getStrengthColor = () => {
    if (strength < 50) return "#ef4444";
    if (strength < 75) return "#f59e0b";
    return "#10b981";
  };

  return (
    <div className="signup-page">
      {/* Background decoration */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="signup-container">
        {/* Left side - Welcome & Features */}
        <div className="signup-welcome">
          <Link to="/" className="back-home">
            ← Back to Home
          </Link>
          
          <div className="welcome-content">
            <div className="logo">
              <span className="logo-icon">🌊</span>
              <h2>WalvisBay Tours</h2>
            </div>
            
            <h1>Start Your Adventure Journey</h1>
            <p className="welcome-text">
              Join our community of travelers and unlock exclusive benefits for 
              your Walvis Bay adventures.
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <Shield size={20} />
                <span>Secure & encrypted registration</span>
              </div>
              <div className="feature-item">
                <Check size={20} />
                <span>Exclusive member discounts</span>
              </div>
              <div className="feature-item">
                <Calendar size={20} />
                <span>Easy booking & management</span>
              </div>
              <div className="feature-item">
                <Globe size={20} />
                <span>Personalized tour recommendations</span>
              </div>
            </div>
            
            <div className="stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Happy Travelers</p>
              </div>
              <div className="stat">
                <h3>98%</h3>
                <p>Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="signup-form-container">
          <div className="form-header">
            <h2>Create Your Account</h2>
            <p className="subtitle">Join our adventure community in a few simple steps</p>
            
            {/* Progress Steps */}
            <div className="progress-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <span>Personal Info</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <span>Account Security</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step === 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <span>Preferences</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            {errors.submit && (
              <div className="alert alert-danger">
                {errors.submit}
              </div>
            )}

            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="form-step">
                <div className="input-group">
                  <div className="input-with-icon">
                    <User size={20} />
                    <input
                      name="firstName"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                    />
                  </div>
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="input-group">
                  <div className="input-with-icon">
                    <User size={20} />
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                    />
                  </div>
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>

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

                <div className="row">
                  <div className="input-group">
                    <div className="input-with-icon">
                      <Phone size={20} />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                      />
                    </div>
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="input-group">
                    <div className="input-with-icon">
                      <Calendar size={20} />
                      <input
                        name="dateOfBirth"
                        type="date"
                        placeholder="Date of Birth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        className={errors.dateOfBirth ? 'error' : ''}
                      />
                    </div>
                    {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                  </div>
                </div>

                <div className="input-group">
                  <div className="input-with-icon">
                    <Globe size={20} />
                    <select
                      name="nationality"
                      value={form.nationality}
                      onChange={handleChange}
                    >
                      <option value="">Select Nationality</option>
                      <option value="Namibian">Namibian</option>
                      <option value="South African">South African</option>
                      <option value="Zimbabwean">Zimbabwean</option>
                      <option value="Botswanan">Botswanan</option>
                      <option value="American">American</option>
                      <option value="British">British</option>
                      <option value="German">German</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <button type="button" className="btn primary full next-btn" onClick={nextStep}>
                  Continue to Security <span className="btn-icon">→</span>
                </button>
              </div>
            )}

            {/* Step 2: Account Security */}
            {step === 2 && (
              <div className="form-step">
                <div className="input-group">
                  <div className="input-with-icon password-input">
                    <Lock size={20} />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create Password"
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
                  
                  {/* Password Strength Indicator */}
                  {form.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill" 
                          style={{ 
                            width: `${strength}%`,
                            backgroundColor: getStrengthColor()
                          }}
                        ></div>
                      </div>
                      <div className="strength-text">
                        Password strength: 
                        <span style={{ color: getStrengthColor() }}>
                          {strength < 50 ? ' Weak' : strength < 75 ? ' Fair' : ' Strong'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="input-group">
                  <div className="input-with-icon password-input">
                    <Lock size={20} />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="password-requirements">
                  <h4>Password Requirements:</h4>
                  <ul>
                    <li className={form.password.length >= 8 ? 'met' : ''}>
                      <Check size={14} /> At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(form.password) ? 'met' : ''}>
                      <Check size={14} /> One uppercase letter
                    </li>
                    <li className={/[0-9]/.test(form.password) ? 'met' : ''}>
                      <Check size={14} /> One number
                    </li>
                    <li className={/[^A-Za-z0-9]/.test(form.password) ? 'met' : ''}>
                      <Check size={14} /> One special character
                    </li>
                  </ul>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn outline" onClick={prevStep}>
                    ← Back
                  </button>
                  <button type="button" className="btn primary" onClick={nextStep}>
                    Continue to Preferences →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Preferences & Emergency Contact */}
            {step === 3 && (
              <div className="form-step">
                <div className="emergency-contact">
                  <h4>Emergency Contact</h4>
                  <div className="row">
                    <div className="input-group">
                      <input
                        name="emergencyContact"
                        placeholder="Contact Name"
                        value={form.emergencyContact}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group">
                      <div className="input-with-icon">
                        <Phone size={20} />
                        <input
                          name="emergencyPhone"
                          type="tel"
                          placeholder="Contact Phone"
                          value={form.emergencyPhone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="preferences">
                  <h4>Communication Preferences</h4>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="preferences.newsletter"
                        checked={form.preferences.newsletter}
                        onChange={handleChange}
                      />
                      <span className="checkbox-custom"></span>
                      <span>Receive newsletter & updates</span>
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="preferences.specialOffers"
                        checked={form.preferences.specialOffers}
                        onChange={handleChange}
                      />
                      <span className="checkbox-custom"></span>
                      <span>Special offers & discounts</span>
                    </label>
                    
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="preferences.smsUpdates"
                        checked={form.preferences.smsUpdates}
                        onChange={handleChange}
                      />
                      <span className="checkbox-custom"></span>
                      <span>SMS updates for bookings</span>
                    </label>
                  </div>
                </div>

                <div className="terms-agreement">
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span className="checkbox-custom"></span>
                    <span>
                      I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                    </span>
                  </label>
                </div>

                <div className="form-actions final">
                  <button type="button" className="btn outline" onClick={prevStep}>
                    ← Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Creating Account...
                      </>
                    ) : (
                      'Create My Account'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="switch-auth">
            <p>
              Already have an account?{" "}
              <Link to="/client/login" className="login-link">
                Sign in here
              </Link>
            </p>
            <p className="security-note">
              <Shield size={14} /> Your information is protected with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}