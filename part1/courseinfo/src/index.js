import React from 'react'
import ReactDOM from 'react-dom'
import Header from '../src/components/Header'
import Content from '../src/components/Content'
import Total from '../src/components/Total'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
  {
    name: 'Fundamentals of React', 
    exercises: 10
  },
  {
    name: 'Using props to pass data', 
    exercises: 7
  },
  {
    name: 'State of a component', 
    exercises: 14
  }
]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />    
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))