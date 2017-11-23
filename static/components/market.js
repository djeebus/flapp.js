import {connect} from 'react-redux';
import React from 'react';

const Market = ({children}) => {
    return (
        <table className="market">
            <caption>Market</caption>

            <tbody>{children}</tbody>
        </table>
    )
}

export default Market;