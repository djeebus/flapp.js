import React from 'react'
import {connect} from 'react-redux'

import Player from './player'
import {SelectPlayer} from './selectPlayer'
import View from './view'


function _Game({game, player}) {
    if (!player) {
        return <SelectPlayer game={game} />
    }

    return (
        <div>
            <View game={game} />
            <Player />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        player: state.player,
    }
}

export const Game = connect(mapStateToProps)(_Game)
