import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import {
  LOGOUT
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.common,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLogout: () =>
    dispatch ({ type: LOGOUT })
})

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard box">
        <div className="title">
          Hey {this.props.currentUser.name}
        </div>
        <div className="tabs">
          <ul>
            <Link to='/'>
              <li className={(this.props.location.pathname === '/' ? 'active' : '')}>
                Feed
              </li>
            </Link>
            <Link to='/create/match'>
              <li className={(this.props.location.pathname === '/create/match' ? 'active' : '')}>
                Create Match
              </li>
            </Link>
            <Link to='/find/match'>
              <li className={(this.props.location.pathname === '/find/match' ? 'active' : '')}>
                Find Match
              </li>
            </Link>
            <Link to='/find/players'>
              <li className={(this.props.location.pathname === '/find/players' ? 'active' : '')}>
                Find Players
              </li>
            </Link>
            <Link to='/find/venue'>
              <li className={(this.props.location.pathname === '/find/venue' ? 'active' : '')}>
                Find Venues
              </li>
            </Link>
            <Link to={'/profile'}>
              <li className={(this.props.location.pathname === '/profile' ? 'active' : '')}>
                Profile
              </li>
            </Link>
            <Link to='/edit/profile'>
              <li className={(this.props.location.pathname === '/edit/profile' ? 'active' : '')}>
                Edit Profile
              </li>
            </Link>
            <li onClick={this.props.onLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
