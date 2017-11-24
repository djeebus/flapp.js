import {connect} from 'react-redux';
import React from 'react';

import {loseShards, loseStamina} from '../actions';

class Lose extends React.Component {
    componentDidMount() {
        const {group} = this.props

        if (group) {
            group.register(this.props.onClick)
        }
    }

    render() {
        const {children, group, onClick} = this.props

        if (group) {
            return null
        }

        return (
            <a href="javascript:void(0)" onClick={onClick}>
                {children}
            </a>
        );
    }
}

const mapDispatchToProps = function (dispatch, {shards, stamina}) {
    const execute = () => {
        console.log('losing stuff')

        shards && dispatch(loseShards(shards))
        stamina && dispatch(loseStamina(stamina))
    }

    return {
        onClick: execute,
        execute: execute,
    }
}

export default connect(null, mapDispatchToProps)(Lose);