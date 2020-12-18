import React, {Fragment} from 'react'
import Person from './Person'

export default function Persons({filterPersons,removePerson}) {

    return (
        <Fragment>
            {filterPersons.map(({ name, number,id }) => <Person key={id} name={name} number={number} id={id} removePerson = {removePerson} />)}
        </Fragment>
    )

}
