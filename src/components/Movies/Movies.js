import {useState} from 'react'
import { useNavigate } from "react-router-dom";

import Search from "../Search/Search";
import MoviesList from "../MoviesList/MoviesList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Movies({movies, savedMoviesStatus}) {
  const navigate = useNavigate();

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
      ><button className="header__button header__button_landing header__button_hover"
      onClick={() => navigate("/")}>
        Главная
      </button>
        <div
          className={"header__button-container header__button-container_type_films"}
        >
          <button className="header__button header__button_films header__button_hover"
          onClick={() => navigate("/movies")}>
            Фильмы
          </button>
          <button className="header__button header__button_colections header__button_hover"
          onClick={() => navigate("/saved-movies")}>
            Сохраненные фильмы
          </button>
        </div>
        <div
          className={"header__button-container header__button-container_type_account"}
        >
          <button className="header__button header__button_account"
          onClick={() => navigate("/profile")}>
            Аккаунт
          </button>
          <button className="header__button header__button_account-img"
          onClick={() => navigate("/profile")}></button>
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
      <main className="Movies">
        <Search />
        <MoviesList savedMoviesBlock={savedMoviesStatus} movies={movies}/>
        {/* <Preloader/>
      <MoviesCard/> */}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
