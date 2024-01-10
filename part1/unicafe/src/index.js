import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useState } from 'react';
import {Title} from './components/Title';
import {Statistics} from './components/Statistics';
import {Button} from './components/Button';


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <Title title="give feedback"></Title>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad}  />
    </>
  )
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
