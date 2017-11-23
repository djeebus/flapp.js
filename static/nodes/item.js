import {connect} from 'react-redux';
import React from 'react';

const Item = ({name, tags, buy, sell}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{buy ? buy + " Shards" : ""}</td>
            <td>{sell ? sell + " Shards" : ""}</td>
        </tr>
    )
}

export default Item;