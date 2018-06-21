import React from 'react'
import agent from '../agent'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Dashboard from './Dashboard'
import Header from './Header'
import Login from './Login'

import {
  APP_LOAD,
  REDIRECT
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.common,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token}),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
})

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo)
      this.props.onRedirect()
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    if(token) {
      agent.setToken(token)
    }
    this.props.onLoad(token ? agent.Auth.current() : null, token)
  }

  render(){
    if(this.props.currentUser){
      return (
      <div>
        <Header />
        <div className="main-container row">
          <div className="col span-1-of-4">
            <Dashboard location={this.props.location} />
          </div>
          <div className="col span-3-of-4">
            {this.props.children}
          </div>
        </div>
      </div>
      )
    } else {
      return (
        <div>
          <Login />
        </div>
      )
    }
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
