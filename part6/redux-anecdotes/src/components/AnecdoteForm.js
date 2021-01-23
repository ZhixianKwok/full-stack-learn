import React from 'react'
import { connect } from 'react-redux'
import {createNote} from '../reducers/anecdoteReducer'
import { changeMessage } from '../reducers/notificReducer'

const AnecdoteForm = (props) => {

    return (
        <form onSubmit={props.onCreate}>
        <h2>create new</h2>
        <div><input name="note"/></div>
        <input type="submit" value="create"/>
        </form>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: (event) =>{
            event.preventDefault()
            dispatch(createNote(event.target.note.value))
            dispatch(changeMessage(event.target.note.value,5000))
        }
    }
}
export default connect(
    null,
    mapDispatchToProps,
)(AnecdoteForm)
