import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import configureCountriesStore from './store/countries-store'
import  './reset.css'
import  './shared.css'

configureCountriesStore()

ReactDOM.render(<App />, document.getElementById('root'))
