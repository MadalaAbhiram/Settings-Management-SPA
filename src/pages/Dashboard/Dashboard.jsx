import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import AdminDashboard from './AdminDashboard.jsx';

const Dashboard = () => {
  const { state } = useContext(SettingsContext);
  
  // Redirect to login if not authenticated
  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // Show admin or user dashboard based on role
  // Regular users go directly to settings, admins see user management
    // Regular users go directly to settings
  if (state.currentUser.isAdmin === false) {
    return <Navigate to="/expenses" replace />;
  }
  
  // Admin sees user management dashboard
  if (state.currentUser.isAdmin === true) {
    return <AdminDashboard />;
  }
  
  // Fallback: if isAdmin is undefined, redirect to settings
  return <Navigate to="/settings/general" replace />;}
export default Dashboard;
