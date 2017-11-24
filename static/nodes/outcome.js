import React from 'react'
import {connect} from 'react-redux'
import {addProps} from '../util'

class Outcome extends React.Component {
    constructor(props) {
        super(props)

        this.state = {executed: null}
        this.activeChildren = []

        const {parent} = this.props
        parent.registerOutcome(this)
    }

    execute(result) {
        let [min, max] = this.getRange()
        min = parseInt(min)
        max = parseInt(max)

        const success = result >= min && result <= max
        this.setState({executed: success})

        if (!success) {
            return false;
        }

        for (let index in this.activeChildren) {
            let active = this.activeChildren[index]
            active.execute()
        }

        return true;
    }

    getRange() {
        const {range} = this.props
        if (range === undefined) {
            return
        }

        if (range.indexOf(",")) {
            return range.split(',')
        }

        if (range.indexOf("-")) {
            return range.split('-')
        }

        return [range, range]
    }

    register(child) {
        this.activeChildren.push(child)
    }

    render() {
        const {children, range} = this.props
        const {executed} = this.state

        let attrs = {}
        if (executed === true) {
            attrs.style = {color: '#0F0'}
        } else {
            attrs.style = {color: '#CCC'}
        }

        const childrenWithProps = addProps(children, {group: this})

        return <span {...attrs}>{range}: {childrenWithProps}</span>
    }
}

export default connect()(Outcome);