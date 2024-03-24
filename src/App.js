import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Adjust the import path based on your project structure
import DashboardPage from './pages/DashboardPage'; // Adjust the import path based on your project structure
import ProjectsPage from './pages/ProjectsPage'; // Adjust the import path based on your project structure
import ReportPage from './pages/ReportPage'; // Adjust the import path based on your project structure
import DataEntryPage from './pages/DataEntryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for the login page, using the `element` prop */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protect dashboard and other routes, navigating to login if not authenticated */}
        {/* Use the `element` prop for conditional rendering */}
        <Route path="/dashboard" element={true ? <DashboardPage /> : <Navigate to="/login" />} />

        <Route path="/projects" element={true ? <ProjectsPage /> : <Navigate to="/login" />} />

        <Route path="/dataEntry" element={true ? <DataEntryPage /> : <Navigate to="/login" />} />


        <Route path="/reports" element={true ? <ReportPage /> : <Navigate to="/login" />} />

        {/* Navigate to the dashboard or another entry page as the default route */}
        {/* Use the `element` prop directly */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Fallback route for unmatched paths, could lead to a 404 page */}
        {/* Use the `element` prop directly */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

