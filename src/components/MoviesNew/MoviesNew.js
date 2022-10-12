import { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";

import SearchNew from "../SearchNew/SearchNew";
import MoviesList from "../MoviesList/MoviesList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";

function MoviesNew({
  isLoading,
  menuStatus,
  menuOpen,
  menuClose,
  savedMoviesStatus,
  onMovies,
  onKeyWord,
  onSearchKeyWord,
  onInputKeyWord,
  conditionShort,
  onChangeShort,
  onMoreMovies,
  buttonStatus,
  onLike,
  onDelete,
}) {
  const navigate = useNavigate();
  let movies = Array.from(onMovies);

  const handleShort = () => {
    onChangeShort(!conditionShort);
    localStorage.setItem("conditionShort", !conditionShort);
  };

    
  useEffect(()=>{
    // onKeyWord(localStorage.getItem("keyWord") !== null ? localStorage.getItem("keyWord") : '');
    onInputKeyWord(localStorage.getItem("keyWord") !== null ? localStorage.getItem("keyWord") : '');
    onChangeShort(localStorage.getItem("conditionShort") !== null ? JSON.parse(localStorage.getItem("conditionShort")) : false);
  }, []);

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
          savedMoviesStatus={false}
          keyWordState={onKeyWord}
          onInput={onInputKeyWord}
          onSearch={onSearchKeyWord}
          shortState={conditionShort}
          onSetShort={handleShort}
        />
        {isLoading && <Preloader onLoading={true} message={"поиск..."} />}
        {movies.length === 0 ? (
          <Preloader onLoading={false} message={"ничего не найдено"} />
        ) : (
          <MoviesList
            savedMoviesBlock={savedMoviesStatus}
            movies={onMovies}
            addLike={onLike}
            deleteLike={onDelete}
            render={onMovies}
          >
            <button
              className={
                buttonStatus ? "movies-list__button_off" : "movies-list__button"
              }
              onClick={onMoreMovies}
            >
              Еще
            </button>
          </MoviesList>
        )}
      </main>
      <Footer />
    </>
  );
}

export default MoviesNew;
