import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import Dashboard from './Dashboard'
import Header from './Header'
import {
  DONATE
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onSave: (id, body) =>
    dispatch({ type: DONATE, payload: agent.Ngo.donation(id, body)})
})

class Donate extends React.Component{
  constructor(){
    super()

    this.state = {
      type: '',
      amount: '',
      phone_number: ''
    }

    this.updateState = field => ev => {
      const state = this.state
      const newState = Object.assign({}, state, {[field]: ev.target.value})
      this.setState(newState)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      const details = Object.assign({}, this.state)
      this.props.onSave(this.props.params.id, details)
      this.setState({
        type: '',
        amount: '',
        phone_number: ''
      })
    }
  }

  render(){
    return(
      <div>
        <Header />
        <div className="row">
          <div className="col span-1-of-4">
            <Dashboard active=""/>
          </div>
          <div className="col span-3-of-4">
            <div className="row volunteer-form">
              <div className="form-title">
                <h2>Make a donation!</h2>
              </div>
              <form className="register-form">
                <div className="field">
                  <input className="input" type="text" value={this.state.type} onChange={this.updateState('type')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Type
                  </div>
                </div>
                <div className="field">
                  <input className="input" type="text" value={this.state.amount} onChange={this.updateState('amount')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Amount
                  </div>
                </div>
                <div className="field">
                  <input className="input" type="text" value={this.state.phone_number} onChange={this.updateState('phone_number')}/>
                  <span className="underline"></span>
                  <div className="fieldname">
                    Phone Number
                  </div>
                </div>
                <div className="submit-button">
                  <a className="btn" href="#" onClick={this.submitForm}>Save</a>
                </div>
              </form>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donate)
