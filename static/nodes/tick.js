import React from 'react';
import {connect} from 'react-redux';

import {gainCodeword, addTick} from '../actions';

class Tick extends React.Component {
    execute() {
        this.props.execute()
    }

    render() {
        const {children, hidden, onClick} = this.props

        if (hidden == "t") {
            onClick()
            return null;
        }

        if (children.length > 0) {
            return (
                <a href="javascript:void(0)" onClick={onClick}>
                    {children}
                </a>
            );
        } else {
            return (
                <span>put a tick there now</span>
            )
        }
    }

    componentWillMount() {
        const {group} = this.props
        if (!group) {
            this.execute()
        }
    }
}

const mapDispatchToProps = (dispatch, {codeword, game, god}) => {
    const execute = () => {
        console.log('tick')
        if (codeword) {
            dispatch(gainCodeword(codeword));
        } else if (god) {
            dispatch(tickGod(god))
        } else {
            const boxes = game.getBoxes()
            const ticks = game.getTicks()
            boxes && boxes > ticks && dispatch(addTick())
        }
    }

    return {
        onClick: execute,
        execute: execute,
    }
}

export default connect(null, mapDispatchToProps)(Tick)