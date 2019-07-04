import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'

import {Game, GameContext} from './game'
import {App} from './components/app'
import {configureStore} from './store'
import { Provider } from 'react-redux';

function getInitialState() {
    let state = window.localStorage.getItem("flapp.js");
    if (state) {
        try {
            state = JSON.parse(state);
        } catch (e) {
            console.error('failed to read: ', e);
            state = null;
        }
    }
    return state
}

const state = getInitialState();
const store = configureStore(state);
const game = new Game(store);

const parsed = queryString.parse(location.search)
if (parsed.section || parsed.book) {
    game.goToSection(parsed.book, parsed.section)

    var newurl = location.protocol + "//" + location.host + location.pathname;
    window.history.pushState({path: newurl}, '', newurl)
}

store.subscribe(function saveState() {
    let state = store.getState();
    state = JSON.stringify(state);

    window.localStorage.setItem("flapp.js", state);
})

ReactDOM.render(
    <Provider store={store}>
        <App game={game} />
    </Provider>,
    document.getElementById('root'));
