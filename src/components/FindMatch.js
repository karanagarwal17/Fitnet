import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import MatchCard from './Cards/MatchCard'
import {
    MATCH_SEARCH
} from '../constants/actionTypes'

const mapStateToProps = state => ({
    ...state.match
})

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: MATCH_SEARCH, payload: agent.Match.get() })
})

class FindMatch extends React.Component {
    componentWillMount(){
        this.props.onLoad()
    }

    render(){
        if(this.props.matches){
            return(
                <div>
                    {
                        this.props.matches.map((match, key) => {
                            return(
                                <MatchCard data={match} key={key} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FindMatch)