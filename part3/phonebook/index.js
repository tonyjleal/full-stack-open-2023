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

app.get(`${baseUrl}`, (_, response, next) => {
  Person.find({})
  .then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))

})

app.get(`${baseUrl}/:id`, (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
      response.json(person)
  })
  .catch(error => next(error))
})

app.post(`${baseUrl}`, (request, response, next) => {
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

    person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))

})

app.put(`${baseUrl}/:id`, (request, response, next) => {

  const {id, name, number} = request.body
  
  Person.findByIdAndUpdate(id, {name, number}, { new:true })
  .then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))

})

app.delete(`${baseUrl}/:id`, (request, response, next) => {
  
  Person.findByIdAndDelete(request.params.id)
  .then(_ => {
      response.status(204).end()
  })
  .catch(error => next(error))
})

app.get('/info', (_, response, next) => {
  Person.find({})
  .then((people) => {    
    response.send(`
      <p>Phonebook has info for ${people.length} people</p>
      <p>${new Date()}</p>
      `)
  })
  .catch(error => next(error))
})


const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, _, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.use(errorHandler)


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