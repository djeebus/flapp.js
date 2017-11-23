import React from 'react';
import {connect} from 'react-redux';

const Unknown = ({children, tag}) => {
    return <span>[[ {tag} ]] {children}</span>
}

export default connect()(Unknown);