import { parseResponseFromServer } from '../utils/utils';

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
  };

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
        authorization: `Bearer ${token}`,
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
        authorization: `Bearer ${token}`
      }
    })
    .then(this._parseResponseFromServer)
  }

  // getInitialCards(token) {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: `Bearer ${token}`
  //     }
  //   })
  //   .then(this._parseResponseFromServer)
  // }



  // getDataForRendered(token) {
  //   return Promise.all([ this.getInitialCards(token), this.getUserInfo(token) ])
  // }

  // addCard(data, token) {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'POST',
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then(this._parseResponseFromServer)
  // }




  // setAvatar(data, token) {
  //   return fetch(`${this._url}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then(this._parseResponseFromServer)
  // }

  // deleteCard(id, token) {
  //   return fetch(`${this._url}/cards/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: `Bearer ${token}`
  //     }
  //   })
  //   .then(this._parseResponseFromServer)
  // }

  // changeLikeCardStatus(id, like, token) {
  //   return fetch(`${this._url}/cards/${id}/likes`, {
  //     method: like ? 'PUT' : 'DELETE',
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(this._parseResponseFromServer)
  // }
}

const mainApi = new MainApi({
  url: `https://api.mov-exp.kohanniy.nomoredomains.club`,
  parseResponseFromServer
});

export default mainApi;
