import React from 'react'
import {useDispatch,useSelector} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const state = useSelector(state=>state)

  const good = () => {
    dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {state.good}</div>
      <div>neutral {state.ok}</div>
      <div>bad {state.bad}</div>
    </div>
  )
}

export default App