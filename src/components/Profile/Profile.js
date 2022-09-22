import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";


function Profille () {
  const [menuVisible, setMenuVisible] = useState(false);

  const hendlerOpenMenu = () => {
    setMenuVisible(!menuVisible);
  }
  const navigate = useNavigate();


  return (
    <>
    <Header colorDark={false} loggedIn={true}>
    <div 
      className={menuVisible ? "header-menu__background_visible" : "header-menu__background_hidden"}>
    <div
    className={menuVisible ? "header__menu-container-burger header__menu-container-burger_open" : "header__menu-container-burger header__menu-container-burger_clos"}
  >
    <div
      className={"header__button-container header__button-container_type_films"}
    >
      <button className="header__button header__button_films header__button_hover">
        Фильмы
      </button>
      <button className="header__button header__button_colections header__button_hover">
        Сохраненные фильмы
      </button>
    </div>
    <div
      className={"header__button-container header__button-container_type_account"}
    >
      <button className="header__button header__button_account">
        Аккаунт
      </button>
      <button className="header__button header__button_account-img"></button>
    </div>
    </div>
    <button
      onClick={hendlerOpenMenu}
      className={`header__menu-button
      ${
        (menuVisible && "header__menu-button_open") ||
        (!menuVisible && "header__menu-button_clos")
      }
      `}
    ></button>
    </div>
  </Header>
    <div className="dialog">
      <div className="dialog__container">
        <h2 className="dialog__header dialog__header_type_profille">Привет, Виталий!</h2>
        <form 
         onSubmit={()=> {}}
          >
          <div className='dialog__input-container dialog__input-container_type_profille '>
          <span className='dialog__input-span dialog__input-span_type_profille'>Имя</span>
          <input
            type="name"
            // value={"name ? name : ''"}
            onChange={"handleInputName"}
            className="dialog__input dialog__input_type_profille"
            placeholder="Виталий"
          ></input>
          </div>
          <div className='dialog__input-container dialog__input-container_type_profille '>
            <span className='dialog__input-span dialog__input-span_type_profille'>email</span>
            <input
            type="email"
            // value={"email ? email : ''"}
            onChange={"handleInputEmail"}
            className="dialog__input dialog__input_type_profille"
            placeholder="Виталий№мейл.ру"
          ></input>
          </div>
          <div
            className="dialog__button-container dialog__button-container_type_red"
          >  
            <a
            href='../signup'
            className='dialog__button-link dialog__button-link_type_red'
            onClick={()=>{}}
            type="submit"
            >Редактировать</a>
          </div>
          <div
            className="dialog__button-container dialog__button-container_type_logout"
          >  
            <a
            href='../signup'
            className='dialog__button-link dialog__button-link_type_logout'
            onClick={() => navigate("/signup")}
            >Выйти из аккаунта</a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Profille;
