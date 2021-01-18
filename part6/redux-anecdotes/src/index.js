import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './App'
import anecdotesReducer from './reducers/anecdoteReducer'
import notificReducer from './reducers/notificReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({ 
    anecdotes: anecdotesReducer,
    notification: notificReducer,
    filter:filterReducer
})
const store = createStore(reducer,composeWithDevTools(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)