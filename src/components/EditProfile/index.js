import React from 'react'

import Dashboard from '../Dashboard'
import Volunteer from './Volunteer'
import Header from '../Header'
import { connect } from 'react-redux'
import {
  NOT_LOGGED_IN
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoggedOut: () =>
    dispatch({ type: NOT_LOGGED_IN })
})

class EditProfile extends React.Component {
  render() {
    if(this.props.currentUser){
      return (
        <Volunteer/>
      )
    } else {
      this.props.onLoggedOut()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
