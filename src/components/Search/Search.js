import { useState, useEffect } from "react";

function Search({
  savedMoviesStatus,
  keyWordState,
  saveKeyWordState,
  onInput,
  onSaveInput,
  onSearch,
  shortState,
  onSetShort,
  shortStateSave,
  onSetShortSave,
}) {
  let buttonState = savedMoviesStatus ? shortStateSave : shortState;
  const [keyWord, setKeyWord] = useState(keyWordState);
  const [saveKeyWord, setSaveKeyWord] = useState(saveKeyWordState);
  const [validMess, setValidMess] = useState("");

  useEffect(()=>{
    setKeyWord(localStorage.getItem("keyWord") !== null ? localStorage.getItem("keyWord") : '');
    onInput(localStorage.getItem("keyWord") !== null ? localStorage.getItem("keyWord") : '');
    onSetShort(localStorage.getItem("conditionShort") !== null ? JSON.parse(localStorage.getItem("conditionShort")) : false);
    // onSearch()
  }, []);

  const checkValid = (text) => {
    if (text.length === 0) {
      setValidMess('введите ключевое слово')
    }
    else if (text.length  > 20) {
      setValidMess('вы ввели слишком длинное название')
    }
    else {
      setValidMess('')
    }
  };

  const handleShort = () => {
    onSetShort(!shortState);
    localStorage.setItem("conditionShort", !shortState);
  };
  const handleShortSave = () => {
    onSetShortSave(!shortStateSave);
  };

  const handleInput = (v) => {
    setKeyWord(v.target.value);
    onInput(v.target.value);
    checkValid(v.target.value);
  };

  const handleSaveInput = (v) => {
    setSaveKeyWord(v.target.value);
    onSaveInput(v.target.value);
    checkValid(v.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <section className="search">
      
        <form className="search__area" noValidate onSubmit={handleSearch}>
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
        </form>
     
      {validMess ? (
        <p className="search__span">{validMess}</p>
      ) : (
        ""
      )}

      <div className="search__option-container">
        <button
          className={
            buttonState ? "search__option-button" : "search__option-button_off"
          }
          onClick={ savedMoviesStatus ? handleShortSave : handleShort}
        ></button>
        <span className="search__option-span">Короткометражки</span>
      </div>
    </section>
  );
}

export default Search;
