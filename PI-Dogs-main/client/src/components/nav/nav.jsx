import React from 'react'
import {Link} from 'react-router-dom'
import s from './nav.module.css'

export default function Nav() {
  return (
    <div className={s.nav}>
        <h1 className={s.dogs}><Link to={'/'}>Dogs</Link></h1>
        <ul>
            <li><Link to={'/home'}>Home</Link></li>
            <li><Link to={'/create'}>Create</Link></li>
        </ul>
    </div>
  )
}
