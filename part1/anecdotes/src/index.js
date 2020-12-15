import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const {anecdotes} = props
  const [selected,setSelected] = useState(0)
  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const handleOnClick = () => {
    const randomInt = parseInt(Math.floor(Math.random() * anecdotes.length),10)
    setSelected(randomInt)
  }
  const handleOnVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] = votesCopy[selected] + 1
    setVotes(votesCopy)
  }

  const max = Math.max.apply(null,votes)
  const index = votes.findIndex(item=>item === max)
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleOnVote}>vote</button>
      <button onClick={handleOnClick}>next anecdote</button>
      <h3>Anecdotes with most votes</h3>
      <p>{max > 0 && anecdotes[index]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);