import React from 'react'
import s from './paginado.module.css'

export default function Paginado({dogsPerPage, allDogs, paginado}) {
  const pagNumber = []

  for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++){ //devuelve el entero mayor o igual más próximo a un número 
    pagNumber.push(i)
  }
  return (
    <div className={s.container}>
      
        <ul>
          {
            pagNumber && pagNumber.map(num => (
              <li key={num}>
                <a onClick={() => paginado(num)}>{num}</a>
              </li>
            ))
          }
        </ul>
      
    </div>
  )
}


