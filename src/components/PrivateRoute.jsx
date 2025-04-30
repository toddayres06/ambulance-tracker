// /components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />; // Proceed to protected route
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
