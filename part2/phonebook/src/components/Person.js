import React from 'react'

export default function Person({id, name,number,removePerson}) {

    const handleOnClick = () => {
        if (window.confirm(`Delete Arto ${name} ?`)) {
            removePerson(id)
        }
    }

    return (
        <p>{ name } { number } <input type="button" onClick={handleOnClick} value={ "delete" } /> </p>
    )
}
