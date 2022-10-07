import headerLogo from "../../image/header-logo.svg";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/MainApi"
 
function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(status) {
    onLogin(status);
  }

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password })
    .then((data) => {
      localStorage.setItem("JWT", data.token);
      handleLogin(true);
      setEmail("");
      setPassword("");
      navigate("/movies");
    }).catch((err)=>{
      if (err.status === 401) {
        setError('неправильные почта или пароль')
      } else if (err.status === 500) {
        setError('на сервере произошла ошибка, повтоите запрос позже')
      } else {
        setError('что-то пошло не так')
      }
    });
  }
  useEffect(()=>{
    setError('')
  }, [email, password])

  return (
    <div className="dialog">
      <div className="dialog__container dialog__container_type_auth">
        <img
          className="header__logo heder__logo_type_signin"
          src={headerLogo}
          alt="логотип"
          onClick={() => navigate("/")}
        />
        <h2 className="dialog__header dialog__header_type_auth">
          Рады видеть!
        </h2>
        <form
          onSubmit={handleSubmit} 
        >
          <span className="dialog__input-span dialog__input-span_type_signin">
            email
          </span>
          <input
            type="email"
            value={email ? email : ''}
            onChange={handleInputEmail}
            className="dialog__input dialog__input_type_signin"
            placeholder=""
          ></input>
          <span className="dialog__input-span dialog__input-span_type_signin">
            пароль
          </span>
          <input
            type="password"
            value={password ? password : ''}
            onChange={handleInputPassword}
            className="dialog__input dialog__input_type_signin"
            placeholder=""
          ></input>
          {error && <span className="dialog__input-error">{error}</span>}
          
          <button className="dialog__button dialog__button_type_log">
            Войти
          </button>
          <div className="dialog__button dialog__button_type_reg">
            Еще не зарегистрированы?
            <button
              className="dialog__button-link"
              onClick={() => navigate("/signup")}
            >
              Регистрация
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
