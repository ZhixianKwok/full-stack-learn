
const initialValue = ''

export const changeMessage = (message,time) =>{
    return async dispatch => {
        dispatch({
            type:'INFO',
            message: message
        })
        setTimeout(() =>{
            dispatch({ 
                type:'INFO',
                message: ''
            })
        },time)
    }
}

const noticficReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'INFO':
            return action.message
        default:
            return state
    }
}

export default noticficReducer