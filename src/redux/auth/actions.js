export const actions = {
  AUTH_REQUEST: 'AUTH/AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH/AUTH_SUCCESS',
  AUTH_SIGN_OUT: 'AUTH/AUTH_SIGNOUT',
  AUTH_ERROR: 'AUTH/AUTH_ERROR'
}

export const authRequest = () => ({
  type: actions.AUTH_REQUEST,
  payload: {
    loading: true
  }
})

export const authSuccess = user => ({
  type: actions.AUTH_SUCCESS,
  payload: {
    authenticated: true,
    user: user,
    loading: false
  }
})

export const authError = error => ({
  type: actions.AUTH_ERROR,
  payload: {
    authenticated: false,
    loading: false,
    user: null,
    error: error
  }
})

export const signOut = () => ({
  type: actions.AUTH_SIGN_OUT
})