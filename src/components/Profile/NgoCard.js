import React from 'react'
import {Link} from 'react-router'

class NgoCard extends React.Component {
  render() {
    return (
      <Link to={`profile/ngo/${this.props.data._id}`}>
        <div className="row ngoCard">
          <div className="col span-2-of-7 ImageContainer">
            <img src="img/ngo.png" alt="Profile icon" className="hImage"/>
          </div>
          <div className="col span-4-of-7 DetailsContainer">
            <ul>
              <li className="row Profile">
                <div className="col span-1-of-2 detailTitle">{this.props.data.org_name}</div>
                <div className="col span-1-of-2 ngotype">{this.props.data.category}</div>
              </li><br/>
              <li className="email">{this.props.data.email}</li><br/>
            </ul>
          </div>
          <div className="col span-1-of-7 ButtonContainer">
            <Link to={`chat/${this.props.data.created_by}`}>
              <button className="button">Chat</button>
            </Link>
          </div>
        </div>
      </Link>
    )
  }
}

export default NgoCard
