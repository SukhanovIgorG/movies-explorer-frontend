import { useState, useEffect } from "react";
import { 
  Route,
  Routes,
  BrowserRouter,
  // useNavigate,
  // useLocation
 } from "react-router-dom";
import { getMovies } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { addMovies, deleteMovies } from "../../utils/MainApi";
import { autorization, me, myMovies } from "../../utils/MainApi";
import {
  REGURL,
  SCREENSIZEMIN,
  SCREENSIZEMAX,
  MOVIESTARTCOUNTMIN,
  MOVIESTARTCOUNTMID,
  MOVIESTARTCOUNTMAX,
  MOVIEMORECOUNTMIN,
  MOVIEMORECOUNTMID,
  MOVIEMORECOUNTMAX,
} from "../../constants/constans";

// COMPONENTS
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/ErrorPage";
import Register from "../Register/Register";
import Landing from "../Landing/Landing";
import Movies from "../Movies/Movies";
import MoviesNew from "../MoviesNew/MoviesNew";
import MoviesSave from "../MoviesSave/MoviesSave";
import Profille from "../Profile/Profile";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

function App() {
  // CONSTANTS
  // const navigate = useNavigate();
  // const location = useLocation();
  let screenWidth = window.innerWidth;
  const jwt = localStorage.getItem("JWT");
  const [allMovies, setAllMovies] = useState([]);
  const [renderMovies, setRenderMovies] = useState([]);
  const [renderSavedMovies, setRenderSavedMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [mySavedMovies, setMySavedMovies] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [saveKeyWord, setSaveKeyWord] = useState("");
  const [startCounter, setStartCounter] = useState(0);
  const [moreCounter, setMoreCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [short, setShort] = useState(true);
  const [shortSave, setShortSave] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("JWT"));
  const [currentUser, setCurrentUser] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [firstLounch, setFirstLounch] = useState(false);

  // MENU OPEN/CLOSE
  const hendlerOpenMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const hendlerCloseMenu = () => {
    setMenuVisible(false);
  };

  // USE EFFECT
  useEffect(()=>{
    if (loggedIn) {
      if (localStorage.getItem("allMovies")) {
        setAllMovies(JSON.parse(localStorage.getItem("allMovies")))
        } else {
          getMovies()
            .then((apiMovies)=>{
              localStorage.setItem("allMovies", JSON.stringify(apiMovies));
              setAllMovies(apiMovies);
            }
          )
      };
      console.log('point');
      if (localStorage.getItem("searchMovies")) {setSearchMovies( JSON.parse(localStorage.getItem("searchMovies")) )}
      if (JSON.parse(localStorage.getItem("searchMovies"))) {setRenderMovies( JSON.parse(localStorage.getItem("searchMovies")) )}
    };
  }, [loggedIn]) 

  useEffect(() => {
    if (jwt) {
      autorization(jwt)
        .then(()=>{
          setLoggedIn(true);
        })
    } else {
      console.log("jwt не найден");
      setCurrentUser({});
      setLoggedIn(false);
      handleLogOut();
    }
  }, [jwt]);

  useEffect(() => {
    if (loggedIn) {
      screenControl();
      Promise.all([me(), myMovies()])
        .then(([user, saveMovies]) => {
          setCurrentUser(user.user);
          setMySavedMovies(saveMovies.movie);
          setRenderSavedMovies(saveMovies.movie);
          localStorage.setItem("savedMovies", JSON.stringify(saveMovies.movie));
        })
        .catch((err) => {
          console.log(`ошибка. Сообщение: ${err.message}`);
        });
    } else {
      console.log("авторизация не выполнена");
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
  const searchMoviesFunc = (dataMovies = [], name = "", short = false) => {
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
    let savedArr = JSON.parse(localStorage.getItem("savedMovies"));
    if (savedArr) {
      setRenderSavedMovies(searchMoviesFunc(savedArr, saveKeyWord, shortSave));
      setLoading(false);
    } else {
      console.log("handleSearchInSave, фильмов не найдено");
    }
    localStorage.setItem("saveKeyWord", saveKeyWord);
  };
  async function handleSearch() {
    setLoading(true);
    let res = await searchMoviesFunc(allMovies, keyWord, short);
    setLoading(false);
    screenControl();
    setSearchMovies(res);
    // setRenderMovies(res.slice(0, startCounter));
    if (!firstLounch) {
      setFirstLounch(true);
    } else {
      localStorage.setItem("searchMovies", JSON.stringify(res));
 
    }
    sliceMovieList();
  };

  const handleInputKeyWord = (value) => {
    setKeyWord(value);
    localStorage.setItem("keyWord", value);
  };
  const handleInputSaveKeyWord = (value) => {
    setSaveKeyWord(value);
  };

  // SCREEN CONTROLL
  function screenControl() {
    if (screenWidth < SCREENSIZEMIN) {
      setStartCounter(MOVIESTARTCOUNTMIN);
      setMoreCounter(MOVIEMORECOUNTMIN);
    }
    if (SCREENSIZEMIN < screenWidth && screenWidth < SCREENSIZEMAX) {
      setStartCounter(MOVIESTARTCOUNTMID);
      setMoreCounter(MOVIEMORECOUNTMID);
    }
    if (SCREENSIZEMAX < screenWidth) {
      setStartCounter(MOVIESTARTCOUNTMAX);
      setMoreCounter(MOVIEMORECOUNTMAX);
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
  const checkMovieValid = (preMovie)  => {
    let movie = preMovie;
    if (!REGURL.test(preMovie.trailerLink)) {
      movie.trailerLink = 'https://youtu.be/'
      return movie
    } else {
      return movie
    }
  };

  const handleLike = (preMovie) => {
    let movie = checkMovieValid(preMovie);
    addMovies(movie).then((res) => {
      setMySavedMovies([res.movie, ...mySavedMovies]);
      setRenderSavedMovies([res.movie, ...renderSavedMovies]);
      localStorage.setItem("savedMovies", JSON.stringify(mySavedMovies));
    })
  };
  const handleDelete = (movie) => {
    const dellMovie = mySavedMovies.find(
      (item) =>
        Number(item.movieId) === Number(movie.id) ||
        Number(item.movieId) === Number(movie.movieId)
    );
    if (dellMovie === undefined) {
    } else {
      deleteMovies(dellMovie._id).then(() => {
        const arrWithOutDellMovie = mySavedMovies.filter(
          (item) => item.movieId !== dellMovie.movieId
        );
        setMySavedMovies(arrWithOutDellMovie);
        setRenderSavedMovies(arrWithOutDellMovie);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(arrWithOutDellMovie)
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
    setKeyWord("");
    setSaveKeyWord("");
    localStorage.removeItem("JWT");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("searchMovies");
    localStorage.removeItem("keyWord");
    localStorage.removeItem("saveKeyWord");
    localStorage.removeItem("conditionShort");
    localStorage.removeItem("conditionShortSave");
  };

  const setCurrentUserHandler = (data) => {
    setCurrentUser(data);
  };
  const onResetSavedMoviesSearch = () => {
    setRenderSavedMovies(mySavedMovies)
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/signup"
              element={<Register onLogin={handlerLogin} />}
            />
            <Route path="/signin" element={<Login onLogin={handlerLogin} />} />
            <Route path="/404" element={<ErrorPage />} />
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
                  <MoviesNew
                    menuOpen={hendlerOpenMenu}
                    menuClose={hendlerCloseMenu}
                    menuStatus={menuVisible}
                    isLoading={loading}
                    onMovies={renderMovies}
                    savedMoviesStatus={false}
                    onKeyWord={keyWord}
                    onSearchKeyWord={handleSearch}
                    onInputKeyWord={handleInputKeyWord}
                    conditionShort={short}
                    onChangeShort={setShort}
                    onMoreMovies={handleMoreMovies}
                    buttonStatus={searchMovies.length === renderMovies.length}
                    onLike={handleLike}
                    onDelete={handleDelete}
                    onReset={onResetSavedMoviesSearch}
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
                  <MoviesSave
                    menuOpen={hendlerOpenMenu}
                    menuClose={hendlerCloseMenu}
                    menuStatus={menuVisible}
                    isLoading={loading}
                    onMoviesSave={renderSavedMovies}
                    savedMoviesStatus={true}
                    onSaveKeyWord={saveKeyWord}
                    onSearchSave={handleSearchInSave}
                    onInputSaveKeyWord={handleInputSaveKeyWord}
                    conditionShortSave={shortSave}
                    onChangeShortSave={setShortSave}
                    
                    onDelete={handleDelete}
                    onReset={onResetSavedMoviesSearch}
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
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;


// <Route
// exact
// path="/movies"
// element={
//   <Movies
//     menuOpen={hendlerOpenMenu}
//     menuClose={hendlerCloseMenu}
//     menuStatus={menuVisible}
//     isLoading={loading}
//     onMovies={renderMovies}
//     onMoviesSave={renderSavedMovies}
//     savedMoviesStatus={false}
//     onKeyWord={keyWord}
//     onSaveKeyWord={saveKeyWord}
//     onSearchKeyWord={handleSearch}
//     onInputKeyWord={handleInputKeyWord}
//     onInputSaveKeyWord={handleInputSaveKeyWord}
//     conditionShort={short}
//     onChangeShort={setShort}
//     conditionShortSave={shortSave}
//     onChangeShortSave={setShortSave}
//     onMoreMovies={handleMoreMovies}
//     buttonStatus={searchMovies.length === renderMovies.length}
//     onLike={handleLike}
//     onDelete={handleDelete}
//     onReset={onResetSavedMoviesSearch}
//   />
// }
// />
// </Route>
// <Route
// exact
// path="/saved-movies"
// element={<ProtectedRoute loggedIn={loggedIn} />}
// >
// <Route
// exact
// path="/saved-movies"
// element={
//   <Movies
//     menuOpen={hendlerOpenMenu}
//     menuClose={hendlerCloseMenu}
//     menuStatus={menuVisible}
//     isLoading={loading}
//     onMovies={renderMovies}
//     onMoviesSave={renderSavedMovies}
//     savedMoviesStatus={true}
//     onKeyWord={keyWord}
//     onSaveKeyWord={saveKeyWord}
//     onSearchKeyWord={handleSearchInSave}
//     onInputKeyWord={handleInputKeyWord}
//     onInputSaveKeyWord={handleInputSaveKeyWord}
//     conditionShort={short}
//     onChangeShort={setShort}
//     conditionShortSave={shortSave}
//     onChangeShortSave={setShortSave}
//     onMoreMovies={handleMoreMovies}
//     buttonStatus={true}
//     onLike={handleLike}
//     onDelete={handleDelete}
//     onReset={onResetSavedMoviesSearch}
//   />
// }
// />
// </Route>
