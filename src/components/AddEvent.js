import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import Dashboard from './Dashboard'
import {
  ADD_EVENT
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.event,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onSave: (details) =>
    dispatch({ type: ADD_EVENT, payload: agent.Event.post(details)})
})

class AddEvent extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      type: '',
      date: '',
      venue: '',
      description: ''
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
      this.setState({
        name: '',
        type: '',
        date: '',
        venue: '',
        description: ''
      })
    }
  }

  render() {
    if(this.props.currentUser.ngo){
      return (
        <div className="row">
          <div className="col span-1-of-4">
            <Dashboard active={'addevent'}/>
          </div>
          <div className="col span-3-of-4 box form-box">
            <form className="register-form">
              <h1>Add an event</h1>
              <div className="field">
                <input className="input" type="text" value={this.state.name} onChange={this.updateState('name')}/>
                <span className="underline"></span>
                <div className="fieldname">
                  EVENT Name
                </div>
              </div>
              <div className="field">
                <input className="input" type="text" value={this.state.type} onChange={this.updateState('type')}/>
                <span className="underline"></span>
                <div className="fieldname">
                  EVENT TYPE
                </div>
              </div>
              <div className="field">
                <input className="input" type="text" value={this.state.date} onChange={this.updateState('date')}/>
                <span className="underline"></span>
                <div className="fieldname">
                  EVENT DATE
                </div>
              </div>
              <div className="field">
                <input className="input" type="text" value={this.state.venue} onChange={this.updateState('venue')}/>
                <span className="underline"></span>
                <div className="fieldname">
                  EVENT VENUE
                </div>
              </div>
              <div className="field areafield">
                <textarea className="textarea" rows="7" wrap="soft" placeholder="Description" value={this.state.description} onChange={this.updateState('description')}></textarea>
              </div>
              <div className="submit-button">
                <a className="btn" href="#" onClick={this.submitForm}>
                  SAVE EVENT
                </a>
              </div>
            </form>
          </div>
          </div>
      )
    } else {
      return(
        <div>
          Loading...
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent)
