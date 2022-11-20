import React from 'react'
import { Link } from 'react-router-dom'
import s from './cards.module.css'
import imageDefault from '../../images/imageDefault.jpg'

export default function Cards({image, id, name, weight, temperament}) {
  return (
    <div className={s.cards}>
        <h1>{name}</h1>
        <img src={image ? image : imageDefault} alt='dog photo'/>
        <span>Weight: {weight}</span>
        <span> Temperaments: {temperament}</span>
        <button><Link to={`/detail/${id}`}>Dog details</Link></button>
    </div>
  )
}
