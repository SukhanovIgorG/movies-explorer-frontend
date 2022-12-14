import { useState, useEffect } from "react";

function MovieCard({ movie, render, savedMoviesStatus, onLike, onDelete }) {
  const [isLiked, setIsLiked] = useState(false);
  let setMovie = movie ? movie : {};

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
      let savedMovies = localStorage.getItem("savedMovies") ? Array.from(
        JSON.parse(localStorage.getItem("savedMovies")) ) : [];
      let filterMovies = savedMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(movie.nameRU.toLowerCase())
      );
      if (filterMovies.length > 0) {
        setIsLiked(true);
      }
    }
  }, [ movie.nameRU, savedMoviesStatus ]);

  function handleMovieDelete() {
    console.log('like')
    setIsLiked(false);
    onDelete(movie);
  }

  function handleLikeOrDell() {
    if (isLiked) {
      setIsLiked(false);
      onDelete(movie);
    } else {
      setIsLiked(true);
      onLike(movie);
    }
  }

  return (
    <li className="card">
      <a href={setMovie.trailerLink} target="_blanc">
        <img
          className="card__image"
          src={
            savedMoviesStatus
              ? setMovie.image
              : `https://api.nomoreparties.co/${setMovie.image.url}`
          }
          alt={movie.nameRU}
        />
      </a>

      <div className="card__info">
        <div className="card__info-container">
          <h2 className="card__title">{setMovie.nameRU}</h2>
          <p className="card__duration">{`${Math.floor(setMovie.duration / 60)}ч ${
            setMovie.duration % 60
          }м `}</p>
        </div>
        { savedMoviesStatus && <button
          type="button"
          className="card__trash"
          onClick={handleMovieDelete}
        />}
        { !savedMoviesStatus && <button
          type="button"
          className={isLiked
            ? "card__like card__like_active"
            : "card__like"}
          onClick={handleLikeOrDell}
        />}
      </div>
    </li>
  );
}

export default MovieCard;
