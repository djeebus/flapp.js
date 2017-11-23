import {connect} from 'react-redux';
import React from 'react';

export default (props, state) => {
    return (
        <ul>
            {props.children}
        </ul>
    )
}
