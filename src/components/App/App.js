import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/ErrorPage";
import Register from "../Register/Register";
import Landing from "../Landing/Landing";
import Movies from "../Movies/Movies";
import Profille from "../Profile/Profile";

import { startMovies, savedMovies } from "../../constants/constans"

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route exact path="/" element={<Landing />} />
          <Route
            exact
            path="/movies"
            element={<Movies movies={startMovies} savedMoviesStatus={false}/>}
          />
          <Route
            exact
            path="/saved-movies"
            element={<Movies movies={savedMovies} savedMoviesStatus={true}/>}
          />
          <Route exact path="/profile" element={<Profille />} />
          <Route exact path="/*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
