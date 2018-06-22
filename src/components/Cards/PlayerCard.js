import React from 'react'
import { Link } from 'react-router'

class PlayerCard extends React.Component {
  render(){
    return(
      <Link to={`profile/${this.props.data.username}`}>
        <div className="row volunteerCard">
          <div className="col span-2-of-7 ImageContainer">
            <img src="/img/user.png" alt="Profile icon" className="hImage"/>
          </div>
          <div className="col span-4-of-7 DetailsContainer">
            <ul>
              <li className="row Profile">
                <div className="col span-1-of-2 detailTitle">{this.props.data.name}</div>
                <div className="col span-1-of-2 ngotype">{this.props.data.location}</div>
              </li>
              <br/>
              <li className="email">{this.props.data.email}</li>
              <br/>
              <li>{this.props.data.equipment}</li>
              <li>{this.props.data.teams}</li>
            </ul>
          </div>
        </div>
      </Link>
    )
  }
}

export default PlayerCard
