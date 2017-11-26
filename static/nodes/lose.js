import {connect} from 'react-redux';
import React from 'react';

import {loseCodeword, loseShards, loseStamina, setStaminaTo} from '../actions';

class Lose extends React.Component {
    constructor(props) {
        super(props)

        const {group} = props

        if (group) {
            group.register(this)
        }
    }

    execute() {
        this.props.execute()
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

const mapDispatchToProps = function (dispatch, {codeword, shards, stamina, staminato}) {
    const execute = () => {
        console.log('losing stuff')

        codeword && dispatch(loseCodeword(codeword))
        shards && dispatch(loseShards(shards))
        stamina && dispatch(loseStamina(stamina))
        staminato && dispatch(setStaminaTo(staminato))
    }

    return {
        onClick: execute,
        execute: execute,
    }
}

export default connect(null, mapDispatchToProps)(Lose);