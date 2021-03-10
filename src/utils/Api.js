const errorHandler = (err) => console.log(`Error: ${err}`);
const responseHandler = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
};

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // fetch data about the user from server
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(responseHandler)
      .catch(errorHandler);
  }

  // fetch cards from the server
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(responseHandler)
      .catch(errorHandler);
  }

  // edit and update the profile info
  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(responseHandler)
      .catch(errorHandler);
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-9",
  headers: {
    authorization: "725aa50b-4ab9-470e-b33c-66625663866d",
    "Content-Type": "application/json",
  },
});

export default api;
