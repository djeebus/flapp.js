import {connect} from 'react-redux';
import React from 'react';

const Header = ({type, header1, header2, header3}) => {
    if (type) {
        return type
    }

    return (
        <tr>
            <th>{header1}</th>
            <th>{header2}</th>
            <th>{header3}</th>
        </tr>
    )
}

export default Header;