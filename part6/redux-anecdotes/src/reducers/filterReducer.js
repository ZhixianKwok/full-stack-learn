const initialState = ''

export const changeFilterWord = (word)=>{
    return {
        type:'FILTER',
        filter: word
    }
}
const filterReducer = (state = initialState , action) =>{
    switch(action.type){
        case 'FILTER':
            return action.filter
        default:
            return state
    }
}

export default filterReducer