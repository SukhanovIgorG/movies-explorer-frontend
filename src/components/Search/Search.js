import { useState } from 'react'

function Search () {

  const [short, setShort] = useState(false);

  return (
    <section className='search'>
      <div className='search__area'>
        <input className='search__input' type="search"
        placeholder='Фильм'
        aria-label='search movies' required/>
        <button className='search__button'>Найти</button>
      </div>
      <div className='search__option-container'>
      <button className={`search__option-button ${short && 'search__option-button_off'}`}
      onClick={()=>setShort(!short)}></button>
      <span className='search__option-span'>Короткометражки</span>
      </div>
    </section>
  )
}

export default Search
