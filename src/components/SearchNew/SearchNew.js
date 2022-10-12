import { useState, useEffect } from "react";

function SearchNew({
  keyWordState,
  onInput,
  onSearch,
  shortState,
  onSetShort,
}) {
  const [keyWord, setKeyWord] = useState(keyWordState);
  const [validMess, setValidMess] = useState("");

  // useEffect(()=>{
  //   setKeyWord(localStorage.getItem("keyWord") !== null ? localStorage.getItem("keyWord") : '');
  //   onInput(localStorage.getItem("keyWord") !== null ? localStorage.getItem("keyWord") : '');
  //   onSetShort(localStorage.getItem("conditionShort") !== null ? JSON.parse(localStorage.getItem("conditionShort")) : false);
  // }, []);

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

  const handleInput = (v) => {
    setKeyWord(v.target.value);
    onInput(v.target.value);
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
          value={ keyWord
              ? keyWord
              : ""
          }
          onChange={handleInput}
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
            shortState ? "search__option-button" : "search__option-button_off"
          }
          onClick={onSetShort}
        ></button>
        <span className="search__option-span">Короткометражки</span>
      </div>
    </section>
  );
}

export default SearchNew;
