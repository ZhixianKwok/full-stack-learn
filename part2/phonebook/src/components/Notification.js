import React from 'react'

export default function Notification({ type , message }) {

    if( !message ){ 
        return null
    }

    return (
        <div className='notific' type={type}>
            {message}
        </div>
    )
}
