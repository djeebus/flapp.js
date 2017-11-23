import React from 'react';
import {Provider} from 'react-redux';

import Player from './player';
import View from './view';

export function App({store, game}) {
    return (
        <Provider store={store}>
            <div id="app">
                <h3>Fabled Lands</h3>
                <View game={game} />
                <Player />
            </div>
        </Provider>
    )
}
