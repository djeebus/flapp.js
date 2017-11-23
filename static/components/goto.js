import {connect} from 'react-redux';
import React from 'react';

import {goToSection} from '../actions';

const GoTo = ({onClick, section}) => {
    return (
        <a href="javascript:void(0)" onClick={onClick}>
           go to section #{section}
        </a>
    )
}

const mapDispatchToProps = (dispatch, {section}) => {
    return {
        onClick: () => dispatch(goToSection(section)),
    };
}

export default connect(null, mapDispatchToProps)(GoTo);
