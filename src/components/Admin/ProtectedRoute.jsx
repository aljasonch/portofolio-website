import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { isSessionValid, removeSession, refreshSession } from '../../utils/sessionManager';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: loading, true: authenticated, false: not authenticated

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isSessionValid()) {
        // Refresh session if user is authenticated and session is valid
        refreshSession();
        setIsAuthenticated(true);
      } else {
        // Remove invalid session
        removeSession();
        setIsAuthenticated(false);
      }
    });

    // Check session validity on component mount
    if (!isSessionValid()) {
      removeSession();
      setIsAuthenticated(false);
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    // Optional: Add a loading spinner or message here
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl text-white poppins-medium">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
