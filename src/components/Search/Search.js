import { useState } from "react";

function Search({
  savedMoviesStatus,
  keyWordState,
  saveKeyWordState,
  onInput,
  onSaveInput,
  onSearch,
  shortState,
  onSetShort,
}) {
  const [keyWord, setKeyWord] = useState(keyWordState);
  const [saveKeyWord, setSaveKeyWord] = useState(saveKeyWordState);

  const [short, setShort] = useState(shortState);

  const handleShort = () => {
    setShort(!short);
    onSetShort(!short);
  };

  const handleInput = (v) => {
    setKeyWord(v.target.value);
    onInput(v.target.value);
  };

  const handleSaveInput = (v) => {
    setSaveKeyWord(v.target.value);
    onSaveInput(v.target.value);
  };

  const handleSearch = () => {
    onSearch();
  };

  return (
    <section className="search">
      <div className="search__area">
        <input
          className="search__input"
          type="string"
          placeholder="Фильм"
          aria-label="search movies"
          value={
            savedMoviesStatus
              ? saveKeyWord
                ? saveKeyWord
                : ""
              : keyWord
              ? keyWord
              : ""
          }
          onChange={savedMoviesStatus ? handleSaveInput : handleInput}
          required
        />
        <button className="search__button" onClick={handleSearch}>
          Найти
        </button>
      </div>
      {String(keyWord).length === 0 ? (
        <p className="search__span">Введите ключевое слово</p>
      ) : (
        ""
      )}
      <div className="search__option-container">
        <button
          className={
            !short ? "search__option-button_off" : "search__option-button"
          }
          onClick={handleShort}
        ></button>
        <span className="search__option-span">Короткометражки</span>
      </div>
    </section>
  );
}

export default Search;
