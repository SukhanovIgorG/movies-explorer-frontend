import headerLogo from "../../image/header-logo.svg";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  function handleSubmit() {};
  function handleInputName() {};
  function handleInputEmail() {};
  function handleInputPassword() {};


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
            // value={email ? email : ''}
            onChange={handleInputName}
            className="dialog__input dialog__input_type_signin"
            placeholder=""
          ></input>
          <span className="dialog__input-span dialog__input-span_type_signin">
            email
          </span>
          <input
            type="email"
            // value={email ? email : ''}
            onChange={handleInputEmail}
            className="dialog__input dialog__input_type_signin"
            placeholder=""
          ></input>
          <span className="dialog__input-span dialog__input-span_type_signin">
            пароль
          </span>
          <input
            type="password"
            // value={password ? password : ''}
            onChange={handleInputPassword}
            className="dialog__input dialog__input_type_signin"
            placeholder=""
          ></input>
          <span className="dialog__input-error">Что то поло не так</span>
          <button className="dialog__button dialog__button_type_log dialog__button_type_log-reg">
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
