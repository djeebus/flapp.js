import React from 'react';
import {connect} from 'react-redux';

import {addPoison} from '../actions'
import {addProps} from '../util'

class Poison extends React.Component {
    constructor(props) {
        super(props)

        this.effects = []
    }

    componentDidMount() {
        const {group} = this.props
        if (group) {
            group.register(this);
        }
    }

    execute() {
        this.props.execute(this.effects)
    }

    registerEffect(effect) {
        this.effects.push(effect)
    }

    render() {
        const {children} = this.props
        const childrenWithProps = addProps(children, {parent: this})
        return <span>{childrenWithProps}</span>
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