import React from 'react'

export default function Submit(props) {
    const {handleOnClick,text} = props
    return (
    <button onClick={handleOnClick}>{text}</button>
    )
}
