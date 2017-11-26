import React from 'react'
import {connect} from 'react-redux'

import { GameOver } from './gameover'
import Player from './player'
import {SelectPlayer} from './selectPlayer'
import View from './view'


function _Game({game, player}) {
    if (!player) {
        return <SelectPlayer game={game} />
    }

    if (player.stamina <= 0) {
        return <GameOver />
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
