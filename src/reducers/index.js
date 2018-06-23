import { combineReducers } from 'redux'

import auth from './auth'
import common from './common'
import event from './event'
import player from './player'
import profile from './profile'
import venue from './venue'

export default combineReducers({
  auth,
  common,
  event,
  player,
  profile,
  venue
})
