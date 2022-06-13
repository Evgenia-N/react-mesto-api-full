class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка: ${res.status, res.statusText}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._checkResponse);
  }

  editProfilePic(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
} 

export default new Api ({
  url: 'http://localhost:3001',
  headers: { 
    'content-type': "application/json"
  }
})