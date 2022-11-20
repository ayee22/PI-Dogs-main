import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getDogID } from '../../redux/actions/actions'
import s from './cardsDetail.module.css'
import Nav from '../nav/nav'
import imageDefault from '../../images/imageDefault.jpg'

export default function CardsDetail() {
    
    const dispatch= useDispatch()
    const dogID = useSelector(state => state.idDog)
    const history = useHistory()
    //console.log(dogID)
    let {id} = useParams()

    useEffect(()=>{
        dispatch(getDogID(id))
    },[dispatch])

    function handleClick(){
        history.push('/home')
    }

  return (
    <div>
        <div>
            <Nav/>
        </div>
        <div className={s.container}>
            <button type='button' onClick={handleClick}>Back</button>
            <h1>{dogID.name}</h1>
            <img src={dogID.image ? dogID.image : imageDefault} alt=''/>
            <span>Height: {dogID.height} Cm</span>
            <span>Weight: {dogID.weight} Kg</span>
            <span>Life Span: {dogID.lifeSpan} </span>
            <span>Temperaments: {dogID.temperament ? dogID.temperament : 'This dog has no temperament to show'}</span>

        </div>
    </div>

  )
}
