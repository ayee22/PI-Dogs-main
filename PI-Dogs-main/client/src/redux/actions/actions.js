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

