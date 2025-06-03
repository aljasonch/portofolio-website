// Session Management Utility
export const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export const setSession = (user) => {
  const sessionData = {
    user: {
      uid: user.uid,
      email: user.email,
    },
    loginTime: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION,
  };
  
  localStorage.setItem('adminSession', JSON.stringify(sessionData));
  return sessionData;
};

export const getSession = () => {
  try {
    const sessionData = localStorage.getItem('adminSession');
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    
    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      removeSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    removeSession();
    return null;
  }
};

export const removeSession = () => {
  localStorage.removeItem('adminSession');
};

export const refreshSession = () => {
  const session = getSession();
  if (session) {
    session.expiresAt = Date.now() + SESSION_DURATION;
    localStorage.setItem('adminSession', JSON.stringify(session));
    return session;
  }
  return null;
};

export const isSessionValid = () => {
  const session = getSession();
  return session !== null;
};

export const getTimeUntilExpiry = () => {
  const session = getSession();
  if (!session) return 0;
  
  const timeLeft = session.expiresAt - Date.now();
  return Math.max(0, timeLeft);
};

export const formatTimeRemaining = (timeMs) => {
  if (timeMs <= 0) return 'Expired';
  
  const hours = Math.floor(timeMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};
