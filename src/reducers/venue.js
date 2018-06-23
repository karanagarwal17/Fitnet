import {
  VENUE_SEARCH,
  VENUE_UNLOAD
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case VENUE_SEARCH:
      return {
        ...state,
        venues: action.payload.venues
      }
    case VENUE_UNLOAD:
      return {
        ...state,
        venues: null
      }
    default:
      return state
  }
}
