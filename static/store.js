import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import {reducer} from './actions';

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
        state = initialData;
    }

    state.abilities = state.abilities || {}
    state.profession = state.profession || "Priest"
    state.section = state.section || 1
    state.shards = state.shards || 0

    let abilities = [
        'charisma', 'combat', 'magic',
        'sanctity', 'scouting', 'thievery',
    ]

    for (let index in abilities) {
        let ability = abilities[index]
        state.abilities[ability] = state.abilities[ability] || 1
    }

    const enhancer = applyMiddleware(thunk);

    const store = createStore(reducer, state, enhancer);

    return store;
}
