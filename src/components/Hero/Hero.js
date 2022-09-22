import logo from "../../image/landing-logo.svg";

function Hero() {
  return (
    <div className="hero">
      <div className="hero__container">
        <div className="hero__subcontainer">
          <h2 className="hero__title">
            Учебный проект студента факультета Веб-разработки.
          </h2>
          <h3 className="hero__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h3>
          <button className="hero__button">Узнать больше</button>
        </div>
        <img src={logo} alt="hero logo" className="hero__logo" />
      </div>
    </div>
  );
};

export default Hero;
