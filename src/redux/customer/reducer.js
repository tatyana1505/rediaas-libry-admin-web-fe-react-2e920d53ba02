import { actions } from './actions'

const defaultState = {
  selectedCustomer: ''
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.CUSTOMER_CHANGE:
      return {
        ...state, 
        selectedCustomer : action.payload.selectedCustomer
      }
    default:
      return state
  }
}