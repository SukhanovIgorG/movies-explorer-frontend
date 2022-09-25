function ErrorPage () {
  return (
    <div className='error-page'>
      <div className='error-page__container'>
        <h2 className='error-page__code'>404</h2>
        <p className='error-page__message'>Страница не найдена</p>
        <a href='#' className='error-page__back'>Назад</a>
      </div>
    </div>
  )
}

export default ErrorPage
