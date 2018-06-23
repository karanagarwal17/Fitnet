import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import {
    CREATE_EVENT
} from '../constants/actionTypes'

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    onSave: (details) =>
        dispatch({ type: CREATE_EVENT, payload: agent.Event.post(details) })
})

class CreateEvent extends React.Component {
    constructor(){
        super()

        this.state = {
            sport: '',
            venue: '',
            numberOfPlayers: '',
            privacy: '', 
            type: ''
        }

        this.updateState = field => ev => {
            const state = this.state
            const newState = Object.assign({}, state, {[field]: ev.target.value})
            this.setState(newState)
        }
      
        this.submitForm = ev => {
            ev.preventDefault()
      
            const body = Object.assign({}, this.state)
            this.props.onSave(body)
        }
    }

    render(){
        return(
            <div className="row box">
                <div className="form-title">
                    <h2>Create an Event!</h2>
                </div>
                <form className="register-form">
                <div className="field">
                  <input className="input" type="text" value={this.state.sport} onChange={this.updateState('sport')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Sport
                  </div>
                </div>
                <div className="field">
                  <input className="input" type="text" value={this.state.venue} onChange={this.updateState('venue')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Venue
                  </div>
                </div>
                <div className="field">
                  <input className="input" type="text" value={this.state.numberOfPlayers} onChange={this.updateState('numberOfPlayers')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Number of players
                  </div>
                </div>
                <div className="field">
                  <input className="input" type="text" value={this.state.privacy} onChange={this.updateState('privacy')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Privacy
                  </div>
                </div>
                <div className="field">
                  <input className="input" type="text" value={this.state.type} onChange={this.updateState('type')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Type
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)