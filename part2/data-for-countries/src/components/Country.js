import React , { useState , useEffect } from 'react'
import axios from 'axios'

import Weather from './Weather'

const api_key = process.env.REACT_APP_API_KEY

export default function Country({country , singleCountry }) {

    const { name , capital , population , languages , flag } = country

    const [ weather, setWeather ] = useState(null)
    useEffect(()=>{
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${name}`).then(res => { 
            setWeather(res.data.current)
        })
    },[name])

    return (
        <div>
            <h1><span>{ name }</span></h1>
            <p> capital { capital }</p>
            <p> population { population }</p>
            <h2> language </h2>
            <ul>
                { languages.map( ({ name }) => <li key={ name }> { name } </li>) }
            </ul>
            <img src={ flag } alt={ name } style={{width:"100px"}}/>
            { singleCountry && weather &&  <Weather name={ capital } weather={ weather }/>}
        </div>
    )
}

