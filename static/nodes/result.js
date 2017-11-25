import React from 'react';
import {addProps} from '../util'

class Result extends React.Component {
    constructor(props) {
        super(props)

        this._registrations = []
    }

    execute() {
        if (this._registrations && this._registrations.length) {
            this._registrations.forEach(child => child.execute())
            return
        }

        const {game, section} = this.props
        game.goToSection(null, section)
    }

    register(child) {
        this._registrations.push(child)
    }

    render() {
        const {children, section} = this.props

        if (children && children.length) {
            const childrenWithProps = addProps(children, {group: this})
            return <span>{childrenWithProps}</span>
        }

        if (section) {
            return `Go to #${section}`
        }

        return null
    }
}

export default Result;
