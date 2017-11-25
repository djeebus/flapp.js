import React from 'react';
import {connect} from 'react-redux';

import {performRoll} from '../actions';

const Difficulty = ({ability, children, game, index, level}) => {
    const prefix = index == 0 ? "Perform" : "perform"

    return (
        <a onClick={() => game.performAbilityRoll(ability, level)}
           href="javascript:void(0)">
            {prefix} a {ability} roll at level {level}
            {children}
        </a>
    )
}

export default connect()(Difficulty);