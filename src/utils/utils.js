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
  return JSON.parse(localStorage.getItem('searchMovies'));
};

export const removeMovies = () => {
  localStorage.removeItem('searchMovies');
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

export const setStoredMovies = (savedMovies) => {
  localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
};

export const getStoredMovies = () => {
  return JSON.parse(localStorage.getItem('savedMovies'));
};

export const removeStoredMovies = () => {
  localStorage.removeItem('savedMovies');
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

export const stopPropagation = (e) => {
  e.stopPropagation();
};


