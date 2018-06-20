import {
  DONATIONS_LOAD
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case DONATIONS_LOAD:
      return {
        ...state,
        donations: action.payload.donations
      }
    default:
      return state
  }
}
