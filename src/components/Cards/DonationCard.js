import React from 'react'

class DonationCard extends React.Component {
  render() {
    return (
      <div className="row donationCard">
        <div className="col span-2-of-7 ImageContainer">
          <img src="img/donate.png" alt="Profile icon" className="hImage"/>
        </div>
        <div className="col span-4-of-7 DetailsContainer">
          <ul>
            <li className="row Profile">
              <div className="col span-1-of-2 detailTitle">{this.props.data.type}</div>
              <div className="col span-1-of-2 ngotype">Amount: {this.props.data.amount}</div>
            </li><br/>
            <li className="email">{this.props.data.phone_number}</li><br/>
          </ul>
        </div>
      </div>
    )
  }
}

export default DonationCard
