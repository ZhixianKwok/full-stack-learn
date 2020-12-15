import React from 'react'

export default function Statistic(props) {
    const {text,value} = props
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td> 
        </tr>
    )
}

