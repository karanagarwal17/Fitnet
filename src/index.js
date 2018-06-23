import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import CreateEvent from './components/CreateEvent'
import EditProfile from './components/EditProfile'
import FindEvent from './components/FindEvent'
import FindPlayers from './components/FindPlayers'
import FindVenue from './components/FindVenue'
import Profile from './components/Profile'
import store from './store'

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="create/event" component={CreateEvent} />
        <Route path="find/event" component={FindEvent} />
        <Route path="find/players" component={FindPlayers} />
        <Route path="find/venue" component={FindVenue} />
        <Route path="edit/profile" component={EditProfile} />
        <Route path="profile" component={Profile} />
        <Route path="profile/:username" component={Profile} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
