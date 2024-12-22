import Course from "./Course";

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

export default Content