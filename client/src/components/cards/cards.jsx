import React from 'react'
import { Link } from 'react-router-dom'
import s from './cards.module.css'
import imageDefault from '../../images/imageDefault.jpg'

export default function Cards({image, id, name, weight, temperaments}) {
  return (
    <div className={s.cards}>
        <h1>{name}</h1>
        <img src={image ? image : imageDefault} alt='dog photo'/>
        <span>Weight: {weight.length === 2 ? weight[0]+' - '+  weight[1] : weight}</span> {/* si weight trae mas de 1 posicion */}
        <span> Temperaments: {temperaments}</span>                                         {/* que una la posicion 0 y 1 mediante el - */}
        <button><Link to={`/detail/${id}`}>Dog details</Link></button>                     {/* por los traidos por db y si no que lo traiga normal */}
    </div>
  )
}
