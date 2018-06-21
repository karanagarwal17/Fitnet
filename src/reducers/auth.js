import {
  CLEAR,
  LOGIN,
  SIGNUP,
  HOME_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case CLEAR:
      return {
        ...state,
        username: "",
        password: "",
        errors: "",
        messages: "",
        email: ""
      }
    case LOGIN:
      return {
        ...state,
        username: "",
        password: "",
        messages: "",
        email: "",
        inProgress: false,
        errors: action.error ? action.payload.response.body.error : null,
      }
    case SIGNUP:
      return {
        ...state,
        username: "",
        password: "",
        email: "",
        inProgress: false,
        errors: action.error ? action.payload.response.body.error : null,
        messages: action.error ? null : "Your account has been created, visit your email for the verification link"
      }
    case ASYNC_START:
      if(action.subtype === LOGIN || action.subtype === SIGNUP ) {
        return { ...state, inProgress: true}
      } else {
        return state
      }
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value }
    case HOME_PAGE_UNLOADED:
      return {}
    default:
      return state
  }
}
