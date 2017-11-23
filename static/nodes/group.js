import React from 'react';
import {connect} from 'react-redux';

class Group extends React.Component {
    constructor(props) {
        super(props)

        this._callbacks = []
    }

    register(child) {
        console.log('registering group callback')
        this._callbacks.push(child)
    }

    onClick(child) {
        console.log(`executing ${this._callbacks.length} callbacks`)

        this._callbacks.forEach(callback => {
            callback()
        })
    }

    render() {
        const {children} = this.props

        var childrenWithProps = React.Children.map(
            children,
            child => React.cloneElement(child, {group: this}),
        )

        return (
            <a href="javascript:void(0)" onClick={this.onClick.bind(this)}>
                {childrenWithProps}
            </a>
        )
    }
}

export default Group