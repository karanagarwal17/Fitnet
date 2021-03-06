import React from 'react'
import { connect } from 'react-redux'

import agent from '../agent'
import PlayerCard from './Cards/PlayerCard'
import {
    PLAYER_SEARCH,
    PLAYER_UNLOAD
} from '../constants/actionTypes'

const mapStateToProps = state => ({
    ...state.player,
    players: state.player.players || []
})

const mapDispatchToProps = dispatch => ({
    onSearch: (query) =>
        dispatch({ type: PLAYER_SEARCH, payload: agent.Player.search({ query: query }) }),
    onUnload: () =>
        dispatch({ type: PLAYER_UNLOAD })
})

class FindPlayers extends React.Component {
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
        console.log(this.props.players)
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
                        this.props.players.map((player, key) => {
                            return(
                                <PlayerCard key={key} data={player} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlayers)