import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personsService'

function App() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(res=>{
      setPersons(res.data)
    })
  },[])

  const [ newName , setNewName ] = useState('')
  const [ newNumber , setNewNumber ] = useState('')
  const [ filterWord , setNewFilterWord ] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const index = persons.findIndex( person => person.name === newName)
    if(index !== -1){
      const dataNew = {
        ...persons[index],
        name:newName,
        number:newNumber
      }
      const personsNew = [...persons]
      personsNew[index] = dataNew
      personService.update(dataNew).then(() => setPersons(personsNew))
    } else {
      const dataNew = {
        name:newName,
        number:newNumber,
        id: persons.length + 1
      }
      const personsNew = persons.concat(dataNew)
      personService.create(dataNew).then(res => setPersons(personsNew))
    }
  }

  const removePerson = ( id ) => {
    personService.remove( id ).then(res => {
      const index = persons.findIndex( person => person.id === id)
      const personsNew = [...persons]
      personsNew.splice(index,1)
      setPersons(personsNew)
    })
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
  
  const filterPersons = persons.filter( person => person.name.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1 )
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChangeFilterWord={handleChangeFilterWord}/>
      <h2>add a new</h2>
      <PersonForm handleOnSubmit={handleOnSubmit} handleOnChangeName = { handleOnChangeName } handleOnChangeNumber ={ handleOnChangeNumber }/>
      <h2>Numbers</h2>
      <Persons filterPersons = {filterPersons} removePerson={removePerson}/>
    </div>
  );
}

export default App;
