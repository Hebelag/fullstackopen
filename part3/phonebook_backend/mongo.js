const dns = require('dns')
const mongoose = require('mongoose')
const config = require('./utils/config')
dns.setServers(['1.1.1.1'])

if (process.argv.length < 3) {
  console.log(
    'Additional Arguments missing: password(required), name(optional), number(optional)',
  )
  process.exit(1)
}
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI, { family: 4 })
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  console.log(`${name} ${number}`)
  const person = new Person({
    name: name,
    number: number,
  })
  console.log(person)
  person.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}
