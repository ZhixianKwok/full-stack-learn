import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ])
  const [ newName , setNewName ] = useState('')
  const [ newNumber , setNewNumber ] = useState('')
  
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
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={ handleOnChangeName }/>
        </div>
        <div>
          number: <input onChange={ handleOnChangeNumber }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name, number }) => <p key={ name }>{ name } { number }</p>)}
    </div>
  );
}

export default App;
