import React,{ useState } from 'react'
import PropTypes from 'prop-types'

export default function Togglable(props) {

  const { children,buttonLabel } = props
  const [visible,setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <input type="button" id="toggle" onClick={toggleVisibility} value={buttonLabel}/>
      <div style={{ display:visible?'':'none' }}>
        {children}
      </div>
      <input type="button" onClick={toggleVisibility} value="cancel"/>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}