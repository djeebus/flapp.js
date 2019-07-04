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

export function configureStore(state) {
    if (!state) {
        state = initialState;
    }

    const enhancer = applyMiddleware(thunk);

    const store = createStore(reducer, state, enhancer);

    return store;
}
