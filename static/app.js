import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';

import {Game} from './game';
import {App} from './components/app'
import configureStore from './store'

const initialData = {
    section: 1
};

const store = configureStore();
const game = new Game(store);

store.subscribe(function saveState() {
    let state = store.getState();
    state = JSON.stringify(state);

    window.localStorage.setItem("flapp.js", state);
})

store.subscribe(function updateGameState() {
    game.reset();
})

ReactDOM.render(
    <App store={store} game={game} />,
    document.getElementById('root'),
);
