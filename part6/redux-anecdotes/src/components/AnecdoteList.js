import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { addVotes } from '../reducers/anecdoteReducer'
import { changeMessage } from '../reducers/notificReducer'
export default function AnecdoteList() {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter(item=>item.content.indexOf(filter)!==-1)
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVotes(id,anecdotes.find(item=>item.id===id)))
        const anecdote = anecdotes.find(item=>item.id === id)
        if(anecdote){
            dispatch(changeMessage(anecdote.content,5000))
        }
    }

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

