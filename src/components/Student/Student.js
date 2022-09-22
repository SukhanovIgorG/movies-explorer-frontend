import photo from '../../image/portfolio-photo.jpg';

function Student() {
  return (
    <div className='block student'>
      <h2 className='block__title'>Студент</h2>
      <div className='student__container'>
        <div className='student__resume-container'>
          <div className='student__resume-text'>
            <h3 className='student__resume-title'>Игорь</h3>
            <h4 className='student__resume-subtitle'>Фронтенд-разработчик. 30 лет.</h4>
            <p className='student__resume-paragraph'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className='student__resume-link' href='https://github.com/SukhanovIgorG'>GitHub</a>
          </div>
          <img className='student__resume-photo' src={photo} alt='фото резюме'/>
        </div>
        <ul className='student__portfolio-list'>
          <p className='student__portfolio-title'>Портфолио</p>
          <li className='student__portfolio-item'>
            <a className='student__portfolio-link' href='#'>Статичный сайт</a>
            <a className='student__portfolio-icon' href='#'>↗</a>
          </li>
          <li className='student__portfolio-item'>
            <a className='student__portfolio-link' href='#'>Адаптивный сайт</a>
            <a className='student__portfolio-icon' href='#'>↗</a>
          </li>
          <li className='student__portfolio-item'>
            <a className='student__portfolio-link' href='#'>Одностраничное приложение</a>
            <a className='student__portfolio-icon' href='#'>↗</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Student
