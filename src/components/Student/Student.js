function Student() {
  const year = 1991;
  const month = 11;
  const day = 12;
  const today = new Date();
  const age = today.getFullYear() - year;
  let myAge
  if (
    (today.getMonth() < month)
    || ((today.getMonth() === month && today.getDate() < day)) 
  )
  {
    myAge = age - 1 ;
  } else {
    myAge = age;
  }

  return (
    <section className="block student">
      <h2 className="block__title">Студент</h2>
      <div className="student__container">
        <div className="student__resume-container">
          <div className="student__resume-text">
            <h3 className="student__resume-title">Игорь</h3>
            <h4 className="student__resume-subtitle">
              Фронтенд-разработчик. {myAge} лет.
            </h4>
            <p className="student__resume-paragraph">
              Я родился в Липецке, уился и живу в Воронеже, закончил геологический факультет Воронежского Госсударственного Университета.
              С 2020 года увлекаюсь программированием. После того, как прошёл курс по веб-разработке, занимаюсь фриланс-заказами и нахожусь в поиске постоянной работы.
            </p>
            <a
              className="student__resume-link"
              href="https://github.com/SukhanovIgorG"
              target="_blank" rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <div
            className="student__resume-photo"
          />
        </div>
        <ul className="student__portfolio-list">
          <p className="student__portfolio-title">Портфолио</p>
          <li className="student__portfolio-item">
            <a
              className="student__portfolio-link"
              href="https://sukhanovigorg.github.io/how-to-learn/"
              target="_blank" rel="noreferrer"
            >
              Статичный сайт
            </a>
            <a
              className="student__portfolio-icon"
              href="https://sukhanovigorg.github.io/how-to-learn/"
              target="_blank" rel="noreferrer"
            >
              ↗
            </a>
          </li>
          <li className="student__portfolio-item">
            <a
              className="student__portfolio-link"
              href="https://sukhanovigorg.github.io/russian-travel/"
              target="_blank" rel="noreferrer"
            >
              Адаптивный сайт
            </a>
            <a
              className="student__portfolio-icon"
              href="https://sukhanovigorg.github.io/russian-travel/"
              target="_blank" rel="noreferrer"
            >
              ↗
            </a>
          </li>
          <li className="student__portfolio-item">
            <a
              className="student__portfolio-link"
              href="https://sukhanovigorg.github.io/mesto-react/"
              target="_blank" rel="noreferrer"
            >
              Одностраничное приложение
            </a>
            <a
              className="student__portfolio-icon"
              href="https://sukhanovigorg.github.io/mesto-react/"
              target="_blank" rel="noreferrer"
            >
              ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Student;
