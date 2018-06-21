import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  ...state.common,
  currentUser: state.common.currentUser
})

class Header extends React.Component {
  render() {
    return (
      <div className="header">
          <i className="fa fa-volleyball-ball"></i>
          <div className="main-name">FITNET</div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Header)
