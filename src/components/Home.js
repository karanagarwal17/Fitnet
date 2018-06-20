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
  onChangeName: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'name', value}),
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onLogin: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onSignup: (name, email, password) =>
    dispatch({ type: SIGNUP, payload: agent.Auth.signup(name, email, password) }),
  onClear: () =>
    dispatch({ type: CLEAR }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED })
})

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.name = this.props.name
    this.email = this.props.email
    this.password = this.props.password
    this.errors = this.props.errors
    this.messages = this.props.messages
    this.changeName = ev => this.props.onChangeName(ev.target.value)
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.login = (email, password) => ev => {
      ev.preventDefault()
      this.props.onLogin(email, password)
    }
    this.signup = (name, email, password) => ev => {
      ev.preventDefault()
      this.props.onSignup(name, email, password)
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
    this.name = nextProps.name
    this.email = nextProps.email
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
                <input className="input" type="text" placeholder="Email" value={this.email} onChange={this.changeEmail}/>
                <span className="underline"></span>
              </div>
              <div className="field">
                <input className="input" type="password" placeholder="Password" value={this.password} onChange={this.changePassword}/>
                <span className="underline"></span>
              </div>
              <div className="errors">
                {this.errors}
              </div>
              <button className="btn" onClick={this.login(this.email, this.password)} disabled={this.props.inProgress}>
                LOG IN
              </button>
            </div>
            <div className="form-item sign-up">
              <h2>
                Sign Up
              </h2>
              <div className="field">
                <input className="input" type="text" placeholder="Name" value={this.name} onChange={this.changeName}/>
                <span className="underline"></span>
              </div>
              <div className="field">
                <input className="input" type="text" placeholder="Email" value={this.email} onChange={this.changeEmail}/>
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
              <button className="btn" onClick={this.signup(this.name, this.email, this.password)} disabled={this.props.inProgress}>
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
