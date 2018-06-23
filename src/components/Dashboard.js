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
            <Link to='/create/match'>
              <li className={(this.props.location.pathname === '/create/match' ? 'active' : '')}>
                <i className="fa fa-calendar"></i>&nbsp;&nbsp;
                Create Match
              </li>
            </Link>
            <Link to='/find/match'>
              <li className={(this.props.location.pathname === '/find/match' ? 'active' : '')}>
                <i className="fa fa-calendar-alt"></i>&nbsp;&nbsp;
                Find Match
              </li>
            </Link>
            <Link to='/find/players'>
              <li className={(this.props.location.pathname === '/find/players' ? 'active' : '')}>
                <i className="fa fa-users"></i>&nbsp;&nbsp;
                Find Players
              </li>
            </Link>
            <Link to='/find/venue'>
              <li className={(this.props.location.pathname === '/find/venue' ? 'active' : '')}>
                <i className="fa fa-map-marker-alt"></i>&nbsp;&nbsp;
                Find Venues
              </li>
            </Link>
            <Link to={'/profile'}>
              <li className={(this.props.location.pathname === '/profile' ? 'active' : '')}>
                <i className="fa fa-user"></i>&nbsp;&nbsp;
                Profile
              </li>
            </Link>
            <Link to='/edit/profile'>
              <li className={(this.props.location.pathname === '/edit/profile' ? 'active' : '')}>
                <i className="fa fa-edit"></i>&nbsp;&nbsp;
                Edit Profile
              </li>
            </Link>
            <li onClick={this.props.onLogout}>
              <i className="fa fa-sign-out-alt"></i>&nbsp;&nbsp;
              Logout
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
