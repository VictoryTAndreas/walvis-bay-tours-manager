import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLoader } from "../../context/LoaderContext";
import "../../assets/main.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { setLoading } = useLoader(); 

  const qs = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const success = qs.get("success");
  const urlError = qs.get("error");

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState(urlError || "");
  const [justRegistered, setJustRegistered] = useState(success === "registered");

  useEffect(() => {
    if (justRegistered) {
      const t = setTimeout(() => setJustRegistered(false), 4000);
      return () => clearTimeout(t);
    }
  }, [justRegistered]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const start = Date.now();
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      const elapsed = Date.now() - start;
      const minDuration = 1000;
      setTimeout(() => setLoading(false), Math.max(0, minDuration - elapsed));
    }
  };

  return (
    <div className="admin-login-page">
      <div className="background" aria-hidden="true" />

      <div className="container">
        <div className="content">
          {justRegistered && (
            <div id="popup-message" className="popup-success" role="status" aria-live="polite">
              🎉 Registration successful! You can now log in.
            </div>
          )}

          {/* Logo Section */}
          <div className="logo-section">
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

            {/* Company Name */}
            <h3 className="company-name">Walvis Bay Tours</h3>

            {/* Admin Portal Text */}
            <h2 className="logo">
              <i className="fas fa-key" aria-hidden /> Admin Portal
            </h2>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
        </div>

        <div className="logreg-box">
          <div className="form-container active">
            <div className="form-box">
              <form className="user" style={{ marginTop: "2rem" }} onSubmit={onSubmit} noValidate>
                <h2>Welcome Back!</h2>

                <div className="input-box mt-5">
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    required
                    placeholder=" "
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                    aria-describedby="email-label"
                    autoFocus
                  />
                  <label id="email-label" htmlFor="email-input">
                    Email
                  </label>
                  <i className="icon fas fa-envelope" aria-hidden />
                </div>

                <div className="input-box mt-5">
                  <input
                    type={showPwd ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    placeholder=" "
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    autoComplete="current-password"
                    aria-describedby="password-label"
                  />
                  <label id="password-label" htmlFor="password">
                    Password
                  </label>

                  <i
                    className={`icon-right fas ${showPwd ? "fa-eye" : "fa-eye-slash"} password-toggle`}
                    id="show-password"
                    role="button"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                    onClick={() => setShowPwd((s) => !s)}
                  />
                  <i className="icon fas fa-lock" aria-hidden />
                </div>

                <button type="submit" className="btn1 mt-5">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Logo & Animation CSS */}
      <style jsx>{`
        .logo-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-animation {
          display: inline-block;
          animation: bounce 2s infinite;
          position: relative;
        }

        .logo-img {
          height: 80px;
          width: auto;
          max-width: 200px;
          object-fit: contain;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          padding: 8px;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
          transition: transform 0.3s ease;
        }

        .logo-fallback {
          display: none;
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border-radius: 50%;
          background: linear-gradient(135deg, #4a6cf7, #6a11cb);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          box-shadow: 0 8px 25px rgba(74, 108, 247, 0.4);
          border: 4px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% { transform: translateY(-15px); }
          60% { transform: translateY(-8px); }
        }

        .company-name {
          font-size: 1.2rem;
          color: #477da8;
          margin: 0.5rem 0;
          letter-spacing: 1px;
          text-shadow: 0 2px 4px rgba(13, 42, 204, 0.3);
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 2rem;
          color: #1d86e9;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .logo i {
          color: #152252;
          font-size: 1.8rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
        }

        @media (max-width: 768px) {
          .logo-img { height: 60px; }
          .logo-fallback { width: 60px; height: 60px; font-size: 2rem; }
          .company-name { font-size: 1rem; }
          .logo { font-size: 1.6rem; }
          .logo i { width: 40px; height: 40px; font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
}
