const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())
app.use(morgan('tiny'))


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if(person) {
    response.json(person)
  }  else {
    response.status(404).end()
  }

})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const emptyField = _validateParams(body);
    if(emptyField) {
      return response.status(400).json({
        error: emptyField
      })
    }

    const existName = persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())
    if(existName) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = {
      id: _generateId(),
      name: body.name,
      number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id);
  
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const infoMessage = `
                  <p>Phonebook has info for ${persons.length} people</p>
                  <p>${new Date()}</p>
                  `
  response.send(infoMessage)
})

const _validateParams = (body) => {
  let emptyField = ''
    
  if(!body.name && !body.number) {
    emptyField = 'name and number is missing'
  } else if(!body.name) {
    emptyField = 'name is missing'
  } else if(!body.number) {
    emptyField = 'number is missing'
  }

  return emptyField
}

const _generateId = () => {
  const maxId = persons.length > 0  
                ? Math.max(...persons.map(p => p.id))
                : 0
  return maxId + 1
}


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})