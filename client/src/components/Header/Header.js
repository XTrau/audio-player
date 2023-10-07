import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

function Header({ search, setSearch }) {
  return (
    <header>
      <div className='header-left'>
        <Link to='/'>
          <h2>AudioPlayer</h2>
        </Link>
      </div>

      <div className='search'>
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Поиск...'
        />
      </div>

      <div className='header-right'>
        <Link to='/'>
          <span>Music</span>
        </Link>
        <Link to='favorite'>
          <span>Favorite</span>
        </Link>
        <Link to='about'>
          <span>About</span>
        </Link>
        <Link>
          <span>Support</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
