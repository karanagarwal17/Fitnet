import React from 'react'
import {connect} from 'react-redux'
import agent from '../../agent'
import { Link } from 'react-router'

import Header from '../Header'
import Dashboard from '../Dashboard'
import NgoCard from '../Profile/NgoCard'
import EventCard from '../Profile/EventCard'
import VolunteerCard from '../Profile/VolunteerCard'
import {
  SEARCH,
  SEARCH_UNLOAD
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.search,
  currentUser: state.common.currentUser,
  searchResults: state.search.searchResults || []
})

const mapDispatchToProps = dispatch => ({
  onSearch: (type, query) =>
    dispatch({ type: SEARCH, payload: agent.Search.post({type: type, name: query})}),
  onUnload: () =>
    dispatch({ type: SEARCH_UNLOAD })
})

class Search extends React.Component {
  constructor(){
    super()
    this.state = {
      query: '',
      type: ''
    }

    this.updateState = field => ev => {
      const state = this.state
      const newState = Object.assign({}, state, {[field]: ev.target.value})
      this.setState(newState)
    }

    this.updateType = ev => {
      this.setState(Object.assign({}, this.state, {type: ev.target.value}))
    }

    this.search = ev => {
      ev.preventDefault()
      this.props.onSearch(this.state.type,this.state.query)
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render() {
    if(this.props.currentUser){
      return (
        <div>
          <Header/>
          <div className="row search">
            <div className="col span-1-of-4">
              <Dashboard active="search"/>
            </div>
            <div className="col span-3-of-4 searchContainer">
              <div className="row">
                <div className="col span-7-of-8 searchBox">
                  <input id="query" type="text" placeholder="Search" value={this.state.query} onChange={this.updateState('query')}></input>
                </div>
                <div className="col span-1-of-8 searchButton">
                  <button className="search" onClick={this.search}>Search</button>
                </div>
              </div>
            </div>
            <div className="col span-3-of-4 radio-field">
              <input id="option1" className="input" name="select" type="radio" value="volunteer" onChange={this.updateType}/>
              <label>Volunteer</label>
              <input id="option2" className="input" name="select" type="radio" value="ngo" onChange={this.updateType}/>
              <label>NGO</label>
              <input id="option3" className="input" name="select" type="radio" value="event" onChange={this.updateType}/>
              <label>Event</label>
            </div>
            <div className="col span-3-of-4 searchResults box">
              {
                this.props.searchResults.map((result,key) => {
                  if(result.org_name){
                    return (
                      <NgoCard key={key} data={result} currentUser={this.props.currentUser}/>
                    )
                  } else if(result.firstname) {
                    return(
                      <VolunteerCard key={key} data={result} currentUser={this.props.currentUser}/>
                    )
                  } else {
                    return(
                      <EventCard key={key} data={result} currentUser={this.props.currentUser}/>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
