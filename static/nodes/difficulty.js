import React from 'react';
import {connect} from 'react-redux';

import {performRoll} from '../actions';

class _Difficulty extends React.Component {
    render() {
        const {ability, game, level} = this.props

        return (
            <a onClick={() => game.performAbilityRoll(ability, level)}
               href="javascript:void(0)">
                {this._renderPrompt()}
            </a>
        )
    }

    _renderPrompt() {
        const {ability, children, index, level} = this.props
        if (children && children.length) {
            return children
        }

        const prefix = index == 0 ? "Perform" : "perform"
        return <span>{prefix} a {ability} roll at level {level}</span>
    }
}

export default connect()(_Difficulty);