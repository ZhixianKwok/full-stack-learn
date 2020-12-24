import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personsService'
import Notification from './components/Notification'

import './index.css'

function App() {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(res => {
      setPersons(res.data)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setNewFilterWord] = useState('')
  const [message, setNewMessage] = useState(null)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const index = persons.findIndex(person => person.name === newName)
    if (index !== -1) {
      const dataNew = {
        ...persons[index],
        name: newName,
        number: newNumber
      }
      const personsNew = [...persons]
      personsNew[index] = dataNew
      personService.update(dataNew).then(res => {
        const message = {
          type:"tip",
          content:`updated ${newName}`
        }
        updatePersonsState( personsNew, message )
      })
    } else {
      const dataNew = {
        name: newName,
        number: newNumber,
      }
      const personsNew = persons.concat(dataNew)
      personService.create(dataNew).then(res => {
        const message = {
          type:"tip",
          content:`Added ${newName}`
        }
        updatePersonsState( personsNew, message )
      }).catch( ( { response } ) => {
        const message = {
          type:"error",
          content: response.data.error
        }
        setNewMessage(message)
        setTimeout(() => {
          setNewMessage(null)
        }, 2000)
      })
    }
  }

  const removePerson = (id, name) => {
    const index = persons.findIndex(person => person.id === id)
    const personsNew = [...persons]
    personService.remove(id).then(res => {
      personsNew.splice(index, 1)
      setPersons(personsNew)
    }).catch(res => {
      const message = {
        type:"error",
        content:`Information of ${name} has already been removed from server`
      }
      personsNew.splice(index, 1)
      updatePersonsState( personsNew , message )
    })
  }

  const updatePersonsState = ( personsNew , message ) => {
    setPersons(personsNew)
    setNewMessage(message)
    setTimeout(() => {
      setNewMessage(null)
    }, 2000)
  }

  const handleOnChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleOnChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleChangeFilterWord = (e) => {
    setNewFilterWord(e.target.value)
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1)
  const a = <Notification message={message} />
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleChangeFilterWord={handleChangeFilterWord} />
      <h2>add a new</h2>
      <PersonForm handleOnSubmit={handleOnSubmit} handleOnChangeName={handleOnChangeName} handleOnChangeNumber={handleOnChangeNumber} />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} removePerson={removePerson} />
    </div>
  );
}

export default App;
