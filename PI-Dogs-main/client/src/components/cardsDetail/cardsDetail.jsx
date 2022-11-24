import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { clearDeatil, getDogID } from '../../redux/actions/actions'
import s from './cardsDetail.module.css'
import Nav from '../nav/nav'
import imageDefault from '../../images/imageDefault.jpg'

export default function CardsDetail() {
    
    const dispatch= useDispatch()  //hook para usar dispatch(es el que dispara la action par aue la use la store)
    const dogID = useSelector(state => state.idDog) 
    const history = useHistory()
    //console.log(dogID)
    let {id} = useParams()

    useEffect(()=>{
        dispatch(getDogID(id))
        dispatch(clearDeatil())
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
        { !dogID.id ? 
        <p className={s.loading}>Loading...</p> :
            <div className={s.detail}>
                 

                    <button className={s.back} type='button' onClick={handleClick}>BACK</button>
                    <h1>{dogID.name}</h1>
                    <img src={dogID.image ? dogID.image : imageDefault} alt=''/>
                    <span><b>Height:</b>  {dogID.height} Cm</span>
                    <span><b>Weight:</b>  {dogID.weight} Kg</span>
                    <span><b>Life Span:</b> {dogID.lifeSpan} </span>
                    <span><b>Temperaments:</b> {dogID.created === true ?  dogID.temperaments.map(d => d.name + (' ')) : dogID.temperaments}</span> 
                    
                

            </div>

            }
    </div>
 </div>

  )
}
