exports.apiErrorController = (err) => {
  if (err.status === 409) {
    return('пользователь с таким e-mail уже существует')
  } else if (err.status === 401) {
    return('ошибка автризации')
  } else if (err.status === 500) {
    return('на сервере произошла ошибка, повтоите запрос позже')
  } else if (err.status === 400) {
    return('заполните все поля корректными данными')
  } else {
    return('что-то пошло не так, возможно проблема с интернетом')
  }
}
