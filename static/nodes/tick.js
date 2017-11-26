import React from 'react';
import {connect} from 'react-redux';

import {gainCodeword, addTick} from '../actions';

class Tick extends React.Component {
    componentDidMount() {
        const {group} = this.props
        if (!group) {
            this.props.execute()
        }
    }

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
}

const mapDispatchToProps = (dispatch, {codeword, game, god}) => {
    const execute = () => {
        const boxes = game.getBoxes()
        const ticks = game.getTicks()
        boxes && boxes > ticks && dispatch(addTick())

        codeword && dispatch(gainCodeword(codeword));
        god && dispatch(tickGod(god));
    }

    return {
        onClick: execute,
        execute: execute,
    }
}

export default connect(null, mapDispatchToProps)(Tick)