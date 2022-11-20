const initialState = {
    dogs: [],
    idDog: [],
    allDogs: []
}
function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'GET_DOG_ID':
            return{
                ...state,
                idDog: action.payload[0] ? action.payload[0] : action.payload
            }
        case 'FILTER_WEIGHT': {
            const all = state.allDogs

            /*  const weightFilter =  all.sort((a,b)=> {
                if(!isNaN(a.weight[0]) && !isNaN(b.weight[0]) && !a.weight[0] && !b.weight[0]){
                   return console.log('entreeeeeeeeeeee')
                }
             })
                console.log(weightFilter) */
            /* return{
                 ...state,
                 allDogs: weightFilter
             };  */        
            
        }
            
        case 'FILTER_SOURCE': {
            const all = state.allDogs
           const ekis = all.map(e => {
            if(!e.length){
                return e
           }
           })
        
           console.log(ekis) 
            return {
                ...state,
             
            }
        }
            
        case 'ORDER_BY_NAME': {
            const allDogs = state.allDogs
            const orderDogs = action.payload === 'A-Z' ?
            allDogs.sort((a,b) => 
                a.name.localeCompare(b.name)) 
            : allDogs.sort((a,b) => 
                b.name.localeCompare(a.name))
            
            return {
                ...state,
                allDogs: orderDogs
            }
        }
            
        default: 
            return state
    }
    
    
}

export default rootReducer