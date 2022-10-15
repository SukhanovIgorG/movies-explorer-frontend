function Footer() {

  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__text'>© {currentYear}</p>
        <div className='footer__nav-container'>
          <a className='footer__text footer__text_link' href='https://practicum.yandex.ru/' target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className='footer__text footer__text_link' href='https://github.com/SukhanovIgorG' target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
