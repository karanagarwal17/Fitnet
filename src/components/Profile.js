import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'

import {
  PROFILE_LOAD,
  PROFILE_UNLOAD
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.profile,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: (username) =>
    dispatch({ type: PROFILE_LOAD, payload: agent.User.get(username) }),
  onUnload: () =>
    dispatch({ type: PROFILE_UNLOAD })
})

class VolunteerProfile extends React.Component {
  componentWillMount(){
    if(this.props.params.username){
      this.props.onLoad(this.props.params.username)
    } else {
      this.props.onLoad(this.props.currentUser.username)
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render() {
    if(this.props.user){
      return (
        <div>
          <div className="col span-3-of-4 hero box">
            <div className="row">
              <div className="col span-1-of-3">
                <div className="imageContainer">
                  <img src="img/user.png" alt="Profile icon" className="profileImage"/>
                </div>
              </div>
              <div className="col span-2-of-3">
                <div className="detailsContainer">
                  <div className="detailTitle">
                    {this.props.user.name}
                  </div>
                  <div className="details">
                    <ul>
                      <li className="email">{this.props.user.email}</li>
                      <li>{this.props.user.location}</li><br/>
                      <li>{this.props.user.birthDate}</li>
                      <li>{this.props.user.equipment}</li>
                      <li>{this.props.user.gender}</li>
                      <li>{this.props.user.achievements}</li>
                      <li>{this.props.user.teams}</li>
                      <li>{this.props.user.bio}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="tabsContainer row">
              <div className="col span-1-of-2 o1">
                Events
              </div>
            </div>
          </div>
          <div className="col span-3-of-4 followingContainer box">
            {
              // this.props.events.map((event, key) => {
              //   return(
              //     <EventCard data={event} key={key} currentUser={this.props.currentUser}/>
              //   )
              // })
            }
          </div>
        </div>
      )
    } else {
      return(
        null
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerProfile)
