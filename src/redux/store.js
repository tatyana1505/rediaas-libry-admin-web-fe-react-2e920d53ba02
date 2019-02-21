import { createStore, applyMiddleware } from 'redux'
import { reducers } from './reducers'
import thunk from 'redux-thunk'
import { logger } from '../middleware/logger' 

export const store = createStore(reducers, applyMiddleware(thunk, logger));