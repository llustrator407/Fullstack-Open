import { useState, useEffect } from 'react'
import personService from './persons.js'
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
const Persons=({persons, onDelete})=>{
  return (
    <div>
      {persons.map(person=> 
        <p key={person.id}>{person.name} {person.number} <button onClick={()=>onDelete(person.id,person.name)}>delete</button></p>
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
    personService
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
      })
  },[])
  const addPerson=(event)=>{
    event.preventDefault()
    let existingPerson=null
    for(let i=0; i<persons.length; i++){
      if(persons[i].name.toLowerCase()===newName.toLowerCase()){
        existingPerson=persons[i]
        break
      }
    }
    if(existingPerson){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const changedPerson={...existingPerson, number:newNumber}
        
        personService
          .update(existingPerson.id,changedPerson)
          .then(returnedPerson=>{
            let updatedPersons=[]
            for(let i=0; i<persons.length; i++){
              if(persons[i].id===existingPerson.id){
                updatedPersons.push(returnedPerson)
              }else{
                updatedPersons.push(persons[i])
              }
            }
            setPersons(updatedPersons)
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }
    const personObject = {
      name:newName,
      number: newNumber,
      id: persons.length+1
    }
    personService
      .create(personObject)
      .then(returnedPerson=>{
        const updatedPersons=[...persons]
        updatedPersons.push(returnedPerson)
        setPersons(updatedPersons)
        setNewName('')
        setNewNumber('')
      })
  }
  const deletePersonOf=(id,name)=>{
    if(window.confirm(`Delete ${name} ?`)){
      personService
        .remove(id)
        .then(()=>{
          let remainingPersons=[]
          for(let i=0; i<persons.length; i++){
            if(persons[i].id!==id){
              remainingPersons.push(persons[i])
            }
          }
          setPersons(remainingPersons)
        })
    }
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
        <Persons persons={objectsToShow} onDelete={deletePersonOf}/>
    </div>
  )
}

export default App