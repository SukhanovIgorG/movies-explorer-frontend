import { useNavigate } from "react-router-dom";

import Search from "../Search/Search";
import MoviesList from "../MoviesList/MoviesList";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";

function Movies({
  isLoading,
  menuStatus,
  menuOpen,
  menuClose,
  savedMoviesStatus,
  onMovies,
  onKeyWord,
  onSaveKeyWord,
  onSearchKeyWord,
  onInputKeyWord,
  onInputSaveKeyWord,
  conditionShort,
  onChangeShort,
  onMoreMovies,
  buttonStatus,
  onLike,
  onDelete,
}) {
  const navigate = useNavigate();
  let movies = Array.from(onMovies);

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
              <button
                className={
                  savedMoviesStatus
                    ? "header__button header__button_films header__button_hover"
                    : "header__button header__button_films header__button_hover header__button_underline"
                }
                onClick={() => {
                  menuClose();
                  navigate("/movies");
                }}
              >
                Фильмы
              </button>
              <button
                className={
                  savedMoviesStatus
                    ? "header__button header__button_colections header__button_hover header__button_underline"
                    : "header__button header__button_colections header__button_hover"
                }
                onClick={() => {
                  menuClose();
                  navigate("/saved-movies");
                }}
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
                className="header__button header__button_account"
                onClick={() => {
                  menuClose();
                  navigate("/profile");
                }}
              >
                Аккаунт
              </button>
              <button
                className="header__button header__button_account-img"
                onClick={() => {
                  menuClose();
                  navigate("/profile");
                }}
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
      <main className="Movies">
        <Search
          savedMoviesStatus={savedMoviesStatus}
          keyWordState={onKeyWord}
          saveKeyWordState={onSaveKeyWord}
          onInput={onInputKeyWord}
          onSaveInput={onInputSaveKeyWord}
          onSearch={onSearchKeyWord}
          shortState={conditionShort}
          onSetShort={onChangeShort}
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

export default Movies;
