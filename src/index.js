import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
require('./global.scss')



import App from './components/App'




ReactDOM.render (
    <Router>
      <App />
    </Router>,
  document.querySelector('.main')
)
