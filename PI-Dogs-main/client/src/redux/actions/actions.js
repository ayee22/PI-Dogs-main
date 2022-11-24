import axios from 'axios'

export function getDogs(){
    return async (dispatch)=>{
    try {
      const json = await axios.get('http://localhost:3001/dogs')
      return dispatch({
          type: "GET_DOGS",
          payload: json.data
        })
    } catch (error) {
        console.log(error)        
    }}
}

export function getDogID(id){
    return async(dispatch) => {
        try {
            const json = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: "GET_DOG_ID",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function searchDog(name){
    return async(dispatch) => {
        try {
            const json = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: 'SEARCH_DOG',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTemperaments(){
    return async(dispatch) => {
        try {
            const json = await axios.get('http://localhost:3001/temperaments')
            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postBreed(payload){
    return async(dispatch) => {
        try {
            const json = await axios.post('http://localhost:3001/dogs', payload) //payload que me llega en el front
            return dispatch({
                type: 'POST_BREED',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export function weightFilter(payload){
    return {
        type: 'FILTER_WEIGHT',
        payload
    }
}

export function filterSource(payload){
    return {
        type: 'FILTER_SOURCE',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload

    }
}

export function filterByTemperament(payload){
    return {
        type: 'FILTER_BY_TEMP',
        payload
    }
}

export function filterByName(payload){
    return {
        type: 'FILTER_BY_NAME',
        payload
    }
}

export function clearDeatil() {
    return {
        type: 'CLEAR_DETAIL',
       
    }
}