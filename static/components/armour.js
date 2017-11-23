import {connect} from 'react-redux';
import React from 'react';

const Armour = ({name, bonus, buy, sell}) => {
    return (
        <tr>
            <td className="item armour">
                {name} (+{bonus})
            </td>
            <td>{buy ? buy + " Shards" : ""}</td>
            <td>{sell ? sell + " Shards" : ""}</td>
        </tr>
    )
}

export default Armour;