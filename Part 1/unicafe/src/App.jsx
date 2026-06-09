import {useState} from "react"
const statistics=(props)=>{
  let total = props.good+props.neutral+props.bad
  let average=(props.good-props.bad)/total
  let positive=(props.good/total)*100
  return(
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {total}</p>
      <p>average{average}</p>
      <p>positive{positive} %</p>
    </div>
  )
}
const app=()=>{
  const [good,setGood]=useState(0)
  const [neutral,setNeutral]=useState(0)
  const [bad,setBad]=useState(0)
  const handleGood=()=>{setGood(good+1)}
  const handleNeutral=()=>{setNeutral(neutral+1)}
  const handleBad=()=>{setBad(bad+1)}
  let total = good+neutral+bad
  let average=(good-bad)/total
  let positive=(good/total)*100
  return(
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
    </div>
  )
}
export default app