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

const GAIN_CODEWORD = 'GAIN_CODEWORD';
export const gainCodeword = function (codeword) {
    return {
        type: GAIN_CODEWORD,
        codeword: codeword,
    };
}

const ADD_TICK = 'ADD_TICK';
export function addTick() {
    return {
        type: ADD_TICK,
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

export const reducer = (state = initialData, action) => {
    console.log(action);

    switch (action.type) {
        case GO_TO_SECTION:
            return {
                ...state,
                book: action.book,
                section: action.section,
            };

        case ADD_ITEM:
            let items = state.items
            return {
                ...state,
                items: [
                    ...items,
                    {name: action.name},
                ],
            }

        case ADD_TICK:
            let ticks = state.ticks
            let book = state.book
            let section = state.section
            let bookTicks = ticks[book] || {}
            let sectionTicks = bookTicks[section] || 0

            return {
                ...state,
                ticks: {
                    ...ticks,
                    [book]: {
                        ...bookTicks,
                        [section]: sectionTicks + 1
                    }
                }
            }

        case GAIN_CODEWORD:
            return {
                ...state,
                codewords: {
                    ...state.codewords,
                    [action.codeword]: true,
                },
            };

        case GAIN_STAMINA:
            return {
                ...state,
                stamina: Math.max(
                    state.stamina + action.stamina,
                    state.maxStamina,
                )
            }

        case LOSE_STAMINA:
            return {
                ...state,
                stamina: Math.max(state.stamina - action.stamina, 0),
            }

        case ADD_POISON:
            return {
                ...state,
                poisons: [
                    ...state.poisons,
                    {
                        name: action.name,
                        effects: action.effects,
                    },
                ],
            }

        default:
            return state;
    }
}

