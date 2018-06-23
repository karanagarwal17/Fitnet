import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import PlayerCard from './Cards/PlayerCard'
import {
    PLAYER_SEARCH
} from '../constants/actionTypes'

const mapStateToProps = state => ({
    ...state.player
})

const mapDispatchToProps = dispatch => ({
    onLoad: () =>
        dispatch({ type: PLAYER_SEARCH, payload: agent.Player.get() })
})

class FindPlayers extends React.Component {
    componentWillMount(){
        this.props.onLoad()
    }

    render(){
        if(this.props.players){
            return(
                <div>
                    {
                        this.props.players.map((player, key) => {
                            return(
                                <PlayerCard key={key} data={player} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FindPlayers)