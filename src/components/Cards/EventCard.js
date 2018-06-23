import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import agent from '../../agent'
import {
  APPLY_EVENT
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  onApply: (id) =>
    dispatch({ type: APPLY_EVENT, payload: agent.Event.apply(id) })
})

class EventCard extends React.Component {
  constructor(){
    super()

    this.apply = ev => {
      ev.preventDefault()
      this.props.onApply(this.props.data._id)
    }
  }

  render() {
    return (
      <div className="row eventCard">
        <div className="col span-2-of-7 ImageContainer">
          <i className="fa fa-calendar-alt"></i>
        </div>
        <div className="col span-4-of-7 DetailsContainer">
          <ul>
            <li className="row">
              <div className="col span-1-of-2 EventTitle">{this.props.data.sport}</div>
              <div className="col span-1-of-2 EventType">{this.props.data.venue}</div>
            </li><br/>
            <li>
            Players: {
              this.props.data.players.map((player, key) => {
                return(
                  player.name + ' '
                )
              })
            }
            </li>
            <br/>
            <li>{this.props.data.numberOfPeople}</li>
            <li>{this.props.data.privacy}</li>
            <li>{this.props.data.type}</li>
          </ul>
        </div>
        <div className="col span-1-of-7 ButtonContainer">
          <button className="button" onClick={this.apply}>Join</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)
