import React from 'react';
import {connect} from 'react-redux';

const ElseIf = ({children}) => {
    return <span>{children}</span>
}

export default connect()(ElseIf);