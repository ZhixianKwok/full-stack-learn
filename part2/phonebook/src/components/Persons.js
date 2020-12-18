import React, {Fragment} from 'react'
import Person from './Person'

export default function Persons({filterPersons,removePerson}) {

    return (
        <Fragment>
            {filterPersons.map(({ name, number,id }) => <Person name={name} number={number} id={id} removePerson = {removePerson} />)}
        </Fragment>
    )

}
