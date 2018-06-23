import {
  PLAYER_SEARCH,
  PLAYER_UNLOAD
} from '../constants/actionTypes'

export default(state = {}, action) => {
  switch(action.type){
    case PLAYER_SEARCH:
      return{
        ...state,
        players: action.payload.players
      }
    case PLAYER_UNLOAD:
      return{
        ...state,
        players: null
      }
    default:
      return state
  }
}
