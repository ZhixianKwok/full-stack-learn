import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name:'Fundamentals of React',
      exercise:10
    },{
      name:'Using props to pass data',
      exercise:7
    },{
      name:'State of a component',
      exercise:14
    }]
  }


  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);