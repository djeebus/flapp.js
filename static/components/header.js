import {connect} from 'react-redux';
import React from 'react';

const Header = ({type}) => {
    return (<tr>
        <th>{type}</th>
        <th>To buy</th>
        <th>To sell</th>
    </tr>)
}

export default Header;