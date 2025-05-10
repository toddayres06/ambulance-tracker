import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();  // Get user from context

  console.log('User role in PrivateRoute:', user?.role);  // Log the user role
  console.log('Allowed roles:', allowedRoles);  // Log the allowed roles

  if (user === null) {
    // We don't know the user yet (still loading from token)
    return <div>Loading...</div>;
  }
  
  if (!user) {
    console.log('No user, redirecting to login');  // Log if user is not authenticated
    return <Navigate to="/login" />;  // Redirect to login if no user
  }

  if (!allowedRoles.includes(user.role)) {
    console.log('Role not allowed, redirecting to unauthorized page');  // Log if role is not allowed
    return <Navigate to="/unauthorized" />;  // Redirect if user role is not allowed
  }

  return <Outlet />  // If authenticated and authorized, render children (protected content)
};

export default PrivateRoute;
