import {useState, useEffect} from 'react';
import {Route, Routes, HashRouter} from 'react-router-dom';

import {getMovies} from '../../utils/MoviesApi';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import {addMovies, deleteMovies} from '../../utils/MainApi';
import {autorization, getUserInfo, myMovies} from '../../utils/MainApi';
import {
  REG_URL,
  SCREEN_MIN,
  SCREEN_MAX,
  MOVIE_MIN,
  MOVIE_MID,
  MOVIE_MAX,
  MOVIE_MORE_MIN,
  MOVIE_MORE_MID,
  MOVIE_MORE_MAX,
} from '../../constants/constans';

// COMPONENTS
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';
import Register from '../Register/Register';
import Landing from '../Landing/Landing';
import Movies from '../Movies/Movies';
import Profille from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  // CONSTANTS
  let screenWidth = window.innerWidth;
  const jwt = localStorage.getItem('JWT');
  const [allMovies, setAllMovies] = useState([]);
  const [renderMovies, setRenderMovies] = useState([]);
  const [renderSavedMovies, setRenderSavedMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [mySavedMovies, setMySavedMovies] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [saveKeyWord, setSaveKeyWord] = useState('');
  const [startCounter, setStartCounter] = useState(0);
  const [moreCounter, setMoreCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [short, setShort] = useState(true);
  const [shortSave, setShortSave] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('JWT'));
  const [currentUser, setCurrentUser] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [firstLounch, setFirstLounch] = useState(false);
  const [catchMessage, setCatchMessage] = useState('');

  // MENU OPEN/CLOSE
  const hendlerOpenMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const hendlerCloseMenu = () => {
    setMenuVisible(false);
  };

  // USE EFFECT
  useEffect(() => {
    screenControl();
    handleSearch();
  }, [screenWidth]);

  useEffect(() => {
    if (loggedIn) {
      if (localStorage.getItem('allMovies')) {
        setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
      } else {
        getMovies()
          .then((apiMovies) => {
            localStorage.setItem('allMovies', JSON.stringify(apiMovies));
            setAllMovies(apiMovies);
            setCatchMessage('');
          })
          .catch(() => {
            setCatchMessage(
              'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
            );
          });
      }
      console.log('point');
      if (localStorage.getItem('searchMovies')) {
        setSearchMovies(JSON.parse(localStorage.getItem('searchMovies')));
      }
      if (JSON.parse(localStorage.getItem('searchMovies'))) {
        setRenderMovies(JSON.parse(localStorage.getItem('searchMovies')));
      }
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   if (jwt) {
  //     autorization(jwt)
  //       .then(() => {
  //         setLoggedIn(true);
  //       })
  //       .catch(() => {
  //         setLoggedIn(false);
  //         handleLogOut();
  //       });
  //   } else {
  //     console.log('jwt не найден');
  //     setCurrentUser({});
  //     setLoggedIn(false);
  //     handleLogOut();
  //   }
  // }, [jwt]);

  useEffect(() => {
    if (loggedIn) {
      console.log('loggedIn :>> ', loggedIn);
      screenControl();
      const getData = async () => {
        const userInfo = await getUserInfo(loggedIn);
        if (userInfo) {
          setCurrentUser(userInfo);
          setMySavedMovies(userInfo.movies);
          setRenderSavedMovies(userInfo.movies);
          localStorage.setItem('savedMovies', JSON.stringify(userInfo.movies));
          setCatchMessage('');
        } else {
          console.log(`Error load data`);
        }
        console.log('userInfo :>> ', userInfo);
      };
      getData();
    } else {
      console.log('авторизация не выполнена');
    }
  }, [loggedIn]);

  useEffect(() => {
    sliceMovieList();
  }, [searchMovies]);

  useEffect(() => {
    handleSearch();
  }, [short]);

  useEffect(() => {
    handleSearchInSave();
  }, [shortSave]);

  // SEARC & INPUTS
  const searchMoviesFunc = (dataMovies = [], name = '', short = false) => {
    let arrMovies = dataMovies ? Array.from(dataMovies) : [];
    if (short) {
      let shortMovies = arrMovies.filter((item) => item.duration < 41);
      return shortMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(name.toLowerCase())
      );
    } else {
      return arrMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(name.toLowerCase())
      );
    }
  };
  const handleSearchInSave = () => {
    setLoading(true);
    if (mySavedMovies !== []) {
      let res = searchMoviesFunc(mySavedMovies, saveKeyWord, shortSave);
      setRenderSavedMovies(res);
      setLoading(false);
      res.length === 0
        ? setCatchMessage('ничего не найдено')
        : setCatchMessage('');
    } else {
      console.log('handleSearchInSave, фильмов не найдено');
      setCatchMessage('ничего не найдено');
    }
  };

  async function handleSearch() {
    setLoading(true);
    let res = await searchMoviesFunc(allMovies, keyWord, short);
    setLoading(false);
    screenControl();
    setSearchMovies(res);
    setCatchMessage('');
    res.length === 0
      ? setCatchMessage('ничего не найдено')
      : setCatchMessage('');
    if (!firstLounch) {
      setFirstLounch(true);
    } else {
      localStorage.setItem('searchMovies', JSON.stringify(res));
    }
    sliceMovieList();
  }

  const handleInputKeyWord = (value) => {
    setKeyWord(value);
    localStorage.setItem('keyWord', value);
  };
  const handleInputSaveKeyWord = (value) => {
    setSaveKeyWord(value);
  };

  // SCREEN CONTROLL
  function screenControl() {
    if (screenWidth < SCREEN_MIN) {
      setStartCounter(MOVIE_MIN);
      setMoreCounter(MOVIE_MORE_MIN);
    }
    if (SCREEN_MIN < screenWidth && screenWidth < SCREEN_MAX) {
      setStartCounter(MOVIE_MID);
      setMoreCounter(MOVIE_MORE_MID);
    }
    if (SCREEN_MAX < screenWidth) {
      setStartCounter(MOVIE_MAX);
      setMoreCounter(MOVIE_MORE_MAX);
    }
  }
  const sliceMovieList = () => {
    setRenderMovies(searchMovies.slice(0, startCounter));
  };
  const resizeFunc = () => {
    screenControl();
    setRenderMovies(searchMovies.slice(0, startCounter));
  };
  window.onresize = () => {
    resizeFunc();
  };

  // MORE
  const handleMoreMovies = () => {
    screenControl();
    setStartCounter(startCounter + moreCounter);
    setRenderMovies(searchMovies.slice(0, startCounter + moreCounter));
  };

  // LIKE & DELETE
  const checkMovieValid = (preMovie) => {
    let movie = preMovie;
    if (!REG_URL.test(preMovie.trailerLink)) {
      movie.trailerLink = 'https://youtu.be/';
      return movie;
    } else {
      return movie;
    }
  };

  const handleLike = (preMovie) => {
    let movie = checkMovieValid(preMovie);
    addMovies(movie)
      .then((res) => {
        setMySavedMovies([res.movie, ...mySavedMovies]);
        setRenderSavedMovies([res.movie, ...renderSavedMovies]);
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([res.movie, ...renderSavedMovies])
        );
        setCatchMessage('');
      })
      .catch(() => {
        setCatchMessage(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      });
  };
  const handleDelete = (movie) => {
    const dellMovie = mySavedMovies.find(
      (item) =>
        Number(item.movieId) === Number(movie.id) ||
        Number(item.movieId) === Number(movie.movieId)
    );
    if (dellMovie === undefined) {
    } else {
      deleteMovies(dellMovie._id)
        .then(() => {
          const arrWithOutDellMovie = mySavedMovies.filter(
            (item) => item.movieId !== dellMovie.movieId
          );
          setMySavedMovies(arrWithOutDellMovie);
          setRenderSavedMovies(arrWithOutDellMovie);
          localStorage.setItem(
            'savedMovies',
            JSON.stringify(arrWithOutDellMovie)
          );
          setCatchMessage('');
        })
        .catch(() => {
          setCatchMessage(
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        });
    }
  };

  // LOGIN / LOGOUT
  function handlerLogin(status) {
    setLoggedIn(status);
  }
  const handleLogOut = () => {
    setLoggedIn(false);
    setCurrentUser({});
    setSearchMovies([]);
    setMySavedMovies([]);
    setKeyWord('');
    setSaveKeyWord('');
    localStorage.removeItem('JWT');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('searchMovies');
    localStorage.removeItem('keyWord');
    localStorage.removeItem('conditionShort');
    localStorage.removeItem('conditionShortSave');
  };

  const setCurrentUserHandler = (data) => {
    setCurrentUser(data);
  };
  const onResetSavedMoviesSearch = () => {
    setRenderSavedMovies(mySavedMovies);
    setSaveKeyWord('');
    setShortSave(false);
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <HashRouter>
          <Routes>
            <Route
              path="/signup"
              element={
                <Register
                  setCurrentUser={setCurrentUser}
                  onLogin={handlerLogin}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  setCurrentUser={setCurrentUser}
                  onLogin={handlerLogin}
                />
              }
            />
            <Route
              path="/404"
              element={<ErrorPage />}
            />
            <Route
              exact
              path="/"
              element={
                <Landing
                  login={loggedIn}
                  menuOpen={hendlerOpenMenu}
                  menuClose={hendlerCloseMenu}
                  logOut={handleLogOut}
                  menuStatus={menuVisible}
                />
              }
            />
            <Route
              exact
              path="/movies"
              element={<ProtectedRoute loggedIn={loggedIn} />}
            >
              <Route
                exact
                path="/movies"
                element={
                  <Movies
                    menuOpen={hendlerOpenMenu}
                    menuClose={hendlerCloseMenu}
                    menuStatus={menuVisible}
                    isLoading={loading}
                    onMovies={renderMovies}
                    onMoviesSave={renderSavedMovies}
                    savedMoviesStatus={false}
                    onKeyWord={keyWord}
                    onSaveKeyWord={saveKeyWord}
                    onSearchKeyWord={handleSearch}
                    onInputKeyWord={handleInputKeyWord}
                    onInputSaveKeyWord={handleInputSaveKeyWord}
                    conditionShort={short}
                    onChangeShort={setShort}
                    conditionShortSave={shortSave}
                    onChangeShortSave={setShortSave}
                    onMoreMovies={handleMoreMovies}
                    buttonStatus={searchMovies.length === renderMovies.length}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    onReset={onResetSavedMoviesSearch}
                    onCatch={catchMessage}
                    onSetCatch={setCatchMessage}
                  />
                }
              />
            </Route>
            <Route
              exact
              path="/saved-movies"
              element={<ProtectedRoute loggedIn={loggedIn} />}
            >
              <Route
                exact
                path="/saved-movies"
                element={
                  <Movies
                    menuOpen={hendlerOpenMenu}
                    menuClose={hendlerCloseMenu}
                    menuStatus={menuVisible}
                    isLoading={loading}
                    onMovies={renderMovies}
                    onMoviesSave={renderSavedMovies}
                    savedMoviesStatus={true}
                    onKeyWord={keyWord}
                    onSaveKeyWord={saveKeyWord}
                    onSearchKeyWord={handleSearchInSave}
                    onInputKeyWord={handleInputKeyWord}
                    onInputSaveKeyWord={handleInputSaveKeyWord}
                    conditionShort={short}
                    onChangeShort={setShort}
                    conditionShortSave={shortSave}
                    onChangeShortSave={setShortSave}
                    onMoreMovies={handleMoreMovies}
                    buttonStatus={true}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    onReset={onResetSavedMoviesSearch}
                    onCatch={catchMessage}
                    onSetCatch={setCatchMessage}
                  />
                }
              />
            </Route>
            <Route
              exact
              path="/profile"
              element={<ProtectedRoute loggedIn={loggedIn} />}
            >
              <Route
                exact
                path="/profile"
                element={
                  <Profille
                    menuOpen={hendlerOpenMenu}
                    menuClose={hendlerCloseMenu}
                    menuStatus={menuVisible}
                    onSetCurrentUser={setCurrentUserHandler}
                    logOut={handleLogOut}
                  />
                }
              />
            </Route>
            <Route
              path="/*"
              element={<ErrorPage />}
            />
          </Routes>
        </HashRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
