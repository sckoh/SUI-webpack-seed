import { domain } from '../config/configureConfig';

export const getQueryString = (field, url) => {
  const href = url || window.location.href;
  const reg = new RegExp(`[?&]${field}=([^&#]*)`, 'i');
  const string = reg.exec(href);
  return string ? string[1] : null;
};

export function getUrl(url) {
  return domain + url;
}
