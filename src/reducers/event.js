import {
  ADD_EVENT
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case ADD_EVENT:
      return state
    default:
      return state
  }
}
