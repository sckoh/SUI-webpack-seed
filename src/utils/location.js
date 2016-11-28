export const go = (url) => {
  window.location.href = url;
};

export const replace = (url) => {
  window.location.replace(url);
};

export const back = () => {
  window.history.back();
};
