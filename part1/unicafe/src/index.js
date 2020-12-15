import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Statistic from './components/Statistic'
import Submit from './components/Submit'


const Statistics = (props) => {
    const statisticDomList = [],data = props.data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        statisticDomList.push(<Statistic key={key} text={key} value={data[key]}/>)
      }
    }
    return <table>{statisticDomList}</table>
}

const Buttons = props => {
    const buttonDomList = [],data = props.data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        buttonDomList.push(<Submit key={key} text={key} handleOnClick={data[key]} />)
      }
    }
    return buttonDomList
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good + neutral + bad,
    average = ((good * 1 + neutral * 0 + bad * -1) / sum).toFixed(1),
    positive = (( good / sum ) * 100).toFixed(1)+'%'
  
  const statisticObj = {good,neutral,bad,average,positive} 
  const buttonObj = {
    good:() => setGood(good + 1),
    neutral:() => setNeutral(neutral + 1),
    bad:() => setBad(bad + 1)
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Buttons data={buttonObj}/>
      <h2>statistics</h2>
      {sum ? <Statistics data={statisticObj}/> : <p>No feedback given</p>}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
