import React from 'react';
import { connect, Provider } from 'react-redux';

import { Game } from './game'
import { newGame } from '../actions'

function _App({store, game, onClick}) {
    return (
        <Provider store={store}>
            <div id="app">
                <h3>Fabled Lands (<a href="javascript:void(0)" onClick={onClick}>New game</a>)</h3>

                <Game game={game} />
            </div>
        </Provider>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => dispatch(newGame()),
    }
}

export const App = connect(null, mapDispatchToProps)(_App)