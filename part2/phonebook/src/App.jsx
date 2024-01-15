import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
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
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input type='tel' value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
          {
            persons.map(
              person  => <div key={person.name}>{person.name} {person.number}</div> 
            )
          }
      </div>
    </div>
  )
}

export default App
