import { useState,useEffect } from 'react'
import axios from 'axios'
const App=()=>{
  const [countries,setCountries]=useState([])
  const [searchQuery,setSearchQuery]=useState('')
  useEffect(()=>{
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response=>{
        setCountries(response.data)
      })
  },[])
  const handleSearchChange=(event)=>{
    setSearchQuery(event.target.value)
  }
  let countriesToShow=[]
  if(searchQuery.length>0){
    for(let i=0; i<countries.length; i++){
      if(countries[i].name.common.toLowerCase().includes(searchQuery.toLowerCase())){
        countriesToShow.push(countries[i])
      }
    }
  }
  const renderContent=()=>{
    if(countriesToShow.length>10){
      return <p>Too many matches, specify another filter</p>
    }
    if(countriesToShow.length<=10 && countriesToShow.length>1){
      return (
        <div>
          {countriesToShow.map(c=> 
            <p key={c.name.common}>{c.name.common}<button onClick={()=>setSearchQuery(c.name.common)}>show</button></p>
          )}
        </div>
      )
    }
    if(countriesToShow.length===1){
      const country=countriesToShow[0]
      let languagesList=[]
      for(let key in country.languages){
        languagesList.push(country.languages[key])
      }
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital ? country.capital[0] : 'N/A'}</p>
          <p>area {country.area}</p>
          
          <h3>Languages</h3>
          <ul>
            {languagesList.map(lang=> 
              <li key={lang}>{lang}</li>
            )}
          </ul>
          <img 
            src={country.flags.png} 
            alt={`Flag of ${country.name.common}`} 
            style={{width:150}}
          />
        </div>
      )
    }
    return null
  }
  return (
    <div>
      <div>
        find countries <input value={searchQuery} onChange={handleSearchChange} />
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  )
}
export default App