import React from 'react'

export default function PersonForm({handleOnSubmit, handleOnChangeName, handleOnChangeNumber}) {
    return (
        <form onSubmit={handleOnSubmit}>
        <div>
          name: <input onChange={ handleOnChangeName }/>
        </div>
        <div>
          number: <input onChange={ handleOnChangeNumber }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
