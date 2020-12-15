import React from 'react'
import Part from './Part'

export default (props) => {
    return <fragment>
        <Part part={props.part1.name} exercise={props.part1.exercise}/>
        <Part part={props.part2.name} exercise={props.part2.exercise}/>
        <Part part={props.part3.name} exercise={props.part3.exercise}/>
    </fragment>
}