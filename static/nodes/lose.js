import {connect} from 'react-redux';
import React from 'react';

import {loseCodeword, loseShards, loseStamina, setStaminaTo} from '../actions';

class Lose extends React.Component {
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
        shards && dispatch(loseShards(parseInt(shards)))
        stamina && dispatch(loseStamina(parseInt(stamina)))
        staminato && dispatch(setStaminaTo(parseInt(staminato)))
    }

    return {
        onClick: execute,
        execute: execute,
    }
}

export default connect(null, mapDispatchToProps)(Lose);