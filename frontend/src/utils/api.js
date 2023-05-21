class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка => ${res.status}`);
  }

  _request(url, config) {
    return fetch(`${this._baseUrl}${url}`, config).then((res) => this._checkResult(res));
  }

  getInitialCards() {
    return this._request('/cards', {headers: this._headers, credentials: "include"});
  }

  getUserInfo() {
    return this._request('/users/me', {headers: this._headers, credentials: "include", method: 'GET'});
  }

  setUserInfo(name, about) {
    return this._request('/users/me', {
      headers: this._headers,
      credentials: "include",
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  setCard(name, link) {
    return this._request('/cards', {
      headers: this._headers,
      credentials: "include",
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  setLike(_id) {
    return this._request(`/cards/${_id}/likes`, {
      headers: this._headers,
      credentials: "include",
      method: 'PUT',
    });
  }

  delLike(_id) {
    return this._request(`/cards/${_id}/likes`, {
      headers: this._headers,
      credentials: "include",
      method: 'DELETE',
    });
  }

  delCard(_id) {
    return this._request(`/cards/${_id}`, {
      headers: this._headers,
      credentials: "include",
      method: 'DELETE',
    });
  }

  setAvatar(avatar) {
    return this._request(`/users/me/avatar`, {
      headers: this._headers,
      credentials: "include",
      method: 'PATCH',
      body: JSON.stringify({
        avatar,
      }),
    });
  }
}

const MyApi = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default MyApi;
