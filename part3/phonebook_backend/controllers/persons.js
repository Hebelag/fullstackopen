const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
  Person.find({}).then((result) => {
    res.json(result)
  })
})

personsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

personsRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id

  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).end()
      }
      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

personsRouter.post('/', (req, res, next) => {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing!',
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number is missing!',
    })
  }
  //   Person.findOne({ name: body.name }).then((result) => {
  //     if (result) {
  //       return res.status(400).json({
  //         error: `Name ${body.name} already in database! Must be unique!`,
  //       });
  //     }
  //   });

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

personsRouter.get('/info', (req, res) => {
  Person.countDocuments({}).then((result) => {
    const currentTime = new Date()
    res.send(`Phonebook has info for ${result} people. <br/>${currentTime}`)
  })
})

module.exports = personsRouter