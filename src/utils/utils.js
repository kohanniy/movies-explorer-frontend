export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const setMovies = (searchMovies) => {
  localStorage.setItem('searchMovies', JSON.stringify(searchMovies));
};

export const getMovies = () => {
  return localStorage.getItem('searchMovies');
};

export const removeMovies = () => {
  localStorage.removeItem('searchMovies');
};

export const parseResponseFromServer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const getTimeFromMin = (min) => {
    const hours = Math.trunc(min/60);
    let minutes = min % 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
};


