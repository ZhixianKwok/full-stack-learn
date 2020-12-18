import React, {Fragment} from 'react'
import Person from './Person'

export default function Persons({filterPersons,removePerson}) {

    return (
        <Fragment>
            {filterPersons.map(({ name, number,id },index) => <Person key={index} name={name} number={number} id={id} removePerson = {removePerson} />)}
        </Fragment>
    )

}
