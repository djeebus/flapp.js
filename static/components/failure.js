import React from 'react';
import {connect} from 'react-redux';

const Failure = ({children}) => {
    return <span>{children}</span>
}

export default connect()(Failure);