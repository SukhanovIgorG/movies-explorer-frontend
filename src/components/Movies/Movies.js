import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

// import {firebaseConfig} from '../../fireBaseConfig';
// import {initializeApp} from 'firebase/app';
// import {getFirestore} from 'firebase/firestore';
// import {collection, doc, setDoc, getDoc} from 'firebase/firestore';
// import {updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';

import Search from '../Search/Search';
import MoviesList from '../MoviesList/MoviesList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';

import {likeMovies, disLakeMovies} from '../../utils/MainApi';

function Movies({
  isLoading,
  menuStatus,
  menuOpen,
  menuClose,
  savedMoviesStatus,
  onMovies,
  onMoviesSave,
  onKeyWord,
  onSaveKeyWord,
  onSearchKeyWord,
  onInputKeyWord,
  onInputSaveKeyWord,
  conditionShort,
  onChangeShort,
  conditionShortSave,
  onChangeShortSave,
  onMoreMovies,
  buttonStatus,
  onLike,
  onDelete,
  onReset,
  onCatch,
  onSetCatch,
}) {
  const navigate = useNavigate();
  let movies = Array.from(onMovies);

  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);
  // const citiesRef = collection(db, 'users');

  useEffect(() => {
    onReset();
    onSetCatch();
  }, [savedMoviesStatus]);

  async function Like(arg) {
    console.log('arg :>> ', arg);
    const like = await likeMovies(arg.nameRU);

    // console.log('like :>> ', like);
  }

  async function disLike(arg) {
    console.log('arg :>> ', arg);
    const dislike = await disLakeMovies(arg.nameRU);
  }

  return (
    <div className="Movies">
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
              className="header__button header__button_hover header__button_landing header__button_underline-not"
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
                <button
                  className={
                    savedMoviesStatus
                      ? 'header__button header__button_films header__button_hover'
                      : 'header__button header__button_films header__button_hover header__button_underline'
                  }
                >
                  Фильмы
                </button>
              </Link>
              <Link
                to="/saved-movies"
                onClick={menuClose}
              >
                <button
                  className={
                    savedMoviesStatus
                      ? 'header__button header__button_colections header__button_hover header__button_underline'
                      : 'header__button header__button_colections header__button_hover'
                  }
                >
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
                <button className="header__button header__button_account">
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
      <main className="Movies-main">
        <Search
          savedMoviesStatus={savedMoviesStatus}
          keyWordState={onKeyWord}
          saveKeyWordState={onSaveKeyWord}
          onInput={onInputKeyWord}
          onSaveInput={onInputSaveKeyWord}
          onSearch={onSearchKeyWord}
          shortState={conditionShort}
          onSetShort={onChangeShort}
          shortStateSave={conditionShortSave}
          onSetShortSave={onChangeShortSave}
        />
        {isLoading && (
          <Preloader
            onLoading={true}
            message={'поиск...'}
          />
        )}
        {onCatch && (
          <Preloader
            onLoading={false}
            message={onCatch}
          />
        )}

        {movies.length === 0 ? (
          <div></div>
        ) : (
          // <Preloader onLoading={false} message={"ничего не найдено"} />
          <MoviesList
            savedMoviesBlock={savedMoviesStatus}
            movies={savedMoviesStatus ? onMoviesSave : onMovies}
            addLike={Like}
            deleteLike={disLike}
            render={onMovies}
          >
            <button
              className={
                buttonStatus ? 'movies-list__button_off' : 'movies-list__button'
              }
              onClick={onMoreMovies}
            >
              Еще
            </button>
          </MoviesList>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
