import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import { promiseMiddleware, localStorageMiddleware } from './middleware'
import reducers from './reducers'
import {
  environment
} from './.env.js'

var store;

if(environment === 'development'){
  store = createStore(reducers, applyMiddleware(promiseMiddleware, localStorageMiddleware, createLogger()))
} else {
  store = createStore(reducers, applyMiddleware(promiseMiddleware, localStorageMiddleware))
}

export default store
