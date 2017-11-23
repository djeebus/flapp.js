const GO_TO_SECTION = 'GO_TO_SECTION';
export const goToSection = function (section) {
    return {
        type: GO_TO_SECTION,
        section,
    };
}

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

export const reducer = (state = initialData, action) => {
    console.log(action.type);

    switch (action.type) {
        case GO_TO_SECTION:
            return {
                ...state,
                lastRoll: null,
                section: action.section,
            };

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

        default:
            return state;
    }
}

