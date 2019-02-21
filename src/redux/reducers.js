import { reducer as auth } from './auth/reducer'
import { reducer as menu } from './menu/reducer'
import { reducer as customer } from './customer/reducer'

import { combineReducers } from 'redux'

export const reducers = combineReducers({auth, menu, customer})