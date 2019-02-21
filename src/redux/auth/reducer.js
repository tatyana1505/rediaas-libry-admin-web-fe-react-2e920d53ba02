import { actions } from './actions'

const defaultState = {
  authenticated: false,
  loading: false, 
  user: {
    role: ''
  },
  error: null
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.AUTH_REQUEST:
      return {
        ...state,
        loading: action.payload.loading
      }
    case actions.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authenticated: action.payload.authenticated,
        loading: action.payload.loading
      }
    case actions.AUTH_ERROR:
      return {
        ...state,
        authenticated: action.payload.authenticated,
        loading: action.payload.loading,
        error: action.payload.error
      }
    case actions.AUTH_SIGN_OUT:
      return defaultState
    default:
      return state
  }
}