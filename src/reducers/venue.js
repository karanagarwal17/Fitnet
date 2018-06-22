import {
  VENUE_SEARCH
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case VENUE_SEARCH:
      return {
        ...state,
        venues: action.payload.venues
      }
    default:
      return state
  }
}
