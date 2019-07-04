import React from 'react';
import {connect} from 'react-redux';

import {addPoison} from '../actions'
import {addProps} from '../util'
import { ParentContext } from '../contexts';

class Poison extends React.Component {
    constructor(props) {
        super(props)

        this.effects = []
    }

    execute() {
        this.props.execute(this.effects)
    }

    registerEffect(effect) {
        this.effects.push(effect)
    }

    render() {
        const {children, game} = this.props
        const childrenWithProps = addProps(children, {game, parent: this})
        return (
            <ParentContext.Provider value={this}>
                <span>{childrenWithProps}</span>
            </ParentContext.Provider>
        )
    }
}

function mapDispatchToProps(dispatch, {children, name}) {
    return {
        execute: function (toSend) {
            dispatch(addPoison(name, toSend))
        }
    }
}

export default connect(null, mapDispatchToProps)(Poison);