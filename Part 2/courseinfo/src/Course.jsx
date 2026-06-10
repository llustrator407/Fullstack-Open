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
export default Course