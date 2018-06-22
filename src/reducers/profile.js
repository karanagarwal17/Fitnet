import {
  PROFILE_LOAD,
  PROFILE_UNLOAD
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case PROFILE_LOAD:
      return {
        ...state,
        user: action.error ? null : action.payload.user
      }
    case PROFILE_UNLOAD:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
