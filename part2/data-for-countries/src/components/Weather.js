import React from 'react'

export default function Weather({name,weather}) {
    
    const { temperature , wind_speed , wind_dir , weather_icons } = weather

    return (
        <div>
            <h2>Weather in {name}</h2>
            <p>temperature: {`${temperature} Celcius`}</p>
            { weather_icons.map(( icon , index ) => <img key={ index } alt="weather" src={icon}/>)}
            <p>wind: { wind_speed } mph direction { wind_dir }</p>
        </div>
    )
}
