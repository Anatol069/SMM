import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if token exists and validate it
        if (token) {
            validateToken();
        } else {
            setLoading(false);
        }
    }, []);

    const validateToken = async () => {
        try {
            const response = await authAPI.getProfile();
            setUser(response.data);
            setLoading(false);
        } catch (err) {
            localStorage.removeItem('authToken');
            setToken(null);
            setUser(null);
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await authAPI.login({ email, password });
            const { token: newToken, user: userData } = response.data;

            localStorage.setItem('authToken', newToken);
            setToken(newToken);
            setUser(userData);

            return userData;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            setError(errorMessage);
            throw err;
        }
    };

    const register = async (name, email, password, username) => {
        try {
            setError(null);
            const response = await authAPI.register({ name, email, password, username });
            const { token: newToken, user: userData } = response.data;

            localStorage.setItem('authToken', newToken);
            setToken(newToken);
            setUser(userData);

            return userData;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setError(null);
    };

    const updateProfile = async (data) => {
        try {
            setError(null);
            const response = await authAPI.updateProfile(data);
            setUser(response.data);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Update failed';
            setError(errorMessage);
            throw err;
        }
    };

    const value = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!token && !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
