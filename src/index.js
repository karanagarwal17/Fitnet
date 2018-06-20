import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import agent from './agent'
import App from './components/App'
import AddEvent from './components/AddEvent'
import Donate from './components/Donate'
import Donations from './components/Donations'
import Home from './components/Home'
import EditProfile from './components/EditProfile'
import NgoProfile from './components/Profile/NgoProfile'
import VolunteerProfile from './components/Profile/VolunteerProfile'
import Search from './components/Search'
import store from './store'

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="edit" component={EditProfile} />
        <Route path="donations" component={Donations} />
        <Route path="donate/:id" component={Donate} />
        <Route path="profile/ngo/:id" component={NgoProfile} />
        <Route path="profile/volunteer/:id" component={VolunteerProfile} />
        <Route path="addevent" component={AddEvent} />
        <Route path="search" component={Search} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
