import {
  MATCH_SEARCH
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case MATCH_SEARCH:
      return {
        ...state,
        matches: action.payload.matches
      }
    default:
      return state
  }
}
