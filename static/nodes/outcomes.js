import React from 'react';
import {connect} from 'react-redux';

const Outcomes = ({children}) => {
    return <span>{children}</span>
}

export default connect()(Outcomes);