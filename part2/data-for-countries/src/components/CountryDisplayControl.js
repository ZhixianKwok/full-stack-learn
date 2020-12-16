import React , { useState } from 'react'
import Country from './Country'

export default function CountryDisplayControl({ country }) {

    const [ show, setShow ] = useState(false)
    
    const handleOnClick = () => setShow( !show )

    return (
        <div>
            <span>{ country.name }</span><button onClick={ handleOnClick }> { show ? "hide" : "show" }</button>
            { show && <Country country={ country } />}
        </div>
    )
}

