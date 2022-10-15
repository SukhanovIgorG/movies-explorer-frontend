import { Link } from 'react-router-dom';

function ErrorPage () {
  return (
    <div className='error-page'>
      <div className='error-page__container'>
        <h2 className='error-page__code'>404</h2>
        <p className='error-page__message'>Страница не найдена</p>
        <Link href='#' className='error-page__back' to={-1}>Назад</Link>
      </div>
    </div>
  )
}

export default ErrorPage
