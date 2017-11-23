import {connect} from 'react-redux';
import React from 'react';

const Weapon = ({bonus, buy, sell}) => {
    return (
        <tr>
            <td className="item weapon">Combat +{bonus}</td>
            <td>{buy ? buy + " Shards" : ""}</td>
            <td>{sell ? sell + " Shards" : ""}</td>
        </tr>
    )
}

export default Weapon;