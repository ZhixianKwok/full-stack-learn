import React from 'react'

export default function Country({country}) {

    const { name , capital , population , languages , flag } = country

    return (
        <div>
            <h1>{ name }</h1>
            <p> capital { capital }</p>
            <p> population { population }</p>
            <h2> language </h2>
            <ul>
                { languages.map( ({ name }) => <li key={ name }> { name } </li>) }
            </ul>
            <img src={ flag } alt={ name } style={{width:"100px"}}/>
        </div>
    )
}

