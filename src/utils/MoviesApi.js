export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`чек респонс Ошибка ${res.status}`);
};

export const getMovies = () => {
  return fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("JWT")}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    });
};



// class Api {
//   constructor(option) {
//     this._baseUrl = option.baseUrl;
//     this._headers = option.headers;
//   }

//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`чек респонс Ошибка ${res.status}`);
//   }

//   // loadUserInfo() {
//   //   return fetch(`${this._baseUrl}/users/me`, {
//   //     headers: this._headers,
//   //   }).then(this._checkResponse);
//   // }

//   // postUserInfo({ name, email }) {
//   //   return fetch(`${this._baseUrl}/users/me`, {
//   //     method: "PATCH",
//   //     headers: this._headers,
//   //     body: JSON.stringify({
//   //       name: name,
//   //       email: email,
//   //     }),
//   //   }).then(this._checkResponse);
//   // }

//   // postUserAvatar(avatar_link) {
//   //   return fetch(`${this._baseUrl}/users/me/avatar`, {
//   //     method: "PATCH",
//   //     headers: this._headers,
//   //     body: JSON.stringify({
//   //       avatar: avatar_link,
//   //     }),
//   //   }).then(this._checkResponse);
//   // }

//   getMovies() {
//     return fetch(`${this._baseUrl}`, {
//       headers: this._headers,
//     }).then(this._checkResponse);
//   }

//   // postMovies(name, link) {
//   //   return fetch(`${this._baseUrl}/movies`, {
//   //     method: "POST",
//   //     headers: this._headers,
//   //     body: JSON.stringify({
//   //       name: name,
//   //       link: link,
//   //     }),
//   //   }).then(this._checkResponse);
//   // }

//   // deleteMovies(movies) {
//   //   return fetch(`${this._baseUrl}/movies/${movies._id}`, {
//   //     method: "DELETE",
//   //     headers: this._headers,
//   //   }).then(this._checkResponse);
//   // }

//   // addLike(card) {
//   //   return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
//   //     method: "PUT",
//   //     headers: this._headers,
//   //   }).then(this._checkResponse);
//   // }

//   // removeLike(card) {
//   //   return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
//   //     method: "DELETE",
//   //     headers: this._headers,
//   //   }).then(this._checkResponse);
//   // }

//   // другие методы работы с API
// }

// // const api = new Api({
// //   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41",
// //   headers: {
// //     authorization: "93691316-b2f3-4bce-8add-d8eb39969e4b",
// //     "Content-Type": "application/json",
// //   },
// // });

// // export default api;


// const api = new Api({
//   baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
//   headers: {
//     authorization: "93691316-b2f3-4bce-8add-d8eb39969e4b",
//     "Content-Type": "application/json",
//   },
// });

// export default api;
