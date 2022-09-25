function MovieCard ({onMovieLike, onMovieDelete, movie, key, onClick, savedMoviesStatus}) {

  function handleMovieDelete() {
    onMovieDelete(movie);
  }
  function handleMovieLike() {
    onMovieLike(movie);
  }
  function handleClick() {
    onClick(movie)
  }

  return (
    <li className="card" key={key} id={movie._id}>
    <img
      className="card__image"
      src={movie.image}
      alt={movie.nameRU}
      onClick={handleClick}
    />

    <div className="card__info">
    <div className="card__info-container">
      <h2 className="card__title">{movie.nameRU}</h2>
      <p className='card__duration'>{movie.duration}</p>
    </div>
        <button
          type="button"
          className={savedMoviesStatus ? 'card__trash': 'card__like'}
          onClick={savedMoviesStatus ? handleMovieDelete : handleMovieLike}
        />
    </div>
    {/* <button
      type="button"
      className='card__trash card__trash_visible'
      onClick={handleMovieDelete}
    /> */}
  </li>
  );
};

export default MovieCard;
