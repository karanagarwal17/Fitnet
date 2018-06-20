import {
  SEARCH,
  SEARCH_UNLOAD
} from '../constants/actionTypes'

export default(state = {}, action) => {
  switch(action.type){
    case SEARCH:
      return{
        ...state,
        searchResults: action.payload
      }
    case SEARCH_UNLOAD:
      return{
        ...state,
        searchResults: null
      }
    default:
      return state
  }
}
