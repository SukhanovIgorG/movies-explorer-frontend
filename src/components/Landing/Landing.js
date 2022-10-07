import { useNavigate } from "react-router-dom";

import Hero from "../Hero/Hero";
import About from "../About/About";
import Tech from "../Tech/Tech";
import Student from "../Student/Student";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Landing( {login, menuOpen, menuClose, menuStatus} ) {
  const navigate = useNavigate();

  return (
    <>
      <Header colorDark={true} loggedIn={login}>
            {login ? 
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
                 className="header__button header__button_landing header__button_hover theme-dark"
                 onClick={() => {
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
                 <button
                   className="header__button header__button_films header__button_hover theme-dark"
                   onClick={() => {
                    menuClose();
                    navigate("/movies");
                  }
                }
                 >
                   Фильмы
                 </button>
                 <button
                   className="header__button header__button_colections header__button_hover theme-dark"
                   onClick={() => {
                    menuClose();
                    navigate("/saved-movies");
                  }
                }
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
                   className="header__button header__button_account theme-dark"
                   onClick={() => {
                      menuClose();
                      navigate("/profile");
                    }
                  }
                 >
                   Аккаунт
                 </button>
                 <button
                   className={menuStatus ? "header__button header__button_account-img" : "header__button header__button_account-img header__button_account-img_color-dark"}
                   onClick={() => {
                     menuClose();
                      navigate("/profile");
                    }
                  }
                 ></button>
               </div>
             </div>
             <button
               onClick={menuOpen}
               className={`header__menu-button
             ${
               (menuStatus && "header__menu-button_open") ||
               (!menuStatus && "header__menu-button_clos_color_dark")
             }
             `}
             ></button>
           </div>
            : 
            <div className={"header__menu-container"}>
            <div className={"header__button-container"}>
            <button
                className="header__button header__button_sign-up"
                onClick={() => {
                  menuClose();
                  navigate("/signup");
                }
              }
              >
                Регистрация
              </button><button
                className="header__button header__button_sign-in"
                onClick={() => {
                  menuClose();
                  navigate("/signin");
                }
                }
              >
                  Войти
                </button>
                </div>
              </div>
              }

      </Header>
      <main className="landing">
        <Hero />
        <About />
        <Tech />
        <Student />
      </main>
      <Footer />
    </>
  );
}

export default Landing;
