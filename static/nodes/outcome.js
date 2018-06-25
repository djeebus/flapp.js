import React from 'react'
import {connect} from 'react-redux'
import {addProps} from '../util'

class Outcome extends React.Component {
    constructor(props, context) {
        super(props, context)

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

        const {game, section} = this.props
        if (section) {
            game.goToSection(null, section)
            return
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

        if (range.indexOf(",") != -1) {
            return range.split(',')
        }

        if (range.indexOf("-") != -1) {
            return range.split('-')
        }

        return [range, range]
    }

    render() {
        const {children, game, range} = this.props
        const {executed} = this.state

        let attrs = {}
        if (executed === true) {
            attrs.style = {color: '#0F0'}
        } else {
            attrs.style = {color: '#CCC'}
        }

        const childrenWithProps = addProps(children, {game, group: this})

        return <span {...attrs}>{range}: {childrenWithProps}</span>
    }
}

export default connect()(Outcome);