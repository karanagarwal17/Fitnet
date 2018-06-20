import { combineReducers } from 'redux'

import auth from './auth'
import common from './common'
import edit from './edit'
import event from './event'
import profile from './profile'
import donations from './donations'
import search from './search'

export default combineReducers({
  auth,
  common,
  event,
  profile,
  donations,
  edit,
  search
})
