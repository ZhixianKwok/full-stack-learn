const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))

const PORT = process.env.PORT || 3001
let persons = [{ 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
}]

app.get('/api/persons',( req , res ) => {
    res.json(persons)
})

app.get('/api/persons/:id',( req , res ) => {
    const id = Number(req.params.id)
    const person = persons.find( person => person.id === id )

    if( person ){
        res.status(200).json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',( req , res ) => {
    const id = Number(req.params.id)
    const personsNew = persons.filter( person => person.id !== id )
    res.status(204).end()
})

app.post('/api/persons', ( req , res ) => {
    const personNew = req.body

    if( !personNew.number ){
        res.status(400).end(`Number must be entered!`)
    } 

    const person = persons.find( item => item.name === personNew.name )
    if( !person ) {
        personNew.id = parseInt(Math.random() * 100000,10)
        persons = persons.concat(personNew)
        res.status(200).end()
    } else {
        res.status(200).end(`name must be unique`)
    }
  
   
})

app.get('/info',( req , res ) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
       <div>phonebook has info for ${persons.length} people </div>
       <div>${new Date()}</div>
    `)  
})

app.listen(PORT,()=> {
    console.log(`server running on port ${PORT}`);
})