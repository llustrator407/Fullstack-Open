const Header = (props) => {
  return <h1>{props.courseName}</h1>
}
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}
const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}
const Course=(props) => {
  return (
    <div>
      <Header courseName={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (<Course course={course}/>)
}
  

export default App