const notificReducer = (state="",action) => {
    switch (action.type) {
        case 'INFO':
            return action.message
        default:
            return state
    }
}

export const createMessage = (message) => {
    return {
      type: 'INFO',
      message: message
    }
  }

export default notificReducer
