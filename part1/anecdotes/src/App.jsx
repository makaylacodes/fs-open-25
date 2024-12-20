import { useState } from 'react'

const ReturnMostVotes = ({votes, anecdotes}) => {
  const highestVoteValue = Math.max(...votes);
  console.log("highest value in votes " + highestVoteValue)
  const highestVoteIndex = votes.indexOf(highestVoteValue);
  const mostVotes = anecdotes[highestVoteIndex]
  console.log("Anecdote with the highest votes: " + mostVotes + "and has " + highestVoteValue );

  return (
    <div>
      <h4> {"\""+ mostVotes + "\""} </h4>
     <p> There are {highestVoteValue } votes</p> 
    </div>
  )
  
}

const Title = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({onClick, text}) => {
  return(
      <button onClick={onClick}>
        {text}
      </button>
  )
}

const Anecdote = ({anecdotes, votes}) => {
  return(
    <div>
      <h4> {"\""+ anecdotes + "\""} </h4>
      <p>Has {votes} votes </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const size = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  // This function generates a random number based on the length of the anecdotes array
  const randomGenerator = () => {
    console.log("This is array size " + size)
    return Math.floor(Math.random() * size);
  }

  // This function is an event handler, when the button is clicked, a random element of the anecdotes array is selected
  const nextAnecdote = () =>{
    console.log(size)
    setSelected(randomGenerator())
  }

  // This function is an event handler, when the button is clicked, the current element receives a vote
  const vote = () =>{
    // copy the vote array into new variable
    const updatedVotes = [...votes]
    // update the current element by adding one
    updatedVotes[selected] += 1
    console.log(updatedVotes)
    // updates the votes array with votes for the corresponding anecdotes
    setVotes(updatedVotes)
  }

  return (
    <div>

      <Title text={"Anecdote of the Day"} />
      <Anecdote anecdotes={anecdotes[selected]} votes={votes[selected]} />
     
      <div>
        <Button onClick={vote} text={"Vote"}/>
        <Button onClick={nextAnecdote} text={"Next Anecdote"}/>
      </div>
      
      <Title text={"Anecdotes with most votes"} />
      <ReturnMostVotes votes={votes} anecdotes={anecdotes}/>

    </div>
  )
}

export default App