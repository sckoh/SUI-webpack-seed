const storagePrefix = 'ifast-';

export function setItem(key, value = '') {
  if (!key) {
    return;
  }
  window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
}

export function getItem(key) {
  if (!key) {
    return;
  }
  const value = window.localStorage.getItem(`${storagePrefix}${key}`);
  if (value && value !== 'undefined') {
    return JSON.parse(value);
  }
}

export function removeItem(key) {
  if (!key) {
    return;
  }
  return window.localStorage.removeItem(`${storagePrefix}${key}`);
}
