import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function App() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(res=>{
      console.log('promise fulfilled')
      setPersons(res.data)
    })
  },[])

  const [ newName , setNewName ] = useState('')
  const [ newNumber , setNewNumber ] = useState('')
  const [ filterWord , setNewFilterWord ] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const person = persons.find( person => person.name=== newName)
    if(person){
      alert(`${person.name} is already added to phonebook`)
    } else {
      const personsNew = persons.concat({
        name:newName,
        number:newNumber
      })
      setPersons(personsNew)
    }
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
      <Persons filterPersons = {filterPersons} />
    </div>
  );
}

export default App;
