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

    // player
    state.abilities = state.abilities || {}
    state.codewords = state.codewords || {}
    state.items = state.items || []
    state.poisons = state.poisons || []
    state.profession = state.profession || "Priest"
    state.shards = state.shards || 16
    state.maxStamina = state.maxStamina || 9
    state.stamina = state.stamina || 9
    state.titles = state.titles || {}

    for (let index in abilities) {
        let ability = abilities[index]
        state.abilities[ability] = state.abilities[ability] || 1
    }

    const enhancer = applyMiddleware(thunk);

    const store = createStore(reducer, state, enhancer);

    return store;
}
