import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [{
    name:'Fundamentals of React',
    exercise:10
  },{
    name:'Using props to pass data',
    exercise:7
  },{
    name:'State of a component',
    exercise:14
  }]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);