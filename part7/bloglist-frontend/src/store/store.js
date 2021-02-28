import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificReducer from '../reducers/notificReducer'

const store = createStore(
    notificReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
)

export default store