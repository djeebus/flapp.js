import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';

import configureStore from './store'
import Player from './components/player';
import Section from './components/section';

const initialData = {
    section: 1
};

const store = configureStore();
store.subscribe(function () {
    let state = store.getState();
    state = JSON.stringify(state);

    window.localStorage.setItem("flapp.js", state);
})

const App = function () {
    return (
        <Provider store={store}>
            <div id="app">
                <h3>Fabled Lands</h3>
                <Section />
                <Player />
            </div>
        </Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
