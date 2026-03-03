const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
    res.json(persons);
})

app.get("/api/persons/:id", (req,res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)

    if (person){
        res.json(person)
    } else {
        res.status(404).end();
    }
})

app.delete("/api/persons/:id", (req,res) => {
    const id = req.params.id

    const exists = persons.find(p => p.id === id)
    if (!exists){
        res.status(404).end()
    }
    persons = persons.filter(p => p.id !== id);
    res.status(204).end()


})

app.post("/api/persons/", (req,res) => {
    const person = req.body

    const maxId = persons.length > 0
        ? Math.max(...persons.map(p=>Number(p.id)))
        : 0
    console.log(person)
    person.id = String(maxId + 1);
    persons = persons.concat(person)

    res.json(person);
    
})

app.get("/info", (req,res) => {
    const numPersons = persons.length
    const currentTime = new Date()
    res.send(`Phonebook has info for ${numPersons} people. <br/>${currentTime}`)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})