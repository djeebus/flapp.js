import {connect} from 'react-redux';
import React from 'react';

const Tool = ({name, ability, bonus, buy, sell}) => {
    return (
        <tr>
            <td>{name} ({ability} +{bonus})</td>
            <td>{buy ? buy + " Shards" : ""}</td>
            <td>{sell ? sell + " Shards" : ""}</td>
        </tr>
    )
}

export default Tool;