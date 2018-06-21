import {
  APP_LOAD,
  LOGIN,
  LOGOUT,
  NOT_LOGGED_IN,
  REDIRECT,
  SIGNUP
} from '../constants/actionTypes'

export default(state = {}, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      }
    case LOGIN:
      if(!action.error){
        return {
          ...state,
          redirectTo: '/edit/profile',
          token: action.payload.token,
          currentUser: action.payload.user
        }
      } else {
        return state
      }
    case SIGNUP:
      return {
        ...state,
        token: action.error ? null : action.payload.token,
        currentUser: action.error ? null : action.payload.user,
      }
    case LOGOUT:
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      }
    case REDIRECT:
      return {
        ...state,
        redirectTo: null
      }
    case NOT_LOGGED_IN:
      return {
        ...state,
        redirectTo: '/'
      }
    default:
      return state
  }
}
