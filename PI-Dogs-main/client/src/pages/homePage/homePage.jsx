import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/nav'
import {useDispatch, useSelector} from 'react-redux'
import { filterSource, getDogs, orderByName, weightFilter } from '../../redux/actions/actions'
import Cards from '../../components/cards/cards'
import s from './homePage.module.css'
import Paginado from '../../components/paginado/paginado'
import Filters from '../../components/filters/filters'

export default function HomePage() {
  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.dogs)
  const [order, setOrder] = useState('') //devuleve el segundo parametro para actualizar el valor del primero
  
  
  //paginado
  const [currentPage, setCurrentPage] = useState(1) // empiezo de la pagina 1
  const [dogsPerPage, setDogsPerPage] = useState(8) //cuantos dogs por pagina
  const ilastDog = currentPage * dogsPerPage
  const ifirstDog = ilastDog - dogsPerPage
  const currentDogs = allDogs.slice(ifirstDog, ilastDog)
  
  useEffect(() => {
    dispatch(getDogs())
  },[dispatch])

  const paginado = (pagNumber) => {
    setCurrentPage(pagNumber)
  }
  

  //filtro A-Z / Z-A
  const orderAlph = (e) => {
    dispatch(orderByName(e.target.value))
    setOrder(e.target.value)
   }

  //filtro por peso
  const filterWeight = (e) => {
    dispatch(weightFilter(e.target.value))

  }
  
  //filtro por api o db
  const filterByAPIorDB = (e) => {
    dispatch(filterSource(e.target.value))
    setOrder(e.target.value)
  }
  
  return (
    <div>
      <div>
          <Nav />
        
      </div>
      <div>
        <Filters orderAlph={orderAlph} filterWeight={filterWeight} filterByAPIorDB={filterByAPIorDB}/>
      </div>
      <div>
      <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/> 
      </div>
      <div className={s.containerCards}>
          {
              currentDogs && currentDogs.map((e) => {
              return <Cards name={e.name} image={e.image} id={e.id} weight={e.weight} temperament={e.temperament} key={e.id}/> 
              
            })
          }
      </div>
    </div> 
  )
}
