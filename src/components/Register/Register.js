import headerLogo from "../../image/header-logo.svg";
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/MainApi"
 
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  useEffect(()=>{
    setError('')
  }, [email, name, password])

  function handleInputName(e) {
    setName(e.target.value);
  };
  function handleInputEmail(e) {
    setEmail(e.target.value);
  }
  function handleInputPassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    console.log("сабмит");
    e.preventDefault();
    register({ name, email, password })
    .then(() => {
      setName("");
      setEmail("");
      setPassword("");
      navigate("/signin");
    })
    .catch((err)=> {
      if (err.status === 409) {
        setError('пользователь с таким e-mail уже существует')
      } else if (err.status === 500) {
        setError('на сервере произошла ошибка, повтоите запрос позже')
      } else if (err.status === 400) {
        setError('заполните все поля корректными данными')
      } else {
        setError('что-то пошло не так')
      }
    });
  }


  return (
    <div className="dialog">
      <div className="dialog__container dialog__container_type_auth">
        <img
          className="header__logo header__logo_type_signin"
          src={headerLogo}
          alt="логотип"
          onClick={() => navigate("/")}
        />
        <h2 className="dialog__header dialog__header_type_auth">
          Добро пожаловать!
        </h2>
        <form
        onSubmit={handleSubmit}
        >
          <span className="dialog__input-span dialog__input-span_type_signin">
            Имя
          </span>
          <input
            type="name"
            value={name ? name : ''}
            onChange={handleInputName}
            className="dialog__input dialog__input_type_signin"
            placeholder="Имя"
          ></input>
          <span className="dialog__input-span dialog__input-span_type_signin">
            email
          </span>
          <input
            type="email"
            value={email ? email : ''}
            onChange={handleInputEmail}
            className="dialog__input dialog__input_type_signin"
            placeholder="E-mail"
          ></input>
          <span className="dialog__input-span dialog__input-span_type_signin">
            пароль
          </span>
          <input
            type="password"
            value={password ? password : ''}
            onChange={handleInputPassword}
            className="dialog__input dialog__input_type_signin"
            placeholder="пароль"
          ></input>
          {error && <span className="dialog__input-error">{error}</span>}
          <button className="dialog__button dialog__button_type_log dialog__button_type_log-reg"
          onClick={handleSubmit}>
            Зарегистрироваться
          </button>
          <div className="dialog__button dialog__button_type_reg">
            Уже зарегистрированы?
            <button
              className="dialog__button-link"
              onClick={() => navigate("/signin")}
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
