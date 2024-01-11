import { useState } from 'react'
import { Button } from './components/Button'
import { Anecdote } from './components/Anecdote'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]
   
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  let maxVote = Math.max(...votes);

  const handleNextAnecdote = () =>  {
    const randomPosition =  Math.floor(Math.random() * anecdotes.length);
    setSelected(randomPosition);
  };

  const handleVote = () => {   
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  }

  if(anecdotes.length == 0) {
      return (
          <>
             Empty anecdotes
          </>
      )
  }

  return (
    <>
      <Anecdote title="Anecdote of the day" 
                anecdote={anecdotes[selected]} 
                vote={votes[selected]} />

      <Button onClick={handleVote} text="vote"></Button>
      <Button onClick={handleNextAnecdote} text="Next anecdote"></Button>

      <Anecdote title="Anecdote with most votes" 
                anecdote={anecdotes[votes.indexOf(maxVote)]} 
                vote={maxVote} />
    </>

  )
}

export default App