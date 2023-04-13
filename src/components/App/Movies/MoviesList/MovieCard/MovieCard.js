import {useMemo} from 'react';

function MovieCard({movie, savedMoviesStatus, onLike, onDelete, saveMovies}) {
  let setMovie = movie ? movie : {};

  const isLiked = useMemo(() => {
    if (saveMovies.length > 0) {
      return saveMovies.find(
        (item) => item.nameRU.toLowerCase() === movie.nameRU.toLowerCase()
      );
    } else {
      return false;
    }
  }, [movie.nameRU, saveMovies]);

  const handleLikeOrDell = () => {
    isLiked || savedMoviesStatus ? onDelete(movie) : onLike(movie);
  };

  return (
    <li className="card">
      <a
        href={setMovie.trailerLink}
        target="_blanc"
      >
        <img
          className="card__image"
          src={`https://api.nomoreparties.co/${setMovie.image.url}`}
          alt={movie.nameRU}
        />
      </a>

      <div className="card__info">
        <div className="card__info-container">
          <h2 className="card__title">{setMovie.nameRU}</h2>
          <p className="card__duration">{`${Math.floor(
            setMovie.duration / 60
          )}ч ${setMovie.duration % 60}м `}</p>
        </div>
        {savedMoviesStatus && (
          <button
            type="button"
            className="card__trash"
            onClick={handleLikeOrDell}
          />
        )}
        {!savedMoviesStatus && (
          <button
            type="button"
            className={isLiked ? 'card__like card__like_active' : 'card__like'}
            onClick={handleLikeOrDell}
          />
        )}
      </div>
    </li>
  );
}

export default MovieCard;
