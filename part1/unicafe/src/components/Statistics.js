import {Title} from './Title';
import {StatisticLine} from './StatisticLine';

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
          
          <StatisticLine text="good" value={good}></StatisticLine> 
          <StatisticLine text="neutral" value={neutral}></StatisticLine> 
          <StatisticLine text="bad" value={bad}></StatisticLine> 
          <StatisticLine text="all" value={all}></StatisticLine> 
          <StatisticLine text="average" value={(good - bad) / all}></StatisticLine> 
          <StatisticLine text="positive" value={`${(good / all) * 100}%`}></StatisticLine>
      </>
    )
  
  }