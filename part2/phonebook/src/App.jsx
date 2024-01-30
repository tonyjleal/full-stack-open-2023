import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [personsToShow, setPersonsToShow ] = useState([])
  const [ filterName, setFilterName] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)        
        setPersonsToShow(response.data)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    const search = event.target.value
    setFilterName(search)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())))
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    if(newName === ''){
      return false;
    }

    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return false;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const copyPersons = persons.concat(newPerson);
    setPersons(copyPersons)
    setPersonsToShow(copyPersons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())))
    setNewName('')
    setNewNumber('')
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filterName} handleFilterName={handleFilterName} />

      <h2>add a new</h2>
      <PersonForm 
        methodAdd={handleAddPerson} 
        newNumber={newNumber}
        newName={newName}
        handleNewName={handleNewName} 
        handleNewNumber={handleNewNumber}/>


      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
            
          
    </div>
  )
}

export default App
