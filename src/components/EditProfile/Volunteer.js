import React from 'react'
import {connect} from 'react-redux'

import agent from '../../agent'
import {VOLUNTEER_FORM_LOAD, VOLUNTEER_FORM_UPDATE} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.edit,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch({type: VOLUNTEER_FORM_LOAD}),
  onSave: (details) => dispatch({type: VOLUNTEER_FORM_UPDATE, payload: agent.Volunteer.post(details)})
})

class Volunteer extends React.Component {
  constructor() {
    super()

    this.state = {
      firstname: '',
      lastname: '',
      gender: '',
      phone_number: '',
      email: '',
      city: '',
      profession: '',
      date_of_birth: ''
    }

    this.updateState = field => ev => {
      const state = this.state
      const newState = Object.assign({}, state, {[field]: ev.target.value})
      this.setState(newState)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const details = Object.assign({}, this.state)
      this.props.onSave(details)
    }
  }

  componentWillMount() {
    if (this.props.currentUser) {
      this.setState(Object.assign({}, this.state, {
        firstname: this.props.currentUser.volunteerId.firstname,
        lastname: this.props.currentUser.volunteerId.lastname,
        gender: this.props.currentUser.volunteerId.gender,
        date_of_birth: this.props.currentUser.volunteerId.date_of_birth,
        email: this.props.currentUser.volunteerId.email,
        city: this.props.currentUser.volunteerId.city,
        profession: this.props.currentUser.volunteerId.profession,
        phone_number: this.props.currentUser.volunteerId.phone_number
      }))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        firstname: nextProps.currentUser.volunteerId.firstname,
        lastname: nextProps.currentUser.volunteerId.lastname,
        gender: nextProps.currentUser.volunteerId.gender,
        date_of_birth: nextProps.currentUser.volunteerId.date_of_birth,
        email: nextProps.currentUser.volunteerId.email,
        city: nextProps.currentUser.volunteerId.city,
        profession: nextProps.currentUser.volunteerId.profession,
        phone_number: nextProps.currentUser.volunteerId.phone_number
      }))
    }
  }

  render() {
    return (
      <div className="row volunteer-form box">
        <div className="form-title">
          <h2>We'd like to know more about you!</h2>
        </div>
        <form className="register-form">
          <div className="field">
            <input className="input" type="text" value={this.state.firstname} onChange={this.updateState('firstname')}/>
            <span className="underline"></span>
            <div className="fieldname">
              First name
            </div>
          </div>
          <div className="field">
            <input className="input" type="text" value={this.state.lastname} onChange={this.updateState('lastname')}/>
            <span className="underline"></span>
            <div className="fieldname">
              Last Name
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
            <input className="input" type="text" value={this.state.date_of_birth} onChange={this.updateState('date_of_birth')}/>
            <span className="underline"></span>
            <div className="fieldname">
              Date of Birth
            </div>
          </div>
          <div className="field">
            <input className="input" type="text" value={this.state.email} onChange={this.updateState('email')}/>
            <span className="underline"></span>
            <div className="fieldname">
              Email Id
            </div>
          </div>
          <div className="field">
            <input className="input" type="text" value={this.state.city} onChange={this.updateState('city')}/>
            <span className="underline"></span>
            <div className="fieldname">
              City
            </div>
          </div>
          <div className="field">
            <input className="input" type="text" value={this.state.profession} onChange={this.updateState('profession')}/>
            <span className="underline"></span>
            <div className="fieldname">
              Profession
            </div>
          </div>
          <div className="field">
            <input className="input" type="text" value={this.state.phone_number} onChange={this.updateState('phone_number')}/>
            <span className="underline"></span>
            <div className="fieldname">
              Contact Number
            </div>
          </div>
          <div className="submit-button">
            <a className="btn" href="#" onClick={this.submitForm}>Save</a>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Volunteer)
