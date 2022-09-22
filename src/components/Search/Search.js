function Search () {
  return (
    <div className='search'>
      <div className='search__area'>
        <input className='search__input' type="search"
        placeholder='Фильм'
        aria-label='search movies'/>
        <button className='search__button'>Найти</button>
      </div>
      <div className='search__option-container'>
      <button className='search__option-button'></button>
      <span className='search__option-span'>Короткометражки</span>
      </div>
    </div>
  )
}

export default Search
