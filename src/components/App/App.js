import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { getMovies } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { addMovies, deleteMovies } from "../../utils/MainApi";
import { autorization, me, myMovies } from "../../utils/MainApi";

// COMPONENTS
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/ErrorPage";
import Register from "../Register/Register";
import Landing from "../Landing/Landing";
import Movies from "../Movies/Movies";
import Profille from "../Profile/Profile";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

function App() {
// CONSTANTS
  const jwt = localStorage.getItem("JWT");
  let screenWidth = window.innerWidth;

  const [renderMovies, setRenderMovies] = useState([]);
  const [renderSavedMovies, setRenderSavedMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [mySavedMovies, setMySavedMovies] = useState([]);
  const [keyWord, setKeyWord] = useState(localStorage.getItem("keyWord"));
  const [saveKeyWord, setSaveKeyWord] = useState(
    localStorage.getItem("saveKeyWord")
  );
  const [startCounter, setStartCounter] = useState(0);
  const [moreCounter, setMoreCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [short, setShort] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("JWT"));
  const [currentUser, setCurrentUser] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);

// MENU OPEN/CLOSE
  const hendlerOpenMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const hendlerCloseMenu = () => {
    setMenuVisible(false);
  }

// USE EFFECT
  useEffect(() => {
    if (jwt) {
      autorization(jwt);
      setLoggedIn(true);
    } else {
      console.log("jwt не найден");
      setCurrentUser({});
      setLoggedIn(false);
    }
  }, [jwt]);
  useEffect(() => {
    if (loggedIn) {
      screenControl();
      Promise.all([me(), myMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user.user);
          setMySavedMovies(movies.movie);
          setRenderSavedMovies(movies.movie);
          localStorage.setItem("savedMovies", JSON.stringify(movies.movie));
          setSearchMovies(
            localStorage.getItem("searchMovies") == null
              ? []
              : JSON.parse(localStorage.getItem("searchMovies"))
          );
          setKeyWord(
            localStorage.getItem("saveKeyWord") == null
              ? ""
              : localStorage.getItem("saveKeyWord")
          );
          setRenderMovies(
            localStorage.getItem("searchMovies") == null
              ? []
              : JSON.parse(localStorage.getItem("searchMovies"))
          );
          setShort(localStorage.getItem("conditionShort") == null ?
          "" : localStorage.getItem("conditionShort"))
        })
        .then(() => {
          // setRenderMovies(searchMovies.slice(0, startCounter))
          // sliceMovieList()
        })
        .catch((err) => {
          console.log(`ошибка. Сообщение: ${err}`);
        });
    } else {
      console.log("авторизация не выполнена");
    }
  }, [loggedIn]);
  useEffect(() => {
    sliceMovieList()
  }, [searchMovies]);

  // SEARC & INPUTS
  const searchMoviesFunc = (arrMovies, name) => {
    if (short) {
      let shortMovies = arrMovies.filter((item) => item.duration < 60);
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
    let savedArr = JSON.parse(localStorage.getItem("savedMovies"));
    setRenderSavedMovies(searchMoviesFunc(savedArr, saveKeyWord));
    setLoading(false);
    localStorage.setItem("saveKeyWord", saveKeyWord)
  };
  const handleSearch = () => {
    setLoading(true);
    getMovies()
      .then((movies) => {
        return searchMoviesFunc(movies, keyWord);
      })
      .then((res) => {
        setLoading(false);
        screenControl();
        setSearchMovies(res);
        setRenderMovies(res.slice(0, startCounter));

        localStorage.setItem("searchMovies", JSON.stringify(res));
        localStorage.setItem("conditionShort", short);
        localStorage.setItem("keyWord", keyWord);
      });

    sliceMovieList();
  };
  function handleChangeShort(value) {
    setShort(value);
    handleSearch();
  }
  const handleInputKeyWord = (value) => {
    setKeyWord(value);
  };
  const handleInputSaveKeyWord = (value) => {
    setSaveKeyWord(value);
  };

// SCREEN CONTROLL
  function screenControl() {
    if (screenWidth < 891) {
      setStartCounter(5);
      setMoreCounter(5);
    }
    if (891 < screenWidth && screenWidth < 1280) {
      setStartCounter(8);
      setMoreCounter(2);
    }
    if (1280 < screenWidth) {
      setStartCounter(12);
      setMoreCounter(3);
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
  const handleLike = (movie) => {
    addMovies(movie).then((res) => {
      console.log("like otvet" + res.movie.nameRU);
      setMySavedMovies([res.movie, ...mySavedMovies]);
      setRenderSavedMovies([res.movie, ...renderSavedMovies])
    });
  };
  const handleDelete = (movie) => {
    const dellMovie = mySavedMovies.find(
      (item) =>
        Number(item.movieId) === Number(movie.id) ||
        Number(item.movieId) === Number(movie.movieId)
    );
    if (dellMovie === undefined) {
      console.log('film ne nayden')
    } else {
    deleteMovies(dellMovie._id).then(() => {
      const arrWithOutDellMovie = mySavedMovies.filter(
        (item) => item.movieId !== dellMovie.movieId
      );
      console.log(arrWithOutDellMovie.length);
      setMySavedMovies(arrWithOutDellMovie);
      setRenderSavedMovies(arrWithOutDellMovie);
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
    localStorage.removeItem("JWT");
    localStorage.removeItem("saveMovies");
    localStorage.removeItem("searchMovies");
    localStorage.removeItem("keyWord");
    localStorage.removeItem("saveKeyWord");
    localStorage.removeItem("conditionShort")
  }

  const setCurrentUserHandler = (data) => {
    setCurrentUser(data)
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login onLogin={handlerLogin} />} />
            {/* <Route
              path="/*"
              element={
                !loggedIn ? (
                  <Navigate replace to="/landing" />
                ) : (
                  <Navigate replace to="/movies" />
                )
              }
            /> */}
            <Route path="/404" element={<ErrorPage />} />
            <Route
              exact
              path="/"
              element={<ProtectedRoute loggedIn={loggedIn} />}
            >
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
            </Route>
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
                    savedMoviesStatus={false}
                    onKeyWord={keyWord}
                    onSaveKeyWord={saveKeyWord}
                    onSearchKeyWord={handleSearch}
                    onInputKeyWord={handleInputKeyWord}
                    onInputSaveKeyWord={handleInputSaveKeyWord}
                    conditionShort={short}
                    onChangeShort={handleChangeShort}
                    onMoreMovies={handleMoreMovies}
                    buttonStatus={searchMovies.length === renderMovies.length}
                    onLike={handleLike}
                    onDelete={handleDelete}
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
                    onMovies={renderSavedMovies}
                    savedMoviesStatus={true}
                    onKeyWord={keyWord}
                    onSaveKeyWord={saveKeyWord}
                    onSearchKeyWord={handleSearchInSave}
                    onInputKeyWord={handleInputKeyWord}
                    onInputSaveKeyWord={handleInputSaveKeyWord}
                    conditionShort={short}
                    onChangeShort={handleChangeShort}
                    onMoreMovies={handleMoreMovies}
                    buttonStatus={true}
                    onLike={handleLike}
                    onDelete={handleDelete}
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
              element={
                <ErrorPage />
              }
            />
          </Routes>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
