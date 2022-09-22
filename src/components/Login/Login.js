import headerLogo from "../../image/header-logo.svg";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

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
        /* onSubmit={handleSubmit} */
        >
          <span className="dialog__input-span dialog__input-span_type_signin">
            email
          </span>
          <input
            type="email"
            // value={email ? email : ''}
            // onChange={handleInputEmail}
            className="dialog__input dialog__input_type_signin"
            placeholder=""
          ></input>
          <span className="dialog__input-span dialog__input-span_type_signin">
            пароль
          </span>
          <input
            type="password"
            // value={password ? password : ''}
            // onChange={handleInputPassword}
            className="dialog__input dialog__input_type_signin"
            placeholder=""
          ></input>
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
