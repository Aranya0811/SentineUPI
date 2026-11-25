import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('sentinel_token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize and check current token
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('sentinel_token');
      if (storedToken) {
        try {
          const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          if (res.data.success) {
            setUser(res.data.user);
            setToken(storedToken);
          }
        } catch (err) {
          console.warn('Session expired or invalid, logging out:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      if (res.data.success) {
        const { token: newToken, user: userData } = res.data;
        localStorage.setItem('sentinel_token', newToken);
        setToken(newToken);
        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      // If backend is offline or static demo mode on GitHub Pages, allow instant fallback
      if (!err.response || err.code === 'ERR_NETWORK') {
        const fallbackUser = {
          id: 'usr_demo_session',
          name: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase() || 'Chief Risk Officer',
          email: email || 'analyst@sentinel.ai',
          role: 'SOC_ANALYST',
          organization: 'National Payments Defense SOC (Sandbox Mode)'
        };
        const demoToken = 'demo_jwt_token_' + Date.now();
        localStorage.setItem('sentinel_token', demoToken);
        setToken(demoToken);
        setUser(fallbackUser);
        return { success: true };
      }
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please verify credentials.'
      };
    }
  };

  const register = async (name, email, password, role = 'SOC_ANALYST') => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        role
      });
      if (res.data.success) {
        const { token: newToken, user: userData } = res.data;
        localStorage.setItem('sentinel_token', newToken);
        setToken(newToken);
        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      // Offline / Static Sandbox fallback
      if (!err.response || err.code === 'ERR_NETWORK') {
        const fallbackUser = {
          id: 'usr_' + Date.now(),
          name: name || 'Analyst Officer',
          email: email || 'analyst@sentinel.ai',
          role: role || 'SOC_ANALYST',
          organization: 'National Payments Defense SOC'
        };
        const demoToken = 'demo_jwt_token_' + Date.now();
        localStorage.setItem('sentinel_token', demoToken);
        setToken(demoToken);
        setUser(fallbackUser);
        return { success: true };
      }
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed. Try a different email.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('sentinel_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
