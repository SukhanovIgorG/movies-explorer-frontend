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
    })
    .catch((err)=>{
      return console.log(err.message)
    })
};
