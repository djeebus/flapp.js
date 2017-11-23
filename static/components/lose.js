import {connect} from 'react-redux';
import React from 'react';

import {loseShards} from '../actions';

const Lose = ({children, onClick}) => {
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

const mapDispatchToProps = function (dispatch, {shards}) {
    const execute = () => {
        shards && dispatch(loseShards(shards))
    }

    return {
        onClick: execute,
        execute: execute,
    }
}

export default connect(null, mapDispatchToProps)(Lose);