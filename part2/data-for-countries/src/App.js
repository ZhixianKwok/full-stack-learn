import axios from 'axios'
import React,{ useState , useEffect } from 'react'

import Country from './components/Country'
import CountryDisplayControl from './components/CountryDisplayControl'

export default function App() {

  const [ countries, setCountries ] = useState([])
  const [ filterWord, setFilterWord ] = useState('')
  useEffect(()=>{
    if(!filterWord){
      setCountries([])
    } else {
      axios.get(`https://restcountries.eu/rest/v2/name/${filterWord}`).then(res => {
        setCountries(res.data)
      })
    }
  },[filterWord])

  const getDomList = () => {
    const countryLenth = countries.length
    
    if( countryLenth === 1 ){
       return <Country country={countries[0]} singleCountry={true}/>
    } else if( countryLenth > 10 ){
       return <p>Too many matches, specify another filter</p>
    } 
    return !!countries.length && countries.map( country => <CountryDisplayControl key={ country.name } country={country} /> )
  }
  
  const handleOnChange = (e) => {
    setFilterWord(e.target.value)
  }

  return (
    <div>
      <div>
        find countries <input type="text" onChange={handleOnChange}/>
      </div>
      {getDomList()}
    </div>
  ) 
}
