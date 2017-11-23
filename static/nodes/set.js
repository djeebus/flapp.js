import React from 'react';
import {connect} from 'react-redux';

const Set = ({children}) => {
    return <span>{children}</span>
}

export default connect()(Set);