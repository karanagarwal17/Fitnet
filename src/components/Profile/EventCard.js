import React from 'react'
import Link from 'react-router'
import { connect } from 'react-redux'
import agent from '../../agent'

import {
  APPLY_EVENT
} from '../../constants/actionTypes'

const Apply = props => {
  if(props.props.currentUser.volunteer){
    return(
      <button className="button" onClick={() => { props.props.onApply(props.props.data._id) }}>Apply</button>
    )
  }
  return null
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  onApply: (id) =>
    dispatch({ type: APPLY_EVENT, payload: agent.Volunteer.apply(id) })
})

class EventCard extends React.Component {
  render() {
    return (
      <div className="row eventCard">
        <div className="col span-2-of-7 ImageContainer">
          <img src="img/event.jpg" alt="Profile icon" className="hImage"/>
        </div>
        <div className="col span-4-of-7 DetailsContainer">
          <ul>
            <li className="row">
              <div className="col span-1-of-2 EventTitle">{this.props.data.name}</div>
              <div className="col span-1-of-2 EventType">{this.props.data.type}</div>
            </li><br/>
            <li className="email">{this.props.data.date}</li><br/>
            <li>{this.props.data.venue}</li>
          </ul>
        </div>
        <div className="col span-1-of-7 ButtonContainer">
          <Apply props={this.props}/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)
