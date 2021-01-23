import React from 'react'
import { connect } from 'react-redux'
import { addVotes } from '../reducers/anecdoteReducer'
import { changeMessage } from '../reducers/notificReducer'

const AnecdoteList = (props) => {
    const { anecdotes } = props

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={()=>{props.addVote(anecdote.id ,anecdotes)}}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}


const mapStateToProps = (state) => {
    const { anecdotes , filter } = state 
    return {
        anecdotes: anecdotes.filter(item=>item.content.indexOf(filter)!==-1)
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addVote:(id,anecdotes)=>{
            dispatch(addVotes(id,anecdotes.find(item=>item.id===id)))
            const anecdote = anecdotes.find(item=>item.id === id)
            if(anecdote){
                dispatch(changeMessage(anecdote.content,5000))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
