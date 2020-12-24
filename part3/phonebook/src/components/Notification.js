import React from 'react'

export default function Notification({ message }) {
    
    let message = null
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
