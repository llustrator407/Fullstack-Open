import { useState, useEffect } from 'react'
import axios from 'axios'
const Filter=({value,onChange})=>{
  return (
    <div>
      filter shown with<input value={value}onChange={onChange}/>
    </div>
  )
}
const PersonForm=(props)=>{
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName}onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber}onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Persons=({persons})=>{
  return (
    <div>
      {persons.map(person=> 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}
const App=()=>{
  const [persons,setPersons]=useState([])
  const [newName,setNewName]=useState('')
  const [newNumber, setNewNumber]=useState('')
  const [searchFilter,setSearchFilter]=useState('')
  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        setPersons(response.data)
      })
  },[])
  const addPerson=(event)=>{
    event.preventDefault()
    const duplicate = persons.some(person => person.name === newName)
    if (duplicate){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name:newName,
      number: newNumber,
      id: persons.length+1
    }
    const updatedPersons=[...persons]
    updatedPersons.push(personObject)

    setPersons(updatedPersons)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange=(event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange=(event)=>{
    setSearchFilter(event.target.value)
  }
  let objectsToShow = []
  for(let i=0; i<persons.length; i++) {
    if(persons[i].name.toLowerCase().includes(searchFilter.toLowerCase())) {
      objectsToShow.push(persons[i])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchFilter} onChange={handleFilterChange}/>
        <h2>Add a new number</h2>
        <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        <Persons persons={objectsToShow}/>
    </div>
  )
}

export default App