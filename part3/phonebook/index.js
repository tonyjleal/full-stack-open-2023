require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
morgan.token('body', (req, _) =>  JSON.stringify(req.body))

app.use((req, res, next) => {
  const format = req.method === 'POST' 
                  ? ':method :url :status :res[content-length] - :response-time ms :body' 
                  : 'tiny'
  morgan(format)(req, res, next)
})


const baseUrl = '/api/persons'

app.get(`${baseUrl}`, (_, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get(`${baseUrl}/:id`, (request, response) => {
  Person.findById(request.params.id)
  .then(person => {
      response.json(person)
  }).catch(response.status(404).end())
  


})

app.post(`${baseUrl}`, (request, response) => {
    const body = request.body

    const emptyField = _validateParams(body);
    if(emptyField) {
      return response.status(400).json({
        error: emptyField
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })

})

app.delete(`${baseUrl}/:id`, (request, response) => {
  const person = Person.findById(request.params.id)
  
  Person.deleteOne(person)
  .then(deletedPerson => {
    if(deletedPerson.deletedCount > 0 ) {
      response.status(204).end()
    } else {
      console.log(`No persons matched the query. Delete 0 persons.`)
    }
  })
})

app.get('/info', (_, response) => {
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})