import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './service/persons'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [personsToShow, setPersonsToShow ] = useState([])
  const [ filterName, setFilterName] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  useEffect(() => {
    personsService.getAll()
                  .then( initialValue => {
                    setPersons(initialValue)        
                    setPersonsToShow(initialValue)
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


  const handleDeletePerson = (id, name) => {
    if(confirm(`Delete ${name}?`)) {
      personsService.remove(id)
      .then(returnedValue => {
        const copyPersons = persons.filter(p => p.id !== returnedValue.id);
        setPersons(copyPersons)
        setPersonsToShow(copyPersons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())))
      })
    }
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

    personsService.create(newPerson)
                  .then(returnedValue => {
                    const copyPersons = persons.concat(returnedValue);
                    setPersons(copyPersons)
                    setPersonsToShow(copyPersons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())))                    
                  })
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
      <Persons persons={personsToShow} handlerDeletePerson={handleDeletePerson} />
            
          
    </div>
  )
}

export default App
