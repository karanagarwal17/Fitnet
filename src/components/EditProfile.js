import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import {
  PROFILE_LOAD, 
  PROFILE_UPDATE,
  NOT_LOGGED_IN
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.profile,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: (username) => 
    dispatch({ type: PROFILE_LOAD, payload: agent.User.get(username) }),
  onSave: (username, body) => 
    dispatch({ type: PROFILE_UPDATE, payload: agent.User.put(username, body) }),
  onLoggedOut: () =>
    dispatch({ type: NOT_LOGGED_IN })
})

class EditProfile extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      bio: '',
      email: '',
      location: '',
      birthDate: '',
      equipment: '',
      gender: '',
      achievements: '',
      teams: ''
    }

    this.updateState = field => ev => {
      const state = this.state
      const newState = Object.assign({}, state, {[field]: ev.target.value})
      this.setState(newState)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const body = Object.assign({}, this.state)
      this.props.onSave(this.props.currentUser.username, body)
    }
  }

  componentWillMount() {
    this.props.onLoad(this.props.currentUser.username)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        name: nextProps.user.name,
        bio: nextProps.user.bio,
        email: nextProps.user.email,
        location: nextProps.user.location,
        birthDate: nextProps.user.birthDate,
        equipment: nextProps.user.equipment,
        gender: nextProps.user.gender,
        achievements: nextProps.user.achievements,
        teams: nextProps.user.teams
      }))
    }
  }

  render() {
    if(this.props.currentUser){
      return (
        <div className="row box">
          <div className="form-title">
            <h2>We'd like to know more about you!</h2>
          </div>
          <form className="register-form">
            <div className="field">
              <input className="input" type="text" value={this.state.name} onChange={this.updateState('name')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Name
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.email} onChange={this.updateState('email')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Email
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.location} onChange={this.updateState('location')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Location
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.birthDate} onChange={this.updateState('birthDate')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Birth Date
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.equipment} onChange={this.updateState('equipment')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Equipment
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.gender} onChange={this.updateState('gender')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Gender
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.achievements} onChange={this.updateState('achievements')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Achievements
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.teams} onChange={this.updateState('teams')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Teams
              </div>
            </div>
            <div className="field">
              <input className="input" type="text" value={this.state.bio} onChange={this.updateState('bio')}/>
              <span className="underline"></span>
              <div className="fieldname">
                Bio
              </div>
            </div>
            <div className="submit-button">
              <a className="btn" href="#" onClick={this.submitForm}>Save</a>
            </div>
          </form>
        </div>
      )
    } else {
      this.props.onLoggedOut()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
