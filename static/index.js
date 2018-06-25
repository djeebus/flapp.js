import React from 'react'
import ReactDOM from 'react-dom'
import queryString from 'query-string'

import {Game, GameContext} from './game'
import {App} from './components/app'
import configureStore from './store'

const store = configureStore();
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
    <App store={store} game={game} />,
    document.getElementById('root'));
