import React from 'react'
import PropTypes from 'prop-types'

export default function LoginForm({ handleOnSubmit,handleOnChange,username,password }) {
  return (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          <span>username</span><input type="text" data-input="name" onChange={handleOnChange} value={username}></input>
        </div>
        <div>
          <span>password</span><input type="password" data-input="password" onChange={handleOnChange} value={password}></input>
        </div>
        <input type="submit" value="login"/>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired
}