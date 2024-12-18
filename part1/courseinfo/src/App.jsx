
const Header = (props) => {
  console.log("Header component props: " )
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log("Content component props: ")
  console.log(props)
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  console.log("Part component props: ")
  console.log(props)
  return(
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log("Total component props")
  console.log(props)
  return (
    <div>
      {/* Below calls on the variable inside of the App component. Specifies course.part array location to add the exercise values */}
      <p>Number of exercises part {props.parts[0].exercises +props.parts[1].exercises +props.parts[2].exercises }</p>
    </div>
  )
}

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
      <Header course={course} /> {/* loads data from course in variable course*/}
      <Content parts={parts} /> {/* loads data from parts and saves array in variable parts; this has the parts exercise and name data*/}
      <Total parts= {parts} /> {/* loads data from parts and saves array in variable parts; this has the parts exercise and name data*/}
      
    </div>
  )
}

export default App
