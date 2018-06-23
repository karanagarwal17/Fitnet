import React from 'react'

class VenueCard extends React.Component {
  render() {
    return (
      <div className="row donationCard">
        <div className="col span-2-of-7 ImageContainer">
          <i className="fa fa-map-marker-alt"></i>
        </div>
        <div className="col span-4-of-7 DetailsContainer">
          <ul>
            <li className="row Profile">
              <div className="col span-1-of-2 detailTitle">{this.props.data.name}</div>
              <div className="col span-1-of-2 ngotype">{this.props.data.address}</div>
            </li><br/>
            <li className="email">{this.props.data.sports[0]}</li><br/>
          </ul>
        </div>
      </div>
    )
  }
}

export default VenueCard
