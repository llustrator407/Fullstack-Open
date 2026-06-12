import { useState,useEffect } from 'react'
import axios from 'axios'
const CountryView=({country})=>{
  const [weather,setWeather]=useState(null)
  const api_key=import.meta.env.VITE_WEATHER_KEY
  const capital=country.capital ? country.capital[0] : null
  useEffect(()=>{
    if(capital){
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response=>{
          setWeather(response.data)
        })
    }
  },[capital,api_key])
  let languagesList=[]
  for(let key in country.languages){
    languagesList.push(country.languages[key])
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {capital || 'N/A'}</p>
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
      {weather && (
        <div>
          <h2>Weather in {capital}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}
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
      return <CountryView country={countriesToShow[0]} />
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