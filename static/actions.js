export const GO_TO_SECTION = 'GO_TO_SECTION';

const LOSE_SHARDS = 'LOSE_SHARDS';
export const loseShards = function (shards) {
    return {
        type: LOSE_SHARDS,
        shards: shards,
    };
}

const GAIN_STAMINA = 'GAIN_STAMINA'
export function gainStamina(stamina) {
    return {
        type: GAIN_STAMINA,
        stamina,
    }
}

const LOSE_STAMINA = 'LOSE_STAMINA'
export function loseStamina(stamina) {
    return {
        type: LOSE_STAMINA,
        stamina,
    }
}

const SET_STAMINA_TO = 'SET_STAMINA_TO'
export function setStaminaTo(stamina) {
    return {
        type: SET_STAMINA_TO,
        stamina,
    }
}

const GAIN_CODEWORD = 'GAIN_CODEWORD';
export const gainCodeword = function (codeword) {
    return {
        type: GAIN_CODEWORD,
        codeword,
    };
}

const LOSE_CODEWORD = 'LOSE_CODEWORD';
export function loseCodeword(codeword) {
    return {
        type: LOSE_CODEWORD,
        codeword,
    }
}
const ADD_TICK = 'ADD_TICK';
export function addTick() {
    return {
        type: ADD_TICK,
    }
}

const TICK_GOD = 'TICK_GOD'
export function tickGod(god) {
    return {
        type: TICK_GOD,
    }
}

const ADD_POISON = 'ADD_POISON'
export function addPoison(name, effects) {
    return {
        type: ADD_POISON,
        name,
        effects,
    }
}

const ADD_ITEM = 'ADD_ITEM'
export function addItem(name) {
    return {
        type: ADD_ITEM,
        name,
    }
}

const NEW_GAME = 'NEW_GAME'
export function newGame() {
    return {
        type: NEW_GAME,
    }
}

const SET_PLAYER = 'SET_PLAYER'
export function setPlayer(player) {
    return {
        type: SET_PLAYER,
        player,
    }
}

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_GAME:
            return {
                ...state,
                player: null,
            }

        case SET_PLAYER:
            return {
                ...state,
                player: {
                    ...action.player,
                    book: 1,
                    codewords: {},
                    maxStamina: action.player.stamina,
                    poisons: [],
                    section: 1,
                    ticks: {},
                    titles: {},
                },
            }

        case GO_TO_SECTION:
            return {
                ...state,
                player: {
                    ...state.player,
                    book: action.book,
                    section: action.section,
                }
            };

        case ADD_ITEM:
            return {
                ...state,
                player: {
                    ...state.player,
                    inventory: [
                        ...state.player.inventory,
                        action.item,
                    ],
                },
            }

        case ADD_TICK:
            let ticks = state.player.ticks
            let book = state.player.book
            let section = state.player.section
            let bookTicks = ticks[book] || {}
            let sectionTicks = bookTicks[section] || 0

            return {
                ...state,
                player: {
                    ...state.player,
                    ticks: {
                        ...ticks,
                        [book]: {
                            ...bookTicks,
                            [section]: sectionTicks + 1
                        }
                    }
                }
            }

        case GAIN_CODEWORD:
            return {
                ...state,
                player: {
                    ...state.player,
                    codewords: {
                        ...state.player.codewords,
                        [action.codeword]: true,
                    },
                },
            };

        case LOSE_CODEWORD:
            return {
                ...state,
                player: {
                    ...state.player,
                    codewords: {
                        ...state.player.codewords,
                        [action.codeword]: false,
                    },
                },
            }

        case GAIN_STAMINA:
            return {
                ...state,
                player: {
                    ...state.player,
                    stamina: Math.max(
                        state.stamina + action.stamina,
                        state.maxStamina,
                    )
                }
            }

        case SET_STAMINA_TO:
            return {
                ...state,
                player: {
                    ...state.player,
                    stamina: parseInt(action.stamina),
                }
            }

        case LOSE_STAMINA:
            return {
                ...state,
                player: {
                    ...state.player,
                    stamina: Math.max(state.player.stamina - action.stamina, 0),
                },
            }

        case ADD_POISON:
            return {
                ...state,
                player: {
                    ...state.player,
                    poisons: [
                        ...state.poisons,
                        {
                            name: action.name,
                            effects: action.effects,
                        },
                    ],
                },
            }

        default:
            return state;
    }
}

