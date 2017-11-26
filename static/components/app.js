import React from 'react';
import {Provider} from 'react-redux';

import {Game} from './game'

export function App({store, game}) {
    return (
        <Provider store={store}>
            <div id="app">
                <h3>Fabled Lands</h3>

                <Game game={game} />
            </div>
        </Provider>
    )
}
