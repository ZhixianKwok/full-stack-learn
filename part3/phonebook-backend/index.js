require("dotenv").config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const Person = require('./model/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const formateLogger = (tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
}

app.use(morgan(formateLogger))

const PORT = process.env.PORT || 3001

app.get('/api/persons',( req , res ) => {
    Person.find({}).then( results => {
        res.json(results)
    })
})

app.get('/api/persons/:id',( req , res ) => {
    const id = req.params.id
    
    Person.find({ _id: id }).then( result => { 
        if( result ){
            res.status(200).json( result )
        } else {
            res.status(404).end()
        }
    }).catch( err => {
        res.status(404).send({error:'malformatted id'})
    })

   
})

app.delete('/api/persons/:id',( req , res ) => {
    Person.findByIdAndRemove( req.params.id ).then( result => {
        res.status(204).end()
    }).catch( err => {
        console.log( err )
    })
})

app.post('/api/persons', ( req , res ) => {
    const personNew = req.body

    if( !personNew.number ){
        res.status(400).end(`Number must be entered!`)
    } 

    const person = new Person({
        ...personNew
    })

    person.save().then( result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        res.status(200).end()
    })
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