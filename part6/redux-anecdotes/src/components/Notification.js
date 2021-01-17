import React from 'react'
import { useSelector } from 'react-redux'

//TODO:学习combinreducer的使用
const Notification = () => {
  
  const notification = useSelector(({notification})=>notification)
  if(!notification){
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification