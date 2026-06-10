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
  let totalAmount = props.course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      <Header courseName={props.course.name} />
      <Content parts={props.course.parts} />
      <p><strong>total of {totalAmount} exercises</strong></p>
    </div>
  )
}
const App = () => {
  const course = [
    {
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
      },
      {
        id: 4,
        name: 'Redux',
        exercises: 11
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
      <h1>Web development curriculum</h1>
      {course.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}
  

export default App