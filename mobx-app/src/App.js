import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import ValueSetDisplay from './ValueSetDisplay'
import './App.css'
import ValueSetStore from './ValueSetStore'

const valueSetStore = new ValueSetStore()

class App extends Component {
  render() {
    return (
      <Provider ValueSetStore={valueSetStore}>
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
