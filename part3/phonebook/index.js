const express = require('express')
const app = express()

app.use(express.json())

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
  console.log(body)
    if(!body.name) {
      return response.status(400).json({
        error: 'content missing'
      })
    }
console.log(body)
console.log(body.name, body.number)
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