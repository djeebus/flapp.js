import React from 'react';
import {connect} from 'react-redux';

import {gainCodeword} from '../actions';

const Tick = function ({children, hidden, onClick}) {
    if (hidden == "t") {
        onClick()
        return null;
    }

    if (children.length > 0) {
        return (
            <a href="javascript:void(0)" onClick={onClick}>
                {children}
            </a>
        );
    } else {
        return (
            <span />
        )
    }
}

const mapDispatchToProps = (dispatch, {codeword, god}) => {
    const execute = () => {
        codeword && dispatch(gainCodeword(codeword));
        god && dispatch(tickGod(god));
    }

    return {
        onClick: execute,
        execute: execute,
    }
}

export default connect(null, mapDispatchToProps)(Tick)