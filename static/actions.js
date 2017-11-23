var roll = () => {
    return Math.floor(Math.random() * 6) + 1;
}

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

const GAIN_CODEWORD = 'GAIN_CODEWORD';
export const gainCodeword = function (codeword) {
    return {
        type: GAIN_CODEWORD,
        codeword: codeword,
    };
}

const ROLL_ATTEMPT = 'ROLL_ATTEMPT';
export const ROLL_SUCCESS = 'ROLL_SUCCESS';
export const ROLL_FAILURE = 'ROLL_FAILURE';
export const performRoll = function (ability, level) {
    return (dispatch, getState) => {
        dispatch({
            type: ROLL_ATTEMPT,
            ability,
            level,
        })

        let state = getState();
        let currentLevel = state.abilities[ability];

        let result = roll() + roll()
        console.log(result, ' > ', level)

        if (result > level) {
            dispatch({
                type: ROLL_SUCCESS,
                ability,
                level,
            })
        } else {
            dispatch({
                type: ROLL_FAILURE,
                ability,
                level,
            })
        }
    }
}

const REQUEST_REST = 'REQUEST_REST';
export const REST_SUCCESS = 'REST_SUCCESS';
export const REST_FAILURE = 'REST_FAILURE';
export const requestRest = function (shards, stamina) {
    return (dispatch, getState) => {
        dispatch({
            type: REQUEST_REST,
            shards,
            stamina,
        })

        let state = getState();
        if (state.shards == shards) {
            dispatch({
                type: REST_SUCCESS,
                shards,
                stamina,
            })
        } else {
            dispatch({
                type: REST_FAILURE,
                shards,
                stamina,
            })
        }
    }
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

        case ROLL_SUCCESS:
        case ROLL_FAILURE:
            return {
                ...state,
                lastRoll: action.type,
            }

        default:
            return state;
    }
}

