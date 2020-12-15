import React from 'react'
import Part from './Part'

export default (props) => {
    return <fragment>
        <Part part={props.parts[0].name} exercise={props.parts[0].exercise}/>
        <Part part={props.parts[1].name} exercise={props.parts[1].exercise}/>
        <Part part={props.parts[2].name} exercise={props.parts[2].exercise}/>
    </fragment>
}