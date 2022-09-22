import MovieCard from "../MovieCard/MovieCard";

function MoviesList({ movies, savedMoviesBlock }) {
  function handleMovieClick() {}
  function handleMovieDelete() {}
  function handleMovieLike() {}

  return (
    <div className="movies-list__container">
      <ul className="movies-list">
        {movies.map((movie) => (
          <MovieCard
            onMovieLike={handleMovieLike}
            onMovieDelete={handleMovieDelete}
            movie={movie}
            key={movies._id}
            savedMoviesStatus={savedMoviesBlock}
            onClick={(movie) => {
              handleMovieClick(movie);
            }}
          />
        ))}
      </ul>
      <button
        className={
          savedMoviesBlock
            ? "movies-list__button movies-list__button_hidden"
            : "movies-list__button"
        }
      >
        Еще
      </button>
    </div>
  );
}

export default MoviesList;
