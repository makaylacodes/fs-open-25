
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
      <Part part={props.part[0]} />
      <Part part={props.part[1]} />
      <Part part={props.part[2]} />
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
      <p>Number of exercises part {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises }</p>
    </div>
  )
}

const App = () => {

  const course = {
    title: 'Half Stack application development',
    part : [
      { name: 'Fundamentals of React',
      exercises: 10},
      { name:'Using props to pass data',
        exercises: 7
      },
      { name:'State of a component',
        exercises: 14
      }
  ] }


  return (
    <div>
      <Header course={course.title} /> {/* loads data from course.title and content in variable course*/}
      <Content part={course.part} /> {/* loads data from course.part and saves array in variable part; this has the part exercise and name data*/}
      <Total total={course.part} /> {/* loads data from course.part and saves array in variable total; this has the part exercise and name data*/}
      
    </div>
  )
}

export default App
