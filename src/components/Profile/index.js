import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'
import Header from '../Header'
import Dashboard from '../Dashboard'
import EventCard from './EventCard'

import {
  PROFILE_LOAD,
  PROFILE_UNLOAD,
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.profile,
  currentUser: state.common.currentUser,
  profile: state.profile.profile,
  events: state.profile.events
})

const mapDispatchToProps = dispatch => ({
  onLoad: (id) => {
    dispatch({ type: PROFILE_LOAD, payload: agent.Volunteer.get(id) })
  },
  onUnload: () =>
    dispatch({ type: PROFILE_UNLOAD })
})

class VolunteerProfile extends React.Component {
  componentWillMount(){
    this.props.onLoad(this.props.params.id)
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render() {
    if(this.props.profile){
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
                    {this.props.profile.firstname} {this.props.profile.lastname}
                  </div>
                  <div className="details">
                    <ul>
                      <li>{this.props.profile.profession}</li><br/>
                      <li className="email">{this.props.profile.email}</li>
                      <li>{this.props.profile.phone_number}</li>
                    </ul>
                    <Link to={`chat/${this.props.profile.created_by}`}>
                      <button className="button">Chat</button>
                    </Link>
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
