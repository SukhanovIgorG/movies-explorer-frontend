import { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

import Search from "../Search/Search";
import SearchNew from "../SearchNew/SearchNew";
import MoviesList from "../MoviesList/MoviesList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";

function MoviesSave({
  isLoading,
  menuStatus,
  menuOpen,
  menuClose,
  savedMoviesStatus,
  onMoviesSave,
  onSaveKeyWord,
  onSearchSave,
  onInputSaveKeyWord,
  conditionShortSave,
  onChangeShortSave,
  onDelete,
  onReset,
}) {
  const navigate = useNavigate();
  let movies = Array.from(onMoviesSave);

  useEffect(() => {
     return onReset(); 
}, []);

const handleShort = () => {
  onChangeShortSave(!conditionShortSave);
};

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
              className="header__button header__button_hover header__button_landing header__button_underline-not"
              onClick={()=>{
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
              <Link to="/movies" onClick={menuClose}>
              <button
                className={
                  savedMoviesStatus
                    ? "header__button header__button_films header__button_hover"
                    : "header__button header__button_films header__button_hover header__button_underline"
                }
              >
                Фильмы
              </button>
              </Link>
              <Link to="/saved-movies" onClick={menuClose}>
              <button
                className={
                  savedMoviesStatus
                    ? "header__button header__button_colections header__button_hover header__button_underline"
                    : "header__button header__button_colections header__button_hover"
                }
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
                className="header__button header__button_account"
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
      <main className="Movies">
        <SearchNew
          savedMoviesStatus={true}
          keyWordState={onSaveKeyWord}
          onInput={onInputSaveKeyWord}
          onSearch={onSearchSave}
          shortState={conditionShortSave}
          onSetShort={handleShort}
        />
        {isLoading && <Preloader onLoading={true} message={"поиск..."} />}
        {movies.length === 0 ? (
          <Preloader onLoading={false} message={"ничего не найдено"} />
        ) : (
          <MoviesList
            savedMoviesBlock={savedMoviesStatus}
            movies={onMoviesSave}
            deleteLike={onDelete}
          >
          </MoviesList>
        )}
      </main>
      <Footer />
    </>
  );
}

export default MoviesSave;
