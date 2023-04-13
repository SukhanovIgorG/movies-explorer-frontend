import MovieCard from './MovieCard/MovieCard';

function MoviesList({
  movies,
  render,
  savedMoviesStatus,
  children,
  addLike,
  deleteLike,
  onRender,
  saveMovies,
}) {
  return (
    <section className="movies-list__container">
      <ul className="movies-list">
        {Array.isArray(movies)
          ? movies.map((movie) => (
              <MovieCard
                saveMovies={saveMovies}
                key={movie.id}
                movie={movie}
                savedMoviesStatus={savedMoviesStatus}
                onLike={addLike}
                onDelete={deleteLike}
                render={render}
                onRender={onRender}
              />
            ))
          : console.log('нет карт для отображения')}
      </ul>
      {children}
    </section>
  );
}

export default MoviesList;
