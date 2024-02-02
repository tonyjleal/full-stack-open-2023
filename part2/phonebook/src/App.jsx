import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './service/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [personsToShow, setPersonsToShow ] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService.getAll()
                  .then( initialValue => {
                    setPersons(initialValue)        
                  })
  }, [])

  useEffect(() => {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()));
    setPersonsToShow(filteredPersons);
  }, [persons])

  const handleNewName = (event) => { 
    setNewPerson({...newPerson, name: event.target.value})
  }

  const handleNewNumber = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
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
        setPersons(persons.filter(p => p.id !== returnedValue.id))
        setMessage(`Deleted successfully`)
      })
    }
  }

  const handleAddPerson = (event) => {
    event.preventDefault()

    if(newPerson.name === ''){
      return false;
    }

    const person = persons.find(person => person.name === newPerson.name)
    if(!person) {
      personsService.create(newPerson)
      .then(returnedValue => {
        setPersons(prevPerson => [...prevPerson, returnedValue])
        setMessage(`Added ${returnedValue.name}`)
      }).catch(error => {
        console.error(error)
        alert(`An error are created while trying to create the new person: ${newPerson}.`)        
      })
      
    } else if(confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){

      const changedPerson = {...person, number: newPerson.number}
      personsService.update(person.id, changedPerson)
      .then( returnedValue => {
        setPersons(persons.map(p => person.id === p.id ? { ...p, ...returnedValue } : p))  
        setMessage(`Updated ${returnedValue.name}`)
      }).catch(error => {
        console.error(error)
        alert(`An error are created while trying to update person: ${newPerson}.`)        
      })
    }    
    setNewPerson({name:'', number:''})
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter text={filterName} handleFilterName={handleFilterName} />

      <h2>add a new</h2>
      <PersonForm 
        methodAdd={handleAddPerson} 
        newPerson={newPerson}
        handleNewName={handleNewName} 
        handleNewNumber={handleNewNumber}/>


      <h2>Numbers</h2>
      <Persons persons={personsToShow} handlerDeletePerson={handleDeletePerson} />
            
          
    </div>
  )
}

export default App
