
const initialValue = ''
let _timeoutID = null
export const changeMessage = (message,time) =>{
    return async dispatch => {
        dispatch({
            type:'INFO',
            message: message
        })
        _timeoutID && clearTimeout(_timeoutID)
        _timeoutID = setTimeout(() =>{
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