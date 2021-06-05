export const setToken = (token) => {
  localStorage.setItem('token', token);
}

export const getToken = () => {
  return localStorage.getItem('token');
}

export const removeToken = () => {
  localStorage.removeItem('token');
}

export const parseResponseFromServer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}
