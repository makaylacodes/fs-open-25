
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
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
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
      <p>Number of exercises part {props.total}</p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} /> {/* loads data from course.title and content in variable course*/}
      <Content part1={part1} part2={part2} part3={part3} /> {/* loads data from course.part and saves array in variable part; this has the part exercise and name data*/}
      <Total total={part1.exercises + part2.exercises + part3.exercises} /> {/* loads data from course.part and saves array in variable total; this has the part exercise and name data*/}
      
    </div>
  )
}

export default App
