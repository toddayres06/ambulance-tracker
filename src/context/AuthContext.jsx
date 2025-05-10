// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Create AuthContext
export const AuthContext = createContext();

// Export the `useAuth` hook so it can be used in other components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, role: decoded.role.toLowerCase() });
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:3001/api/auth/login', {
      email,
      password,
    });

    const token = res.data.token;
    localStorage.setItem('token', token);

    const decoded = jwtDecode(token);
    setUser({ ...decoded });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
