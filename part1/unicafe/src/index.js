import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
  return <fragment>
    <p>average {props.average}</p>
    <p>positive {props.positive}</p>
  </fragment>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good + neutral + bad,
    average = (good * 1 + neutral * 0 + bad * -1) / sum,
    positive = good / sum

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>statistics</h2>
      {sum ? <fragment><p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <Statistics average={average} positive={positive} /></fragment> : <p>No feedback given</p>}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
