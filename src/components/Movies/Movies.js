import {useState} from 'react'

import Search from "../Search/Search";
import MoviesList from "../MoviesList/MoviesList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Movies({movies, savedMoviesStatus}) {

  const [menuVisible, setMenuVisible] = useState(false);

  const hendlerOpenMenu = () => {
    setMenuVisible(!menuVisible);
  };

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
      <div className="Movies">
        <Search />
        <MoviesList savedMoviesBlock={savedMoviesStatus} movies={movies}/>
        {/* <Preloader/>
      <MoviesCard/> */}
      </div>
      <Footer />
    </>
  );
}

export default Movies;
