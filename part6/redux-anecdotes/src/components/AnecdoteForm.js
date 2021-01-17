import React from 'react'
import {useDispatch} from 'react-redux'
import {createNote} from '../reducers/anecdoteReducer'
import { changeMessage } from '../reducers/notificReducer'

export default function AnecdoteForm() {
    const dispatch = useDispatch()
    const onCreate = (event)=>{
        event.preventDefault()
        dispatch(createNote(event.target.note.value))
        dispatch(changeMessage(event.target.note.value))
        setTimeout(()=>{
            dispatch(changeMessage(''))
        },5000)
    }

    return (
        <form onSubmit={onCreate}>
        <h2>create new</h2>
        <div><input name="note"/></div>
        <input type="submit" value="create"/>
        </form>
    )
}

