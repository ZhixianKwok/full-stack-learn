import React from 'react'

export default function Notification({ message }) {

    if( !message ){ 
        return null
    }
    
    const { content , type } = message
    
    return (
        <div className='notific' type={type}>
            {content}
        </div>
    )
}
