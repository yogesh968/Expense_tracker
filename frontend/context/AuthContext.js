import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  loading: true,
  serverStatus: 'checking'
});

// Using the host IP detected from the bundler environment for maximum connectivity
const API_URL = 'http://11.6.2.199:5001/api'; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState('checking');

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        // Simple health check
        const r = await fetch(`${API_URL}/login`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}) 
        });
        setServerStatus(r.status === 400 || r.status === 401 ? 'online' : 'offline');
      } catch (e) {
        setServerStatus('offline');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const resp = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (data.success) {
        setUser(data.user);
        await AsyncStorage.setItem('@user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
       console.error('Login Error:', error);
       return { success: false, error: 'Authorization Service Connection Refused' };
    }
  }, []);

  const signup = useCallback(async (email, password, name) => {
    try {
      const resp = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await resp.json();
      if (data.success) {
        setUser(data.user);
        await AsyncStorage.setItem('@user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (error) {
       console.error('Signup Error:', error);
       return { success: false, error: 'Registration Service Connection Refused' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
       setUser(null);
       await AsyncStorage.removeItem('@user');
    } catch (e) {}
  }, []);

  const value = useMemo(() => ({
    user, login, signup, logout, loading, serverStatus
  }), [user, login, signup, logout, loading, serverStatus]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
