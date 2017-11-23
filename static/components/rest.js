import {connect} from 'react-redux';
import React from 'react';

import {requestRest} from '../actions';


const Rest = ({children, onClick}) => {
    return <a href="javascript:void(0)" onClick={onClick}>{children}</a>
}

const mapDispatchToProps = (dispatch, {shards, stamina}) => {
    return {
        onClick: () => dispatch(requestRest(shards, stamina))
    }
}

export default connect(null, mapDispatchToProps)(Rest);