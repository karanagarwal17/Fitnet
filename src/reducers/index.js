import { combineReducers } from 'redux'

import auth from './auth'
import common from './common'
import venue from './venue'
import profile from './profile'
import match from './match'
import player from './player'

export default combineReducers({
  auth,
  common,
  venue,
  match,
  player,
  profile
})
