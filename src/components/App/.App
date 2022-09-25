// import { CurrentUserContext } from "../context/CurrentUserContext";
// import { useEffect, useState } from "react";

// import api from "../../utils/Api";


// const [loggedIn, setLoggedIn] = React.useState(false);
// const [currentUser, setCurrentUser] = React.useState({});

// const navigate = React.useNavigate();

  // const [startMovies, setStartMovies] = useState

  // useEffect(() => {
  //   // api
  //   //   .loadUserInfo()
  //   //   .then((userData) => {
  //   //     setCurrentUser(userData);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(`ошибка загрузки данных о пользователе ${err}`);
  //   //   });
  //     api
  //     .getMovies()
  //     .then((data) => {
  //       setStartMovies(data);
  //     })
  //     .catch((err) => {
  //       console.log(`ошибка загрузки стартовых карточек ${err}`);
  //     });
  // }, []);

      //       <CurrentUserContext.Provider value={currentUser}> 
      // <Routes>
      //   <Route path="/signup" element={<Register/>} />
      //   <Route path="/signin" element={<Login/> } />
      //   <Route path="/*"  element={loggedIn ? <Navigate replace to="/signin" /> : <Navigate replace to="/main" /> } />
      //   <ProtectedRoute nav="/main" loggedIn={loggedIn} component={Main} />
      //   <Route exact path='/main' element={<ProtectedRoute loggedIn={loggedIn}/>}>
      //     <Route exact path='/main' element={<Main/>}/>
      //   </Route>
      // </Routes>
      // </CurrentUserContext.Provider>
