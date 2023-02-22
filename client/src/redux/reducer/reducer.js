const initialState = {
    dogs: [],
    idDog: [],
    allDogs: [],
    searchDog: [],
    temperaments: [],
    newBreeds: []
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
        
        case 'SEARCH_DOG':
            return{
                ...state,
                searchDog: action.payload
            }
        
        case 'POST_BREED':
            return{
                ...state,
            }
        
        case 'FILTER_WEIGHT': {
            const all = state.allDogs
            const weightFilter = action.payload === 'weight-min'    
            ? all.sort((a, b) => a.weight[1] - b.weight[1]) //resta para ver si da menos uno ouno
            : all.sort((a,b) => b.weight[1] - a.weight[1])  
            console.log(weightFilter)  
            return {
                ...state,
                allDogs: weightFilter
            }
        }//ready 
            
        case 'FILTER_SOURCE': {
            const all = state.dogs
            const sourceDogs = action.payload === 'db'
            ? all?.filter(e => e.created === true)
            : all?.filter(e => e.created === false)
            return {
                ...state,
                allDogs: sourceDogs
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
        }//ready 
        
        case 'GET_TEMPERAMENTS': {
            return {
                ...state,
                temperaments: action.payload
            }
        }
        
        case 'FILTER_BY_TEMP':{
            const all = state.dogs
            let filterTemps = action.payload === 'all' ? all
            : all.filter(a => a.temperaments?.includes(action.payload) || (a.created && a.temperaments?.some(t => t.name === action.payload)))
            /*
            if (!all.length) {
                filterTemps = state.dogs.filter(a => a.temperament?.toLowerCase().includes(action.payload.toLowerCase()))
            }
            */
            return {
                ...state,
                allDogs: filterTemps
            }
        }

        case 'FILTER_BY_NAME':{
            const all = state.dogs; 
            const filterDogs = all.filter((d) => d.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                allDogs: filterDogs
            }
        }

        case 'CLEAR_DETAIL': {
            return {
                ...state,
                idDog: []
            }
        }
        
        default: 
            return state
    }
    
    
}

export default rootReducer