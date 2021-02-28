import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import './Message.css'


export default function Message() {

  const message = useSelector(state => state)
  if(!message){
    return null
  }
  const { type,content } = message

  return (
    <div className={`message ${type}`}>
      {content}
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object.isRequired
}

