const SESSION_KEY = 'adminSession';
const SESSION_DURATION_MS = 1000 * 60 * 120;
const SESSION_REFRESH_THRESHOLD_MS = 1000 * 60 * 10;

export const setSession = (user) => {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const sessionData = {
    uid: user.uid,
    email: user.email,
    expiresAt,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const getSession = () => {
  const sessionRaw = localStorage.getItem(SESSION_KEY);
  if (!sessionRaw) return null;

  try {
    const session = JSON.parse(sessionRaw);
    return session;
  } catch (error) {
    return null;
  }
};

export const isSessionValid = () => {
  const session = getSession();
  if (!session) return false;

  return session.expiresAt > Date.now();
};

export const removeSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getTimeUntilExpiry = () => {
  const session = getSession();
  if (!session) return 0;
  return Math.max(session.expiresAt - Date.now(), 0);
};

export const formatTimeRemaining = (milliseconds) => {
  const totalMinutes = Math.floor(milliseconds / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
};

export const refreshSession = () => {
  const session = getSession();
  if (!session) return;

  const refreshed = {
    ...session,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(refreshed));
};

export const refreshSessionIfNeeded = (threshold = SESSION_REFRESH_THRESHOLD_MS) => {
  const session = getSession();
  if (!session) return false;

  const timeLeft = session.expiresAt - Date.now();
  if (timeLeft > threshold) {
    return false;
  }

  refreshSession();
  return true;
};
