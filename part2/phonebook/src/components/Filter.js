import React from 'react'

export default function Filter({handleChangeFilterWord}) {
    return (
        <div>
            filter shown with <input onChange={handleChangeFilterWord}/>
        </div>
    )
}
