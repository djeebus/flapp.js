import React from 'react';
import {connect} from 'react-redux';

import {performRoll} from '../actions';

const Difficulty = ({ability, children, level, onClick}) => {
    return (
        <a onClick={onClick} href="javascript:void(0)">
            Perform a {ability} roll at level {level}
            {children}
        </a>
    )
}

const mapDispatchToProps = (dispatch, {ability, level}) => {
    return {
        onClick: () => dispatch(performRoll(ability, level))
    }
}

export default connect(null, mapDispatchToProps)(Difficulty);