import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SettingsLayout from '../pages/Settings/SettingsLayout';
import GeneralSettings from '../pages/Settings/GeneralSettings';
import NotificationSettings from '../pages/Settings/NotificationSettings';
import PrivacySettings from '../pages/Settings/PrivacySettings';
import Dashboard from '../pages/Dashboard/Dashboard';
import UserSettingsView from '../pages/Dashboard/UserSettingsView';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import UserExpenses from '../pages/Expenses/UserExpenses';
import AdminExpenses from '../pages/Expenses/AdminExpenses';
import Transactions from '../pages/Expenses/Transactions';
import { SettingsContext } from '../context/SettingsContext';

function AppRoutes() {
  const { state } = useContext(SettingsContext);
  const rootRedirect = state.currentUser
    ? (state.currentUser.isAdmin ? '/dashboard' : '/expenses')
    : '/login';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={rootRedirect} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<UserExpenses />} />
        <Route path="/expenses/admin" element={<AdminExpenses />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route path="/user-settings/:userId" element={<UserSettingsView />}>
          <Route path="general" element={<GeneralSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="privacy" element={<PrivacySettings />} />
          <Route index element={<Navigate to="general" replace />} />
        </Route>

        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="general" element={<GeneralSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="privacy" element={<PrivacySettings />} />
          <Route index element={<Navigate to="general" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
