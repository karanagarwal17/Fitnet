import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import VenueCard from './Cards/VenueCard'
import {
    VENUE_SEARCH,
    VENUE_UNLOAD
} from '../constants/actionTypes'

const mapStateToProps = state => ({
    ...state.venue,
    venues: state.venue.venues || []
})

const mapDispatchToProps = dispatch => ({
    onSearch: (query) =>
        dispatch({ type: VENUE_SEARCH, payload: agent.Venue.search({ query: query }) }),
    onUnload: () =>
        dispatch({ type: VENUE_UNLOAD })
})

class FindVenue extends React.Component {
    constructor(){
        super()

        this.state = {
          query: ''
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
          this.props.onSearch(this.state.query)
        }
    }

    componentWillUnmount(){
        this.props.onUnload()
    }
    
    render(){
        return(
            <div>
              <div className="searchContainer">
                    <div className="box">
                        <div className="col span-7-of-8 searchBox">
                            <input id="query" type="text" placeholder="Search" value={this.state.query} onChange={this.updateState('query')}></input>
                        </div>
                        <div className="col span-1-of-8 searchButton">
                            <button className="search" onClick={this.search}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="searchResults box">
                    {
                        this.props.venues.map((venue, key) => {
                            return(
                                <VenueCard key={key} data={venue} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindVenue)