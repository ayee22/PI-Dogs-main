import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/nav'
import {useDispatch, useSelector} from 'react-redux'
import { clearDeatil, getDogs, getTemperaments, orderByName, weightFilter, filterSource, filterByTemperament, filterByName } from '../../redux/actions/actions'
import Cards from '../../components/cards/cards'
import s from './homePage.module.css'
import Paginado from '../../components/paginado/paginado'
import Filters from '../../components/filters/filters'

export default function HomePage() {
  const dispatch = useDispatch()            //hook para usar dispatch(es el que dispara la action par aue la use la store)
  const allDogs = useSelector((state) => state.allDogs)  //trae el estado global(reducer), alldogs es el sin modificar
  const temperaments = useSelector((state) => state.temperaments) //trae el estado global de temperaments tambien
  const [order, setOrder] = useState('')      //estado local del componente(o pasarseloa un hijo)devuleve el segundo parametro para actualizar el valor del primero
                                              //estado local vacio que lo uso solo para que muestre 
  const [dogsAll, setDogsAll] = useState([]) 

  
  //paginado
  const [currentPage, setCurrentPage] = useState(1) // empiezo de la pagina 1
  const [dogsPerPage, setDogsPerPage] = useState(8) //cuantos dogs por pagina
  let ilastDog = currentPage * dogsPerPage // 2*8 = 16(INDEX)(pag2) 
  let ifirstDog = ilastDog - dogsPerPage   // 16 - 8 = 8(INDEX) 
  let currentDogs = allDogs.slice(ifirstDog, ilastDog) //corta desde la posicion 8 hasta la 16
  
  useEffect(() => {                 //el use efect se usa para el manejo de vida del componente
    dispatch(getDogs())             //dispacha la accion al action 
    dispatch(getTemperaments())
    dispatch(clearDeatil())
  },[dispatch])                     //dependencia para saber cuando debe actualizarse, porque si no se actualiza en bucle

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
    setDogsAll(e.target.value)
    //setOrder(e.target.value)
  }
  
  //filtro por api o db
  const filterByAPIorDB = (e) => {
    e.preventDefault()
    dispatch(filterSource(e.target.value))
    setOrder(e.target.value)
  
  }
  
  //filtro por temperamento
  const filterTemp = (e) => {
     dispatch(filterByTemperament(e.target.value));
    setDogsAll(e.target.value)
  }
   
//searcg bar
  const handleSearch = (query) => {
    dispatch(filterByName(query));
  }

  const handleClick =() => {
    
  }

  console.log(allDogs.filter(f => f.weight[1] <= 10))
  return (
    <div>
      <button onClick={handleClick}>click me</button>
      <div>
          <Nav handleSearch={handleSearch} />
      </div>
      <div>
        <Filters filterTemp={filterTemp} orderAlph={orderAlph} filterWeight={filterWeight} filterByAPIorDB={filterByAPIorDB} temperaments={temperaments} />
      </div>
      <div>
      <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/> 
      </div>
      <div className={s.containerCards}>
          {
              currentDogs && currentDogs.map((e) => {
              return <Cards name={e.name} image={e.image} id={e.id} weight={e.weight} temperaments={e.created === true ? e.temperaments.map(t => t.name) : e.temperaments} key={e.id}/> 
              
            })
          }
      </div>
    </div> 
  )
}
