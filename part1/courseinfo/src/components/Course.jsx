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


export default Course