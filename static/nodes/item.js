import {connect} from 'react-redux';
import React from 'react';

import {addItem} from '../actions'

class Item extends React.Component {
    constructor(props) {
        super(props)

        const {group} = this.props
        group.register(this)
    }

    execute() {
        this.props.execute()
    }

    render() {
        const {name} = this.props
        return <b>{name}</b>
    }
}

function mapDispatchToProps(dispatch, {name}) {
    return {
        execute: () => dispatch(addItem(name))
    }
}

export default connect(null, mapDispatchToProps)(Item);