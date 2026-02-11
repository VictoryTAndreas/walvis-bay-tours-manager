import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import Home from "./pages/client/Home";
import ClientLogin from "./pages/client/Login";
import SignUp from "./pages/client/SignUp";
import Dashboard from "./pages/client/Dashboard";
import Payments from "./pages/client/payments";
import TravelLoader from "./components/Loading";
import Bookings from "./pages/client/Bookings";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

import GeneralManagerDashboard from "./pages/dashboard/GeneralManagerDashboard";
import SeniorTravelConsultantDashboard from "./pages/dashboard/SeniorTravelConsultantDashboard";
import CustomerServiceExecutiveDashboard from "./pages/dashboard/CustomerServiceExecutiveDashboard";
import MarketingManagerDashboard from "./pages/dashboard/MarketingManagerDashboard";

import UserManagement from "./pages/usermanagement/UserManagement";
import AdminManagement from "./pages/adminmanagement/AdminManagement";

import AdminProfile from "./pages/adminprofile/AdminProfile";
import EditProfile from "./pages/adminprofile/EditProfile";

import BaseLayout from "./layouts/BaseLayout";
import RoleBasedDashboardRedirect from "./components/RoleBasedDashboardRedirect";

import Calendar from './components/MarketingManager/Calendar';
import AdminPanel from './components/MarketingManager/AdminPanel';
import PackageDetails from './components/MarketingManager/PackageDetails';
import PaymentGateway from './components/MarketingManager/PaymentGateway';
import Reports from './components/MarketingManager/Reports';
import apiService from './api/Promotion';

import PackagesList from "./pages/client/PackagesList";

import "./App.css";
import PaymentHistory from "./components/MarketingManager/PaymentHistory";
import PopularPackage from "./components/MarketingManager/PopularPackage";
import Wishlist from "./pages/client/wishlist";
import Support from "./pages/client/support";
import Settings from "./pages/client/settings";
import Reviews from "./pages/client/reviews";


function App() {
  const [loading, setLoading] = useState(true);

  const [promotions, setPromotions] = useState([]);
  const [calendarSettings, setCalendarSettings] = useState({
    backgroundImage: '',
    backgroundOpacity: 0.3,
    backgroundBlur: 0,
    siteBackgroundImage: '',
    siteBackgroundOpacity: 0.2,
    siteBackgroundBlur: 0,
    theme: 'light'
  });

    const [payments] = useState([]);

    const fetchPromotions = async () => {
    try {
      const data = await apiService.getPromotions();
      setPromotions(data);
    } catch (err) {
      console.error('Error fetching promotions:', err);
    }
    };


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

    useEffect(() => {
    fetchPromotions();
  }, []);

    const handlePromotionsChange = (newPromotions) => {
    setPromotions(newPromotions);
  };

  const handleCalendarSettingsChange = (newSettings) => {
    setCalendarSettings(newSettings);
  };

  const activePromotions = promotions.filter(promotion => promotion.isActive);

  // Site background style
  const siteBgStyle = calendarSettings.siteBackgroundImage ? {
    backgroundImage: `url(${calendarSettings.siteBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  const siteOverlayStyle = {
    backgroundColor: `rgba(255, 255, 255, ${1 - (calendarSettings.siteBackgroundOpacity ?? 0.2)})`,
    backdropFilter: calendarSettings.siteBackgroundBlur ? `blur(${calendarSettings.siteBackgroundBlur}px)` : 'none'
  };

  if (loading) return <TravelLoader />;
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route index element={<Navigate to="/login" replace />} />

      {/* Public pages: login/logout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Route>

      {/* Protected pages: wrapped with ProtectedRoute + BaseLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <BaseLayout />
          </ProtectedRoute>
        }
      >
        {/* Dynamic redirect based on role */}
        <Route path="dashboard" element={<RoleBasedDashboardRedirect />} />

        {/* Role-based dashboards */}
        <Route
          path="dashboard/general-manager"
          element={
            <RoleRoute roles={["GENERAL_MANAGER"]}>
              <GeneralManagerDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="dashboard/senior-travel-consultant"
          element={
            <RoleRoute roles={["SENIOR_TRAVEL_CONSULTANT"]}>
              <SeniorTravelConsultantDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="dashboard/customer-service-executive"
          element={
            <RoleRoute roles={["CUSTOMER_SERVICE_EXECUTIVE"]}>
              <CustomerServiceExecutiveDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="dashboard/marketing-manager"
          element={
            <RoleRoute roles={["MARKETING_MANAGER"]}>
              <AdminPanel
                  promotions={promotions}
                  onPromotionsChange={handlePromotionsChange}
                  calendarSettings={calendarSettings}
                  onCalendarSettingsChange={handleCalendarSettingsChange}
                  payments={payments}
                  onRefreshPromotions={fetchPromotions}
              />
            </RoleRoute>
          }
        />
        
        {/* Analytics */}
        <Route
        path="/analytics"
        element={
          <RoleRoute roles={["GENERAL_MANAGER", "MARKETING_MANAGER"]}>
            <Reports />
          </RoleRoute>
        }
        />

        {/* Payments */}
        <Route
        path="/payments"
        element={
          <RoleRoute roles={["GENERAL_MANAGER", "CUSTOMER_SERVICE_EXECUTIVE"]}>
            <PaymentHistory promotions={promotions} />
          </RoleRoute>
        }
        />
        

        {/* Management */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/admins" element={<AdminManagement />} />

        {/* Profile */}
        <Route path="profile" element={<AdminProfile />} />
        <Route path="edit-profile" element={<EditProfile />} />

        <Route path="/payment" element={
              <PaymentGateway
                  promotions={promotions}
              />
            } />
        <Route path="/package-details/:packageId" element={<PackageDetails />} />
        <Route path="/popular-package" element={<PopularPackage />} />
        <Route path="/calendar" element={
              <Calendar
                  promotions={activePromotions}
                  calendarSettings={calendarSettings}
              />
        } />
        {/* Client routes */}

        <Route path="/packages" element={<PackagesList />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/signup" element={<SignUp />} />
        <Route path="/client/Dashboard" element={<Dashboard />} />
        <Route path="/client/packages" element={<PackagesList />} />
        <Route path="/client/bookings" element={<Bookings />} />
        <Route path="/client/payments" element={<Payments />} />
        <Route path="/client/wishlist" element={<Wishlist />} />
        <Route path="/client/support" element={<Support />} />
        <Route path="/client/settings" element={<Settings />} />
        <Route path="/client/reviews" element={<Reviews />} />
        


      </Route>

      <Route path="/tourpackages" element={<SeniorTravelConsultantDashboard/>} />
      <Route path="/guides" element={<SeniorTravelConsultantDashboard/>} />
      <Route path="/availability" element={<SeniorTravelConsultantDashboard/>} />   

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>

    
  );
}

export default App;
