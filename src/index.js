import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './components/App'
import CreateMatch from './components/CreateMatch'
import EditProfile from './components/EditProfile'
import Feed from './components/Feed'
import FindMatch from './components/FindMatch'
import FindPlayers from './components/FindPlayers'
import FindVenue from './components/FindVenue'
import Profile from './components/Profile'
import store from './store'

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Feed} />
        <Route path="create/match" component={CreateMatch} />
        <Route path="find/match" component={FindMatch} />
        <Route path="find/players" component={FindPlayers} />
        <Route path="find/venue" component={FindVenue} />
        <Route path="edit/profile" component={EditProfile} />
        <Route path="profile" component={Profile} />
        <Route path="profile/:username" component={Profile} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
