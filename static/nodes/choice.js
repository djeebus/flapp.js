import {connect} from 'react-redux';
import React from 'react';

import {goToSection} from '../actions';

const Choice = ({children, onClick, section}) => {
    return (
        <li>
            <a
                href="javascript:void(0)"
                onClick={() => onClick(section)}
            >
                {children}
            </a>
        </li>
    )
}

export default connect(
    (state, props) => {return {}},
    (dispatch, {section}) => {
        return {
            onClick: () => dispatch(goToSection(section)),
        };
    }

)(Choice);
