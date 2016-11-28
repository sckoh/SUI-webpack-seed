import { handleAuthError } from 'auth/auth';
import { assign } from './object';

export const ajax = (options) => {
  const ajaxOptions = assign({}, options);
  ajaxOptions.error = (xhr, errorType, error) => {
    if (options.error) {
      options.error(xhr, errorType, error);
    }
    if (xhr.status === 401) {
      handleAuthError();
    }
  };
  return $.ajax(ajaxOptions);
};
