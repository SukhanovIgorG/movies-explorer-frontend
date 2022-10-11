export const BASE_URL = "https://api.movie.nomoredomains.sbs";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      console.log("second then in register");
      return res;
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      localStorage.setItem("JWT", res.token);
      return res;
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};

// проверка мейла
export const me = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};
// проверка токена
export const autorization = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};

export const updateUser = ( {name, email}) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};

export const myMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};

export const addMovies = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id.toString(),
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};

export const deleteMovies = (_id) => {
  return fetch(`${BASE_URL}/movies/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((res) => {
      return res;
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};
