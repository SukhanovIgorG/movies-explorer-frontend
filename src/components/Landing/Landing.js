import { useNavigate } from "react-router-dom";

import Hero from "../Hero/Hero";
import About from "../About/About";
import Tech from "../Tech/Tech";
import Student from "../Student/Student";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Header colorDark={true} loggedIn={false}>
        <div className={"header__menu-container"}>
          <div className={"header__button-container"}>
            <button
              className="header__button header__button_sign-up"
              onClick={() => navigate("/signup")}
            >
              Регистрация
            </button>
            <button
              className="header__button header__button_sign-in"
              onClick={() => navigate("/signin")}
            >
              Войти
            </button>
          </div>
        </div>
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
