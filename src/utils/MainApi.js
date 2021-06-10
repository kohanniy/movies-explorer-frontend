import { parseResponseFromServer } from '../utils/utils';
import { BEATFILM_URL, IMAGE_URL } from '../utils/constants';

class MainApi {
  constructor({ url, parseResponseFromServer }) {
    this._url = url;
    this._parseResponseFromServer = parseResponseFromServer;
  }

  register(email, password, name) {
    return fetch (`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    })
    .then(this._parseResponseFromServer)
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(this._parseResponseFromServer)
  }

  updateUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this._parseResponseFromServer)
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._parseResponseFromServer)
  }

  getSavedMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._parseResponseFromServer)
  }

  getDataForRendered(token) {
    return Promise.allSettled([ this.getUserInfo(token), this.getSavedMovies(token) ])
  }

  // В данных одного из фильмов, приходящих с API Beat-Film, у image значение null,
  // из-за этого мое API его не пускает.
  // Поэтому я поставил левую ссылку на картинку для такого случая
  saveMovie(movieData, token) {
    const {
      country,
      director,
      duration,
      year,
      description,
      nameRU,
      nameEN,
    } = movieData;
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: movieData.image === null ? IMAGE_URL : `${BEATFILM_URL}${movieData.image.url}`,
        trailer: movieData.trailerLink,
        thumbnail: movieData.image === null ? IMAGE_URL : `${BEATFILM_URL}${movieData.image.formats.thumbnail.url}`,
        movieId: movieData.id,
        nameRU,
        nameEN,
      })
    })
    .then(this._parseResponseFromServer)
  }

  removeMovie(id, token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(this._parseResponseFromServer)
  }
}

const mainApi = new MainApi({
  url: `https://api.mov-exp.kohanniy.nomoredomains.club`,
  parseResponseFromServer
});

export default mainApi;
