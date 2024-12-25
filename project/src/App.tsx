import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import CommunicationList from './components/communications/CommunicationList';
import CalendarView from './components/calendar/CalendarView';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<AdminDashboard />} />
          <Route path="communications" element={<CommunicationList />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;