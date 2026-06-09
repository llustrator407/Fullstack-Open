import {useState} from "react"
const Statistics=(props)=>{
  let total = props.good+props.neutral+props.bad
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
} 
const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}
  let average=(props.good-props.bad)/total
  let positive=(props.good/total)*100
  return(
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}
const App=()=>{
  const [good,setGood]=useState(0)
  const [neutral,setNeutral]=useState(0)
  const [bad,setBad]=useState(0)
  const handleGood=()=>{setGood(good+1)}
  const handleNeutral=()=>{setNeutral(neutral+1)}
  const handleBad=()=>{setBad(bad+1)}
  return(
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
export default App