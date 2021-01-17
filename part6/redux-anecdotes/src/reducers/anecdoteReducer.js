const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const addVotes = (id) => {
  return {
    type:'ADD',
    data:{
      id
    }
  }
}

export const createNote = (note) => {
  return {
    type:"CREATE",
    data:{
      note
    }
  }
}

const reducer = (state = initialState, action) => {
  let newState =  [...state ]
  switch(action.type){
    case 'ADD':
      const id = action.data.id
      const index = state.findIndex(item=>item.id === id)
      const newAnecdote = {...state[index]}
      newAnecdote.votes += 1
      newState.splice(index,1,newAnecdote)
      break;
    case 'CREATE':
      newState = newState.concat({
        content: action.data.note,
        id:getId(),
        votes: 0
      })
      break;
    default:
      break;
  }
  return newState.sort((x,y)=>y.votes - x.votes)
}


export default reducer