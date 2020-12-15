import react from 'react'

export default (props) => {
    return <p>
        Number of exercises {props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise}
    </p>
}