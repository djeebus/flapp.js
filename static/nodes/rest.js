import {connect} from 'react-redux';
import React from 'react';

import {requestRest} from '../actions';


export default ({children, game, shards, stamina}) => {
    function onClick() {
        game.rest(shards, stamina)
    }

    return <a href="javascript:void(0)" onClick={onClick}>{children}</a>
}
