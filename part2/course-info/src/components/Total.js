import react from 'react'

export default ({parts}) => {
    return <p>
        Number of exercises { parts.reduce((prev,next)=> prev + next.exercise ,0) }
    </p>
}