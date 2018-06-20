import {
  APP_LOAD,
  LOGIN,
  SIGNUP,
  LOGOUT,
  PROFILE_ACTIVATED,
  REDIRECT,
  NGO_FORM_UPDATE,
  VOLUNTEER_FORM_UPDATE,
  NOT_LOGGED_IN
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
        if(action.payload.user.admin){
          return {
            ...state,
            redirectTo: 'admin',
            token: action.payload.token,
            currentUser: action.payload.user
          }
        }
        else {
          return {
            ...state,
            redirectTo: 'search',
            token: action.payload.token,
            currentUser: action.payload.user
          }
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
    case VOLUNTEER_FORM_UPDATE:
      return {
        ...state,
        redirectTo: action.error ? null : 'profile'
      }
    case NGO_FORM_UPDATE:
      if(action.payload.step === 'complete') {
        return {
          ...state,
          redirectTo: 'search'
        }
      } else {
        return state
      }
    case NOT_LOGGED_IN:
      return {
        ...state,
        redirectTo: '/'
      }
    case PROFILE_ACTIVATED:
      return {
        ...state,
        redirectTo: '/'
      }
    default:
      return state
  }
}
