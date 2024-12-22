const Header = (props) => {
  console.log("Header component props: ", props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// Used map to display all elements inside of course.parts, which has course name and # of exercises
const Content = ({parts}) => {
  console.log("Content component props: ", parts)
  
  return (
    <div >
      {parts.map(part => <p key={part.id}>{part.name} : {part.exercises}</p>) }
    </div>
  )
}

// USE REDUCE
const Total = (props) => {
  console.log("Total component props: ", props)
  return (
    <div>
      {/* Below calls on the variable inside of the App component. Specifies course.part array location to add the exercise values */}
      <p>Number of exercises {props.parts[0].exercises +props.parts[1].exercises +props.parts[2].exercises }</p>
    </div>
  )
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name} /> {/* loads data from course in variable course*/}
      <Content parts={course.parts} /> {/* loads data from parts and saves array in variable parts; this has the parts exercise and name data*/}
      <Total parts= {course.parts} /> {/* loads data from parts and saves array in variable parts; this has the parts exercise and name data*/}
      
    </div>
  )
}

const App = () => {

  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }


  return (
    <div>
      <Course course={course} />
      
    </div>
  )
}

export default App
