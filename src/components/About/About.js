function About() {
  return (
    <section className='block about'>
      <h2 className='block__title'>О проекте</h2>
      <div className='about__container'>
        <div className='about__content-container'>
          <div className='about__text-container'>
            <h3 className='about__text-title'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='about__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className='about__text-container'>
            <h3 className='about__text-title'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='about__text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className='about__progress-bar-container'>
          <div className='about__progress-bar'>
            <div className='about__progress-bar-block about__progress-bar-block_back'>1 неделя</div>
            <div className='about__progress-bar-block about__progress-bar-block_front'>1 неделя</div>
          </div>
          <div className='about__progress-bar'>
            <div className='about__progress-bar-span about__progress-bar-span_back'>Back-end</div>
            <div className='about__progress-bar-span about__progress-bar-span_front'>Front-end</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
