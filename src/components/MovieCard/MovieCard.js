import { useState, useEffect } from "react";

function MovieCard({ movie, render, savedMoviesStatus, onLike, onDelete }) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("savedMovies")) {
      let savedMovies = Array.from(
        JSON.parse(localStorage.getItem("savedMovies"))
      );
      let filterMovies = savedMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(movie.nameRU.toLowerCase())
      );
      if (filterMovies.length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [render, movie.nameRU]);
  
  useEffect(() => {
    if (savedMoviesStatus) {
      setIsLiked(true);
    } else {
      let savedMovies = Array.from(
        JSON.parse(localStorage.getItem("savedMovies"))
      );
      let filterMovies = savedMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(movie.nameRU.toLowerCase())
      );
      if (filterMovies.length > 0) {
        setIsLiked(true);
      }
    }
  }, [movie.nameRU, savedMoviesStatus]);

  function handleMovieDelete() {
    onDelete(movie);
    setIsLiked(false);
  }
  function handleMovieAdd() {
    setIsLiked(true);
    onLike(movie);
  }

  return (
    <li className="card">
      <a href={movie.trailerLink} target="_blanc">
        <img
          className="card__image"
          src={
            savedMoviesStatus
              ? movie.image
              : `https://api.nomoreparties.co/${movie.image.url}`
          }
          alt={movie.nameRU}
        />
      </a>

      <div className="card__info">
        <div className="card__info-container">
          <h2 className="card__title">{movie.nameRU}</h2>
          <p className="card__duration">{`${Math.floor(movie.duration / 60)}ч ${
            movie.duration % 60
          }м `}</p>
        </div>
        <button
          type="button"
          className={
            savedMoviesStatus
              ? "card__trash"
              : isLiked
              ? "card__like card__like_active"
              : "card__like"
          }
          onClick={
            savedMoviesStatus
              ? handleMovieDelete
              : isLiked
              ? handleMovieDelete
              : handleMovieAdd
          }
        />
      </div>
    </li>
  );
}

export default MovieCard;
