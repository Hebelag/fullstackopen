const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Additional Arguments missing: password(required), name(optional), number(optional)")
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://dennis:${password}@cluster0.kwwxu93.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
    console.log("phonebook:")
    Person
        .find({})
        .then(result => {
            result.forEach(person => console.log(`${person.name} ${person.number}`))
            mongoose.connection.close()
        }
    )
    
}

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    console.log(`${name} ${number}`)
    const person = new Person({
        name: name,
        number: number,
        })
    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
    
}











