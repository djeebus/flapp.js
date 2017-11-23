import React from 'react';
import {connect} from 'react-redux';

import {goToSection, ROLL_SUCCESS} from '../actions';

const Success = ({lastRoll, registerSuccess, onSuccess}) => {
    registerSuccess(onSuccess);

    if (lastRoll == ROLL_SUCCESS) {
        onSuccess()
    }

    return null;
}

const mapStateToProps = ({lastRoll}) => {
    return {
        lastRoll,
    }
}

const mapDispatchToProps = (dispatch, {section}) => {
    return {
        onSuccess: () => dispatch(goToSection(section))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);
