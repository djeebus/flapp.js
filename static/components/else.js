import React from 'react';
import {connect} from 'react-redux';

const Else = ({children}) => {
    return <span>{children}</span>
}

export default connect()(Else);