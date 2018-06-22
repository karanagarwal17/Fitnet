import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import {
    CREATE_MATCH
} from '../constants/actionTypes'

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    onSave: (details) =>
        dispatch({ type: CREATE_MATCH, payload: agent.Match.post(details) })
})

class CreateMatch extends React.Component {
    constructor(){
        super()

        this.state = {
            sport: '',
            venue: '',
            numberOfPeople: '',
            privacy: '', 
            players: ''
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
                    <h2>Create a match!</h2>
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
                  <input className="input" type="text" value={this.state.numberOfPeople} onChange={this.updateState('numberOfPeople')}/>
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
                  <input className="input" type="text" value={this.state.players} onChange={this.updateState('players')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Players
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateMatch)