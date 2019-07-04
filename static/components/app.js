import React from 'react';
import { connect } from 'react-redux';

import { Game } from './game'
import { newGame } from '../actions'

function _App({store, game, player, onClick}) {
    return (
        <div id="app">
            <h3>Fabled Lands (<a href="javascript:void(0)" onClick={onClick}>New game</a>)</h3>
            <Game game={game} player={player} />
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => dispatch(newGame()),
    }
}

function mapStoreToProps({player}) {
    return {player}
}

export const App = connect(mapStoreToProps, mapDispatchToProps)(_App)