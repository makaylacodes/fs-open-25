import { useState } from 'react'

const Header = ({title}) => {
  console.log("Header component")
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = ({onCLick, text}) => {
  return(
      <button onClick={onCLick}>{text}</button>
  )
}

const StatisticsLine = ({valueText, value}) => {
  return(
    <div>
      <p>{valueText}  {value} </p>
    </div>
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
      <StatisticsLine valueText={"Good"} value={good} />
      <StatisticsLine valueText={"Neutral"} value={neutral} />
      <StatisticsLine valueText={"Bad"} value={bad} />
      <StatisticsLine valueText={"All"} value={total} /> {/* adds all the votes together */}
      <StatisticsLine valueText={"Average"} value={average} /> {/* adds all the votes together */}
      <StatisticsLine valueText={"Positive"} value={(good/(good+neutral+bad))*100 + "   %"} /> {/* adds all the votes together */}
      
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