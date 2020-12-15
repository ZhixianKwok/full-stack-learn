import React from 'react'

export default function Statistic(props) {
    const {text,value} = props
    return (
        <div>
            {text} {value}
        </div>
    )
}

