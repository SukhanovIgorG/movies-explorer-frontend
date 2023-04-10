import {useState, useContext, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {updateUser} from '../../utils/MainApi';
import {apiErrorController} from '../../utils/errorController';
import {REG_EMAIL, REG_NAME} from '../../constants/constants';

import Header from '../Header/Header';

function Profile({menuOpen, menuClose, logOut, menuStatus, onSetCurrentUser}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [currentName, setCurrentName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorApi, setErrorApi] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorName, setErrorName] = useState('');
  const [messageDone, setMessageDone] = useState('');
  const [submitActive, setSubmitActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errorApi || errorName || errorEmail) {
      setSubmitActive(false);
    }
    if (name === currentUser.name && email === currentUser.email) {
      setSubmitActive(false);
    } else {
      setSubmitActive(true);
    }
  }, [errorApi, errorEmail, errorName, name, email]);

  useEffect(() => {
    setCurrentName(currentUser.name);
  }, []);

  useEffect(() => {
    setErrorApi('');
    setMessageDone('');
  }, [email, name]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser.name, currentUser.email]);

  const validationEmail = (value) => {
    if (!REG_EMAIL.test(value)) {
      setErrorEmail(`${value} не является электронной почтой`);
    } else {
      setErrorEmail('');
    }
  };

  const validationName = (value) => {
    if (value.length < 2) {
      setErrorName(
        `Имя не может быть меньше 2 символов, сейчас символов ${value.length}`
      );
    } else if (!REG_NAME.test(value)) {
      setErrorName(`недопустимые символы`);
    } else if (value.length > 30) {
      setErrorName(
        `Имя не может быть длиннее 30 символов, сейчас символов ${value.length}`
      );
    } else {
      setErrorName('');
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
      console.log('currentName :>> ', currentName);
      if (currentName === name && email === currentUser.email) {
        return setErrorApi('Данные совпадают с текущими');
      } else {
        setIsLoading(true);
        updateUser(name)
          .then((res) => {
            setMessageDone('Данные успешно изменены');
            setCurrentName(name);
            setIsLoading(false);
          })
          .catch((err) => {
            setErrorApi(apiErrorController(err));
            setIsLoading(false);
          });
      }
    } else {
      setErrorApi('Заполните все поля корректными данными');
    }
  }

  return (
    <>
      <Header
        colorDark={false}
        loggedIn={true}
      >
        <div
          className={
            menuStatus
              ? 'header-menu__background_visible'
              : 'header-menu__background_hidden'
          }
        >
          <div
            className={
              menuStatus
                ? 'header__menu-container-burger header__menu-container-burger_open'
                : 'header__menu-container-burger header__menu-container-burger_clos'
            }
          >
            <button
              className="header__button header__button_landing header__button_hover"
              onClick={() => {
                menuClose();
                navigate('/');
              }}
            >
              Главная
            </button>
            <div
              className={
                'header__button-container header__button-container_type_films'
              }
            >
              <Link
                to="/movies"
                onClick={menuClose}
              >
                <button className="header__button header__button_films header__button_hover">
                  Фильмы
                </button>
              </Link>
              <Link
                to="/saved-movies"
                onClick={menuClose}
              >
                <button className="header__button header__button_collections header__button_hover">
                  Сохраненные фильмы
                </button>
              </Link>
            </div>
            <div
              className={
                'header__button-container header__button-container_type_account'
              }
            >
              <Link
                to="/profile"
                onClick={menuClose}
              >
                <button className="header__button header__button_account header__button_underline">
                  Аккаунт
                </button>
              </Link>
              <Link
                to="/profile"
                onClick={menuClose}
              >
                <button className="header__button header__button_account-img"></button>
              </Link>
            </div>
          </div>
          <button
            onClick={menuOpen}
            className={`header__menu-button
          ${
            (menuStatus && 'header__menu-button_open') ||
            (!menuStatus && 'header__menu-button_clos')
          }
          `}
          ></button>
        </div>
      </Header>
      <div className="dialog">
        <div className="dialog__container">
          <h2 className="dialog__header dialog__header_type_profile">
            Привет, {currentUser.name}!
          </h2>
          <form
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="dialog__input-container dialog__input-container_type_profile ">
              <span className="dialog__input-span dialog__input-span_type_profile">
                Имя
              </span>
              <input
                type="text"
                value={name ? name : ''}
                onChange={handleInputName}
                disabled={isLoading}
                className={
                  errorName
                    ? 'dialog__input dialog__input_type_profile dialog__input_type_error'
                    : 'dialog__input dialog__input_type_profile'
                }
                placeholder="Имя"
              ></input>
              <span className="dialog__input-error">{errorName}</span>
            </div>
            <div className="dialog__input-container dialog__input-container_type_profile ">
              <span className="dialog__input-span dialog__input-span_type_profile">
                email
              </span>
              <input
                type="email"
                value={email ? email : ''}
                onChange={handleInputEmail}
                disabled={true}
                className={
                  errorEmail
                    ? 'dialog__input dialog__input_type_profile dialog__input_type_error'
                    : 'dialog__input dialog__input_type_profile'
                }
                placeholder="E-mail"
              ></input>
              <span className="dialog__input-error">{errorEmail}</span>
            </div>
            {errorApi && (
              <span className="dialog__input-error">{errorApi}</span>
            )}
            {messageDone && (
              <span className="dialog__input-error dialog__input-error_done">
                {messageDone}
              </span>
            )}
            <div className="dialog__button-container dialog__button-container_type_red">
              <a
                href="../signup"
                className={
                  submitActive
                    ? 'dialog__button-link dialog__button-link_type_red'
                    : 'dialog__button-link dialog__button-link_type_grey '
                }
                onClick={handleSubmit}
              >
                Редактировать
              </a>
            </div>
            <div className="dialog__button-container dialog__button-container_type_logout">
              <Link
                to="/"
                className="dialog__button-link dialog__button-link_type_logout"
                onClick={() => {
                  menuClose();
                  logOut();
                }}
              >
                Выйти из аккаунта
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
