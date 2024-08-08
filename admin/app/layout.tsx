'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store/slices/store';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminId');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {!isAuthenticated ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <Dashboard>{children}</Dashboard>
          )}
        </Provider>
      </body>
    </html>
  );
}
