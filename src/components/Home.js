import React from 'react'
import agent from '../agent'
import { connect } from 'react-redux'
import {
  CLEAR,
  LOGIN,
  SIGNUP,
  UPDATE_FIELD_AUTH,
  HOME_PAGE_UNLOADED
} from '../constants/actionTypes'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value}),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onLogin: (username, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(username, password) }),
  onSignup: (username, password, email) =>
    dispatch({ type: SIGNUP, payload: agent.Auth.signup(username, password, email) }),
  onClear: () =>
    dispatch({ type: CLEAR }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED })
})

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.username = this.props.username
    this.password = this.props.password
    this.email = this.props.email
    this.errors = this.props.errors
    this.messages = this.props.messages
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.login = (username, password) => ev => {
      ev.preventDefault()
      this.props.onLogin(username, password)
    }
    this.signup = (username, password, email) => ev => {
      ev.preventDefault()
      this.props.onSignup(username, password, email)
    }
    this.clear = () => {
      this.props.onClear()
    }
    this.toggle = () => {
      var element = document.getElementsByClassName('container')
      element[0].classList.toggle('log-in')
      this.clear()
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }


  componentWillReceiveProps(nextProps) {
    this.email = nextProps.email
    this.username = nextProps.username
    this.password = nextProps.password
    this.errors = nextProps.errors
    this.messages = nextProps.messages
  }

  render() {
    return (
      <div>
        <div id="home"></div>
        <div className="container">
          <div className="info-item">
            <h1>
              Have an account?
            </h1>
            <p>
              Log in to see what events are taking place and what your peers are up to.
            </p>
            <button className="btn" onClick={this.toggle}>
              Log in
            </button>
          </div>
          <div className="info-item">
            <h1>
              Don't Have an account?
            </h1>
            <p>
              Sign up for the sports passion network and discover your true self.
            </p>
            <button className="btn" onClick={this.toggle}>
              Sign up
            </button>
          </div>
          <div className="container-form">
            <div className="form-item log-in">
              <h2>
                Log in
              </h2>
              <div className="field">
                <input className="input" type="text" placeholder="Username" value={this.username} onChange={this.changeUsername}/>
                <span className="underline"></span>
              </div>
              <div className="field">
                <input className="input" type="password" placeholder="Password" value={this.password} onChange={this.changePassword}/>
                <span className="underline"></span>
              </div>
              <div className="errors">
                {this.errors}
              </div>
              <button className="btn" onClick={this.login(this.username, this.password)} disabled={this.props.inProgress}>
                LOG IN
              </button>
            </div>
            <div className="form-item sign-up">
              <h2>
                Sign Up
              </h2>
              <div className="field">
                <input className="input" type="text" placeholder="Email" value={this.email} onChange={this.changeEmail}/>
                <span className="underline"></span>
              </div>
              <div className="field">
                <input className="input" type="text" placeholder="Username" value={this.username} onChange={this.changeUsername}/>
                <span className="underline"></span>
              </div>
              <div className="field">
                <input className="input" type="password" placeholder="Password" value={this.password} onChange={this.changePassword}/>
                <span className="underline"></span>
              </div>
              <div className="errors">
                {this.errors}
              </div>
              <div className="messages">
                {this.messages}
              </div>
              <button className="btn" onClick={this.signup(this.username, this.password, this.email)} disabled={this.props.inProgress}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
