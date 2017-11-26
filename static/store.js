import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import {reducer} from './actions';

const abilities = [
    'charisma', 'combat', 'magic',
    'sanctity', 'scouting', 'thievery',
]

const initialState = {
    player: null,
}

export default () => {
    let state = window.localStorage.getItem("flapp.js");
    if (state) {
        try {
            state = JSON.parse(state);
        } catch (e) {
            console.error('failed to read: ', e);
            state = null;
        }
    }

    if (!state) {
        state = initialState;
    }

    const enhancer = applyMiddleware(thunk);

    const store = createStore(reducer, state, enhancer);

    return store;
}
