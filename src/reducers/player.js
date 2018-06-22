import {
  PLAYER_SEARCH
} from '../constants/actionTypes'

export default(state = {}, action) => {
  switch(action.type){
    case PLAYER_SEARCH:
      return{
        ...state,
        players: action.payload.players
      }
    default:
      return state
  }
}
