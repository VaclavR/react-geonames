import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './store/reducers'
import App from './App'
import rootSaga from './store/sagas'
import  './reset.css'
import  './shared.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
