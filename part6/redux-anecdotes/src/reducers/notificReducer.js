
const initialValue = ''

export const changeMessage = (message) =>{
    return {
        type:'INFO',
        message: message
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