import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AUTH_CREDS } from '../components/login/login.constants';


export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
}

export const initalValue = {
  authState: {
    accessToken: sessionStorage.getItem(AUTH_CREDS.ACCESS_TOKEN),
    refreshToken: sessionStorage.getItem(AUTH_CREDS.REFRESH_TOKEN),
    expiresAt: sessionStorage.getItem(AUTH_CREDS.EXPIRES_AT),
    isAuthenticated: false,
  },
  setAuthState: () => null
}

const AuthContext = createContext<AuthContextType>(initalValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initalValue.authState);
  
  useEffect(() => {
    const accessToken = sessionStorage.getItem(AUTH_CREDS.ACCESS_TOKEN);
    const refreshToken = sessionStorage.getItem(AUTH_CREDS.REFRESH_TOKEN);
    const expiresAt = sessionStorage.getItem(AUTH_CREDS.EXPIRES_AT);
    if (accessToken && refreshToken && expiresAt) {
      setAuthState({ accessToken, refreshToken, expiresAt, isAuthenticated: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;