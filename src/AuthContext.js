// src/AuthContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

// Action types
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAIL = 'AUTH_FAIL';
const LOGOUT = 'LOGOUT';

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload.error,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = async (username, passcode) => {
    try {
      // Simulate API call for login
      // Replace with actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, passcode }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          user: data.user,
          token: data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
        payload: {
          error: error.message,
        },
      });
    }
  };

  const logout = () => {
    // Simulate logout action (clear token, user data)
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
