import {connect} from 'react-redux';
import React from 'react';

const Trade = ({cargo, buy, sell}) => {
    return (<tr>
        <td className="item cargo">{cargo}</td>
        <td>{buy ? buy + " Shards" : ""}</td>
        <td>{sell ? sell + " Shards" : ""}</td>
    </tr>)
}

export default Trade;