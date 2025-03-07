import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'http://192.168.1.5:5000/api';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
    const login = async (email, password) => {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password
        });
      
        const { token, user } = response.data;
      
   
        if (token) {
          await AsyncStorage.setItem('token', token);
          setToken(token);
        }
      
        if (user && user._id) {
          await AsyncStorage.setItem('userId', user._id.toString());
          setUser(user);
        }
      
        return response.data;
      } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
      }
    };
     

  const signup = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password
      });
      const { token, user } = response.data;
      await AsyncStorage.setItem('token', token);
      setToken(token);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
