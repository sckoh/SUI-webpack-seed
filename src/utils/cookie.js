import { getLocalStorageKey } from './localStorage';

let cookies;

export const getCookie = (name, c, C, i) => {
  const key = getLocalStorageKey(name);
  if (cookies) { return cookies[key]; }

  c = document.cookie.split('; ');
  cookies = {};

  for (i = c.length - 1; i >= 0; i--) {
    C = c[i].split('=');
    cookies[C[0]] = C[1];
  }
  return cookies[key];
};

export const setCookie = (name, value, exdays = 10) => {
  const key = getLocalStorageKey(name);
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toGMTString()};`;
  document.cookie = `${key}=${value}; ${expires}`;
};

export const removeCookie = (name) => {
  const key = getLocalStorageKey(name);
  document.cookie = `${key}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
