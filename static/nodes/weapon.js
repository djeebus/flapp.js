import {connect} from 'react-redux';
import React from 'react';

const Weapon = ({bonus, buy, sell}) => {
    return <span>Combat +{bonus}</span>
}

export default Weapon;