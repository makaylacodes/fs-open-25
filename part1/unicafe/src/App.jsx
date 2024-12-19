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

const Statistics = ({valueText, value}) => {
  return(
    <div>
      <p>{valueText}  {value} </p>
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

  const total = good+ bad+ neutral
  const average = ((good*1)+(neutral*0)+(bad*1))/ total
  
  return (
    <div>
      <Header title={"Give feedback"} />
      <div>
        <Button onCLick={updateGood} text={"Good"} /> 
        <Button onCLick={updateNeutral} text={"Neutral"} />
        <Button onCLick={updateBad} text={"Bad"} />
      </div>
      
      
      <Header title={"Statistics"} />
      <Statistics valueText={"Good"} value={good} />
      <Statistics valueText={"Neutral"} value={neutral} />
      <Statistics valueText={"Bad"} value={bad} />
      <Statistics valueText={"All"} value={total} /> {/* adds all the votes together */}
      <Statistics valueText={"Average"} value={average} /> {/* adds all the votes together */}
      <Statistics valueText={"Positive"} value={(good/(good+neutral+bad))*100 + "   %"} /> {/* adds all the votes together */}
      
    </div>
  )
}

export default App