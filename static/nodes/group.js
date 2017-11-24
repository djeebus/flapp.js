import React from 'react';
import {connect} from 'react-redux';

import {addProps} from '../util'

class Group extends React.Component {
    constructor(props) {
        super(props)

        this._members = []
    }

    register(member) {
        this._members.push(member)
    }

    onClick() {
        this._members.forEach(member => {
            member.execute()
        })
    }

    render() {
        const {children} = this.props
        const childrenWithProps = addProps(children, {group: this})

        return (
            <a href="javascript:void(0)" onClick={this.onClick.bind(this)}>
                {childrenWithProps}
            </a>
        )
    }
}

export default Group