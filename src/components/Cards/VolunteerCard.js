import React from 'react'
import { Link } from 'react-router'

class VolunteerCard extends React.Component {
  render(){
    return(
      <Link to={`profile/volunteer/${this.props.data._id}`}>
        <div className="row volunteerCard">
          <div className="col span-2-of-7 ImageContainer">
            <img src="img/user.png" alt="Profile icon" className="hImage"/>
          </div>
          <div className="col span-4-of-7 DetailsContainer">
            <ul>
              <li className="row Profile">
                <div className="col span-1-of-2 detailTitle">{this.props.data.firstname} {this.props.data.lastname}</div>
                <div className="col span-1-of-2 ngotype">{this.props.data.profession}</div>
              </li><br/>
              <li className="email">{this.props.data.email}</li><br/>
            </ul>
          </div>
        </div>
      </Link>
    )
  }
}

export default VolunteerCard
