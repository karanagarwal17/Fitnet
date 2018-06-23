import {
  EVENT_SEARCH,
  EVENT_UNLOAD
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case EVENT_SEARCH:
      return {
        ...state,
        events: action.payload.events
      }
    case EVENT_UNLOAD: 
      return {
        ...state,
        events: null
      }
    default:
      return state
  }
}
