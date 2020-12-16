import React, {Fragment} from 'react'

export default function Person({filterPersons}) {
    return (
        <Fragment>
            {filterPersons.map(({ name, number }) => <p key={ name }>{ name } { number }</p>)}
        </Fragment>
    )
}
