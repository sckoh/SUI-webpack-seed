import * as localStorage from 'utils/localStorage';

export const handleAuthError = () => {
  // handle auth error logic
};

export const getAccessToken = () => localStorage.getItem('accessToken');

export const handleAuth = (successCb) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    return successCb();
  }
  handleAuthError();
};

export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  return accessToken && accessToken !== 'null';
};

export const getAuth = () => `Bearer ${getAccessToken()}`;
