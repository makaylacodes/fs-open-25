// Header component, title of curriculum
const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

// Component displays all information for one course
const Course = ({course}) => {
  return (
    <div>
      <Subtitle course={course}  />
      {course.parts.map(part => {
        console.log(`  Part: ${part.name}, Exercises: ${part.exercises}`)
        return (
          <div key={part.id}>
            <Part part={part} />
          </div>
        )
      })}

      <Total course={course.parts} />
    </div>
  )
}

// Component displays the course heading
const Subtitle = ({course}) => {
  return(
    <h3>{course.name} </h3> 
  )
}
// Component displays the all parts and corresponding exercises in the course
const Part =({part}) => {
  return(
    <p>{part.name} , Exercises: {part.exercises}</p>
  )
}

// Component displays total # of exercises in the course
const Total = ({course}) => {
  const total = course.reduce((total, part) => {
    return total + part.exercises
  }, 0)

  return (
    <div>
     <p>Total of <b>{total} </b>  exercises</p>
    </div>
  )
}

const Content = ({courses}) => {
  // Variable uses map to go through all the course elements in the courses array. For each course element, the 
  // course component is called to display all relevant data
 const content = courses.map(course => {
    console.log(`Course: ${course.name}`)

    return(
      <div key={course.id}>
        <Course course={course} />
      </div>
    )
  })

  return content
}

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header text={"Web Development Curriculum"} />
      
      <Content courses={courses} />
    </div>
  )
}

export default App
