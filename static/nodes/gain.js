import React from 'react';
import {connect} from 'react-redux';

import {gainCodeword} from '../actions';

const Gain = ({children, onClick}) => {
    return (
        <a href="javascript:void(0)"
            onClick={onClick}
        >
            {children}
        </a>
    )
}

const mapDispatchToProps = (dispatch, {codeword}) => {
    return {
        onClick: () => dispatch(gainCodeword(codeword)),
    };
}

export default connect(null, mapDispatchToProps)(Gain);
