import MovieCard from "../MovieCard/MovieCard";

function MoviesList({
  movies,
  render,
  savedMoviesBlock,
  children,
  addLike,
  deleteLike,
}) {
  function handleMovieDelete() {}
  function handleMovieLike() {}

  return (
    <section className="movies-list__container">
      <ul className="movies-list">
        {Array.isArray(movies)
          ? movies.map((movie) => (
              <MovieCard
                key={movie.id || movie.movieId}
                onMovieLike={handleMovieLike}
                onMovieDelete={handleMovieDelete}
                movie={movie}
                savedMoviesStatus={savedMoviesBlock}
                onLike={addLike}
                onDelete={deleteLike}
                render={render}
              />
            ))
          : console.log("нет карт для отображения")}
      </ul>
      {children}
    </section>
  );
}

export default MoviesList;
