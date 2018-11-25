import React, { Component } from 'react'
import ValueSetDisplay from './ValueSetDisplay'
import './App.css'

import { Provider }  from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './redux/reducers/reducers'
import thunk from "redux-thunk";


const store = createStore(
  rootReducer, // 0: reducer
  composeWithDevTools(
    applyMiddleware(thunk), // 1: middleware
  )
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <ValueSetDisplay code="34206005" valueSet="511308" />
        <ValueSetDisplay code="6064005" valueSet="511308" />
        <ValueSetDisplay code="non-existent-code" valueSet="511308" />
      </div>
      </Provider>
    )
  }
}

export default App
