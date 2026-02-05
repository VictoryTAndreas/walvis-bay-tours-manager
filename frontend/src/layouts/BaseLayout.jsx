import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import "../assets/admin.css";

export default function BaseLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth < 768;
  });

  const location = useLocation();

  // Pages where sidebar should be hidden
  const noSidebarPaths = [
    "/packages",
    "/package-details",
    "/popular-package",
    "/Home",
    "/client/login",
    "/client/signup",
    "/client/bookings",
    "/client/dashboard",
    "/client/payments",
    "/client/reviews",
    "/client/settings",
    "/client/support",
    "/client/wishlist",
    "/client/packages",
    "/payment"
  ];

  // Pages where top navbar should be hidden
  const noNavbarPaths = [
    "/packages",
    "/package-details",
    "/popular-package",
    "/Home",
    "/client/login",
    "/client/signup",
    "/client/bookings",
    "/client/dashboard",
    "/client/payments",
    "/client/reviews",
    "/client/settings",
    "/client/support",
    "/client/wishlist",
    "/client/packages",
    "/payment"
  ];

  const hideSidebar = noSidebarPaths.some(
    path =>
      location.pathname === path ||
      location.pathname.startsWith(path)
  );

  const hideNavbar = noNavbarPaths.some(
    path =>
      location.pathname === path ||
      location.pathname.startsWith(path)
  );

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setSidebarMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarMobileOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSidebarMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!isNarrow) {
      setSidebarMobileOpen(false);
      setSidebarCollapsed(true);
    } else {
      setSidebarMobileOpen(false);
    }
  }, [isNarrow]);

  const toggleSidebar = useCallback(() => {
    if (isNarrow) setSidebarMobileOpen((s) => !s);
    else setSidebarCollapsed((c) => !c);
  }, [isNarrow]);

  const userName = localStorage.getItem("userName") || "Admin";

  return (
    <div className="app-wrapper d-flex">
      {/* DESKTOP SIDEBAR */}
      {!hideSidebar && (
        <nav className="d-none d-md-block" aria-label="Primary">
          <SideNav toggled={sidebarCollapsed} />
        </nav>
      )}

      {/* MOBILE SIDEBAR */}
      {!hideSidebar && (
        <div className="d-md-none" role="navigation" aria-label="Primary">
          <div
            className={`mobile-overlay ${sidebarMobileOpen ? "show" : ""}`}
            onClick={() => setSidebarMobileOpen(false)}
            aria-hidden={!sidebarMobileOpen}
          />
          <div
            className={`mobile-sidebar ${sidebarMobileOpen ? "show" : ""}`}
            id="mobileSidebar"
            aria-hidden={!sidebarMobileOpen}
          >
            <SideNav
              toggled={false}
              onItemClick={() => setSidebarMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="app-content flex-grow-1 d-flex flex-column">
        {/* TOP NAV — HIDDEN ON CLIENT PAGES */}
        {!hideNavbar && (
          <TopNav
            userName={userName}
            onToggleSidebar={toggleSidebar}
            onLogout={() => window.location.assign("/logout")}
          />
        )}

        <main className="p-3 flex-grow-1 scrollable">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
