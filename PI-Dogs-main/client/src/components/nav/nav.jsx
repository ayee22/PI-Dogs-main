import React from 'react'
import {Link} from 'react-router-dom'
import s from './nav.module.css'

export default function Nav({handleSearch}) {
  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  }
  return (
    <div>
      
      <div className={s.nav}>
        <h1 className={s.dogs}><Link to={'/'}>Dogs</Link></h1>
          <div>
            <input 
            name="name"
            type="search"
            placeholder="Search..."
            onChange={e => handleInputChange(e)}  />
            <button type="submit">SEARCH</button>
          </div>
          <ul>
              <li><Link to={'/home'}>Home</Link></li>
              <li><Link to={'/create'}>Create</Link></li>
          </ul>
      </div>
    </div>
  )
}
