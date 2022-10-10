import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { updateUser } from "../../utils/MainApi";
import { apiErrorController } from "../../utils/errorController";
import { REGEMAIL, REGNAME } from "../../constants/constans";

import Header from "../Header/Header";

function Profille({
  menuOpen,
  menuClose,
  logOut,
  menuStatus,
  onSetCurrentUser,
}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorApi, setErrorApi] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [messageDone ,setMessageDone] = useState("")
  const [submitActive, setSubmitActive] = useState(false);


  useEffect(() => {
    if (errorApi || errorName || errorEmail ) {
      setSubmitActive(false);
    } if ((name === currentUser.name) && (email === currentUser.email)) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  }, [errorApi, errorEmail, errorName, name, email]);

  useEffect(() => {
    setErrorApi("");
    setMessageDone("")
  }, [email, name]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);


  const validationEmail = (value) => {
    if (!REGEMAIL.test(value)) {
      setErrorEmail(`${value} не является электронной почтой`);
    } else {
      setErrorEmail("");
    }
  };

  const validationName = (value) => {
    if (value.length < 2) {
      setErrorName(
        `Имя не может быть меньше 2 символов, сейчас символов ${value.length}`
      );
    } else if (!REGNAME.test(value)) {
      setErrorName(`недопустимые символы`);
    } else if (value.length > 30) {
      setErrorName(
        `Имя не может быть длиннее 30 символов, сейчас символов ${value.length}`
      );
    } else {
      setErrorName("");
    }
  };

  function handleInputName(e) {
    setName(e.target.value);
    validationName(e.target.value);
  }
  function handleInputEmail(e) {
    setEmail(e.target.value);
    validationEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (submitActive) {
      updateUser({ name, email })
        .then((res) => {
          console.log(res.user);
          onSetCurrentUser(res.user);
          setMessageDone('Данные успешно изменены')
        })
        .catch((err) => {
          setErrorApi(apiErrorController(err));
        });
    } else {
      if ((name === currentUser.name) && (email === currentUser.email)) {
        return setErrorApi("Данные совпадают с текущими");
      }
      setErrorApi("Заполните все поля корректными данными");
    }
  }

  return (
    <>
      <Header colorDark={false} loggedIn={true}>
        <div
          className={
            menuStatus
              ? "header-menu__background_visible"
              : "header-menu__background_hidden"
          }
        >
          <div
            className={
              menuStatus
                ? "header__menu-container-burger header__menu-container-burger_open"
                : "header__menu-container-burger header__menu-container-burger_clos"
            }
          >
            <button
              className="header__button header__button_landing header__button_hover"
              onClick={() => {
                menuClose();
                navigate("/");
              }}
            >
              Главная
            </button>
            <div
              className={
                "header__button-container header__button-container_type_films"
              }
            >
              <Link to="/movies" onClick={menuClose}>
              <button
                className="header__button header__button_films header__button_hover"
              >
                Фильмы
              </button>
              </Link>
              <Link to="/saved-movies" onClick={menuClose}>
              <button
                className="header__button header__button_colections header__button_hover"
              >
                Сохраненные фильмы
              </button>
              </Link>
            </div>
            <div
              className={
                "header__button-container header__button-container_type_account"
              }
            >
              <Link to="/profile" onClick={menuClose}>
              <button
                className="header__button header__button_account header__button_underline"
              >
                Аккаунт
              </button>
              </Link>
              <Link to="/profile" onClick={menuClose}>
              <button
                className="header__button header__button_account-img"
              ></button>
              </Link>
            </div>
          </div>
          <button
            onClick={menuOpen}
            className={`header__menu-button
          ${
            (menuStatus && "header__menu-button_open") ||
            (!menuStatus && "header__menu-button_clos")
          }
          `}
          ></button>
        </div>
      </Header>
      <div className="dialog">
        <div className="dialog__container">
          <h2 className="dialog__header dialog__header_type_profille">
            Привет, {currentUser.name}!
          </h2>
          <form noValidate onSubmit={handleSubmit}>
            <div className="dialog__input-container dialog__input-container_type_profille ">
              <span className="dialog__input-span dialog__input-span_type_profille">
                Имя
              </span>
              <input
                type="text"
                value={name ? name : ""}
                onChange={handleInputName}
                className={
                  errorName
                    ? "dialog__input dialog__input_type_profille dialog__input_type_error"
                    : "dialog__input dialog__input_type_profille"
                }
                placeholder="Имя"
              ></input>
              <span className="dialog__input-error">{errorName}</span>
            </div>
            <div className="dialog__input-container dialog__input-container_type_profille ">
              <span className="dialog__input-span dialog__input-span_type_profille">
                email
              </span>
              <input
                type="email"
                value={email ? email : ""}
                onChange={handleInputEmail}
                className={
                  errorEmail
                    ? "dialog__input dialog__input_type_profille dialog__input_type_error"
                    : "dialog__input dialog__input_type_profille"
                }
                placeholder="E-mail"
              ></input>
              <span className="dialog__input-error">{errorEmail}</span>
            </div>
            { errorApi && <span className="dialog__input-error">{errorApi}</span>}
            { messageDone && <span className="dialog__input-error dialog__input-error_done">{messageDone}</span>}
            <div className="dialog__button-container dialog__button-container_type_red">
              <a
                href="../signup"
                className={
                  submitActive
                    ? "dialog__button-link dialog__button-link_type_red"
                    : "dialog__button-link dialog__button-link_type_grey "
                }
                onClick={handleSubmit}
              >
                Редактировать
              </a>
            </div>
            <div className="dialog__button-container dialog__button-container_type_logout">
              <a
                href="../signin"
                className="dialog__button-link dialog__button-link_type_logout"
                onClick={() => {
                  menuClose();
                  logOut();
                  navigate("/signin");
                }}
              >
                Выйти из аккаунта
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profille;
