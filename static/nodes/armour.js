import {connect} from 'react-redux';
import React from 'react';

const Armour = ({name, bonus, buy, sell}) => {
    return <span>{name} (+{bonus})</span>
}

export default Armour;