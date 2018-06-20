import {
  EVENTS_LOAD,
  PROFILE_LOAD,
  PROFILE_UNLOAD
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case EVENTS_LOAD:
      return {
        ...state,
        events: action.payload.events || []
      }
    case PROFILE_LOAD:
      return {
        ...state,
        profile: action.payload || {}
      }
    case PROFILE_UNLOAD:
      return {
        ...state,
        profile: null
      }
    default:
      return state
  }
}
