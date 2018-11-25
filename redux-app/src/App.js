import React, { Component } from 'react'
import ValueSetDisplay from './ValueSetDisplay'
import './App.css'

import { Provider }  from 'react-redux'
import {configureStore} from "redux-starter-kit";
import rootReducer from './redux/reducers/reducers'


const store = configureStore({
    reducer : rootReducer,
});

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
