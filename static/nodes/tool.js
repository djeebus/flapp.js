import {connect} from 'react-redux';
import React from 'react';

const Tool = ({name, ability, bonus, buy, sell}) => {
    return <span>{name} ({ability} +{bonus})</span>
}

export default Tool;