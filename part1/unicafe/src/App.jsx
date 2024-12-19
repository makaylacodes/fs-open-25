import { useState } from 'react'

const Header = ({title}) => {
  console.log("Header component")
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

// Exercise 1.10 Button into it's own component 
const Button = ({onCLick, text}) => {
  return(
      <button onClick={onCLick}>{text}</button>
  )
}

// Exercise 1.10 StatisticsLine into it's own component 
const StatisticsLine = ({valueText, value}) => {
  return(
      <td><p>{valueText}  {value} </p></td>
  )
}

//Holds all of the statistics lines
const Statistics = ({good, bad, neutral}) =>{
  const total = good+ bad+ neutral
  const average = ((good*1)+(neutral*0)+(bad*1))/ total

  // Simple conditional rendering, if no votes displays a message otherwise displays all statistics
  if (good, bad, neutral === 0){
    return(
      <div>No Feedback Given</div>
    )
  }
  return(
    <div>
      <table>
        <tbody>
          <tr><StatisticsLine valueText={"Good"} value={good} /></tr>
          <tr><StatisticsLine valueText={"Neutral"} value={neutral} /></tr>
          <tr><StatisticsLine valueText={"Bad"} value={bad} /></tr>
          <tr><StatisticsLine valueText={"All"} value={total} /></tr>{/* adds all the votes together */}
          <tr><StatisticsLine valueText={"Average"} value={average} /></tr>{/* adds all the votes together */}
          <tr><StatisticsLine valueText={"Positive"} value={(good/(good+neutral+bad))*100 + "   %"} /></tr>{/* adds all the votes together */}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
    setGood(good +1)
  }

  const updateNeutral = () => {
    setNeutral(neutral +1)
  }

  const updateBad = () => {
    setBad(bad +1)
  }

  
  
  return (
    <div>
      <Header title={"Give feedback"} />
      <div>
        <Button onCLick={updateGood} text={"Good"} /> 
        <Button onCLick={updateNeutral} text={"Neutral"} />
        <Button onCLick={updateBad} text={"Bad"} />
      </div>
      
      
      <Header title={"Statistics"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App