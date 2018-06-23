import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import VenueCard from './Cards/VenueCard'
import {
    VENUE_SEARCH
} from '../constants/actionTypes'

const mapStateToProps = state => ({
    ...state.venue
})

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: VENUE_SEARCH, payload: agent.Venue.get() })
})

class FindVenue extends React.Component {
    componentWillMount(){
        this.props.onLoad()
    }
    
    render(){
        console.log(this.props.venues)
        if(this.props.venues){
            return(
                <div>
                    {
                        this.props.venues.map((venue, key) => {
                            return(
                                <VenueCard key={key} data={venue} />
                            )
                        })
                    }
                </div>
            )
        } else {
            return null
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindVenue)