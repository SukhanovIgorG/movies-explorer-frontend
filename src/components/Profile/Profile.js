import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { updateUser } from "../../utils/MainApi";

import Header from "../Header/Header";


function Profille ({menuOpen, menuClose, logOut, menuStatus, onSetCurrentUser}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    setError('')
  }, [email, name])

  useEffect(()=>{
    setName(currentUser.name);
    setEmail(currentUser.email)
  }, [currentUser.name, currentUser.email])

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateUser( {name, email} )
    .then((res)=>{
      console.log(res.user)
      onSetCurrentUser(res.user)
    })
    .catch((err)=>{
      if (err.status === 409) {
        setError('пользователь с таким e-mail уже существует')
      } else if (err.status === 400) {
        setError('заполните все поля корректными данными')
      } else if (err.status === 500) {
        setError('на сервере произошла ошибка, повтоите запрос позже')
      } else {
        setError('что-то пошло не так')
      }
    })
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
              }
            }
            >
              Главная
            </button>
            <div
              className={
                "header__button-container header__button-container_type_films"
              }
            >
              <button
                className="header__button header__button_films header__button_hover"
                onClick={() => {
                  menuClose();
                  navigate("/movies");
                }
              }
              >
                Фильмы
              </button>
              <button
                className="header__button header__button_colections header__button_hover"
                onClick={() => {
                  menuClose();
                  navigate("/saved-movies");
                }
              }
              >
                Сохраненные фильмы
              </button>
            </div>
            <div
              className={
                "header__button-container header__button-container_type_account"
              }
            >
              <button
                className="header__button header__button_account header__button_underline"
                onClick={() => {
                  menuClose();
                  navigate("/profile");
                }
              }
              >
                Аккаунт
              </button>
              <button
                className="header__button header__button_account-img"
                onClick={() => {
                  menuClose();
                  navigate("/profile");
                }
              }
              ></button>
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
        <h2 className="dialog__header dialog__header_type_profille">Привет, {currentUser.name}!</h2>
        <form 
         onSubmit={handleSubmit}
          >
          <div className='dialog__input-container dialog__input-container_type_profille '>
          <span className='dialog__input-span dialog__input-span_type_profille'>Имя</span>
          <input
            type="name"
            value={name ? name : ''}
            onChange={handleInputName}
            className="dialog__input dialog__input_type_profille"
            placeholder="Имя"
          ></input>
          </div>
          <div className='dialog__input-container dialog__input-container_type_profille '>
            <span className='dialog__input-span dialog__input-span_type_profille'>email</span>
            <input
            type="email"
            value={email ? email : ''}
            onChange={handleInputEmail}
            className="dialog__input dialog__input_type_profille"
            placeholder="E-mail"
          ></input>
          </div>
          {error && <span className="dialog__input-error">{error}</span>}
          <div
            className="dialog__button-container dialog__button-container_type_red"
          >  
            <a
            href='../signup'
            className='dialog__button-link dialog__button-link_type_red'
            onClick={handleSubmit}
            type="submit"
            >Редактировать</a>
          </div>
          <div
            className="dialog__button-container dialog__button-container_type_logout"
          >  
            <a
            href='../signin'
            className='dialog__button-link dialog__button-link_type_logout'
            onClick={() => {
              menuClose();
              logOut();
              navigate("/signin");
            }
          }
            >Выйти из аккаунта</a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Profille;
