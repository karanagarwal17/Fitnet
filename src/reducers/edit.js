import {
  NGO_FORM_UPDATE,
  VOLUNTEER_FORM_UPDATE
} from '../constants/actionTypes'

export default (state = {step: 1}, action) => {
  switch(action.type) {
    case NGO_FORM_UPDATE:
      return {
        ...state,
        step: action.payload.step
      }
    case VOLUNTEER_FORM_UPDATE:
      return {
        ...state
      }
    default:
      return state
  }
}
