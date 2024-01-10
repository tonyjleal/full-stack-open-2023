import {Title} from './Title';

export const Statistics = ({good, neutral, bad}) => {

    const all = good + neutral + bad;
  
    if(all === 0) {
      return (
        <>
            <Title title="statistics"></Title>
            <p>No feedback given</p>
        </>      
      )
    }
    
    return (
      <>
          <Title title="statistics"></Title>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
          <div>all {all}</div>
          <div>average {(good - bad) / all}</div>
          <div>positive {(good / all) * 100}  %</div>
      </>
    )
  
  }