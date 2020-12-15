import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name:'Fundamentals of React',
    exercise:10
  }

  const part2 = {
    name:'Using props to pass data',
    exercise:7
  }

  const part3 = {
    name:'State of a component',
    exercise:14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total total={part1.exercise1 + part2.exercise2 + part3.exercise3}/>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);