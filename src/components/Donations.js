import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import Dashboard from './Dashboard'
import Header from './Header'
import DonationCard from './Profile/DonationCard'
import {
  DONATIONS_LOAD
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state,
  donations: state.donations.donations
})

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: DONATIONS_LOAD, payload: agent.Ngo.donations() })
})

class Donations extends React.Component {
  componentWillMount(){
    this.props.onLoad()
  }

  render(){
    if(this.props.donations){
      return(
        <div>
          <Header />
          <div className="row">
            <div className="col span-1-of-4">
              <Dashboard active="donations"/>
            </div>
            <div className="col span-3-of-4">
              <div className="donations box">
                {
                  this.props.donations.map((donation, key) => {
                    return(
                      <DonationCard data={donation} key={key}/>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div>
          Loading..
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donations)
