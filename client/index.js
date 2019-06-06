import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import store from './store'
import App from './app'
import './css/index.css'

ReactDOM.render(
   <Provider store={store}>
        <App />
   </Provider>,
  document.getElementById('app')
  )
  // <Router>
  // </Router>