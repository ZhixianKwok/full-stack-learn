import React,{Fragment} from 'react'
import Part from './Part'

export default ({parts}) => {
    return <Fragment>
        { parts.map(part => {
            return <Part key={part.id} part={part.name} exercise={part.exercise}/>
        })}
    </Fragment>
}