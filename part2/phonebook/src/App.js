import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  const [ newName , setNewName ] = useState('')
  
  const handleOnSubmit = (e) => {
    e.preventDefault()
    const person = persons.find( person => person.name=== newName)
    if(person){
      alert(`${person.name} is already added to phonebook`)
    } else {
      const personsNew = persons.concat({
        name:newName
      })
      setPersons(personsNew)
    }
  }

  const handleOnChange = (e) => {
    setNewName(e.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={handleOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({name}) => <p key={name}>{ name }</p>)}
    </div>
  );
}

export default App;
