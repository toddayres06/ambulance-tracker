import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import 'leaflet/dist/leaflet.css';

import { AuthProvider } from './context/AuthContext';
import { ROLES } from './constants/roles';

import { Toaster } from 'react-hot-toast';
import Contacts from './pages/Contacts';
import DebugToken from './components/DebugToken';
import Layout from './Layout.jsx';
import Units from './pages/Units.jsx';
import UnitDetail from './pages/UnitDetail.jsx';
import MapView from './pages/MapView.jsx';
import MapOverview from './pages/MapOverview.jsx';
import UnitTracker from './pages/UnitTracker.jsx';
import Dispatcher from './pages/Dispatcher.jsx';
import LoginForm from './pages/LoginForm';
import DispatcherDashboard from './pages/DispatcherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EMTDashboard from './pages/EMTDashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound.jsx';
import ShiftTypes from './pages/ShiftTypes.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 🔁 Redirect root to login
      { index: true, element: <Navigate to="/login" replace /> },

      // 🔓 Public Routes
      { path: 'login', element: <LoginForm /> },
      { path: 'unauthorized', element: <div>You are not authorized to view this page.</div> },

      {
        path: 'admin',
        element: <PrivateRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'shift-templates', element: <ShiftTypes /> },
          { path: 'contacts', element: <Contacts /> },
          { path: 'map-overview', element: <MapOverview /> },
          { path: 'weekly-schedules', element: <div>Weekly Schedule Placeholder</div> }, // Add your actual component
          { path: 'units', element: <Units /> },
        ],
      },
      
      {
        path: 'emt',
        element: <PrivateRoute allowedRoles={[ROLES.EMT]} />,
        children: [
          { index: true, element: <EMTDashboard /> }, // ← this is /emt
        ],
      },

      {
        path: 'dispatcher',
        element: <PrivateRoute allowedRoles={[ROLES.DISPATCHER]} />,
        children: [
          { index: true, element: <DispatcherDashboard /> }, // ← this is /dispatcher
          { path: 'control-panel', element: <Dispatcher /> }, // ← this is /dispatcher/control-panel
          { path: 'map-overview', element: <MapOverview /> }, // ← this is /dispatcher/map-overview
          { path: 'units', element: <Units /> }, // ← this is /dispatcher/units
        ],
      },

      // ✅ Optional additional internal tools (can protect these too if needed)
      { path: 'units', element: <Units /> },
      { path: 'unit/:id', element: <UnitDetail /> },
      { path: 'live-map', element: <MapView /> },
      { path: 'map-overview', element: <MapOverview /> },
      { path: 'track', element: <UnitTracker /> },
      { path: 'dispatcher', element: <Dispatcher /> },

      { path: '/debug-token', element: <DebugToken /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </React.StrictMode>
);
