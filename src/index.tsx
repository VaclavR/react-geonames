import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import configureCountriesStore from './store/countries-store'

configureCountriesStore()

ReactDOM.render(<App />, document.getElementById('root'));
