import anecdotesService from '../services/anecdotesService'

export const initializeAnecdotes = ()=>{
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data: {anecdotes}
    })
  }
}

export const addVotes = (id, anecdote) => {
  return async dispatch => {
      const newAnecdote = {...anecdote}
      newAnecdote.votes += 1
      const updateAnecdote = await anecdotesService.updateAnecdotes(id,newAnecdote)
      dispatch({type:'ADD',
      data:{
        id,
        anecdote:updateAnecdote
      }
    })
  }
}

export const createNote = (note) => {
  return async dispatch => {
    const anecdote = await anecdotesService.addAnecdotes({
      content: note,
      votes: 0
    })
    dispatch({
      type:'CREATE',
      data:{
        anecdote
      }
    })
  }
}

const reducer = (state = [], action) => {
  let newState =  [...state ]
  switch(action.type){
    case 'ADD':
      const id = action.data.id
      const index = state.findIndex(item=>item.id === id)
      newState.splice(index,1,action.data.anecdote)
      break;
    case 'CREATE':
      newState = newState.concat(action.data.anecdote)
      break;
    case 'INIT_ANECDOTES':
      return [...action.data.anecdotes]
    default:
      break;
  }
  return newState.sort((x,y)=>y.votes - x.votes)
}


export default reducer