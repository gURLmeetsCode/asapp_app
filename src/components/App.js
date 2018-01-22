import React, { Component } from 'react'

import Login from './Login'
import Main from './Main'

require('./style.scss')

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Main />
      </div>
    )
  }
}
