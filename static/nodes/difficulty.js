import React from 'react';
import {connect} from 'react-redux';
import {ParentContext} from '../contexts'
import Adjustments from '../components/adjustments'

class Difficulty extends React.Component {
    constructor(props) {
        super(props)

        this.adjustments = new Adjustments()
        this.execute = this.execute.bind(this)
    }

    render() {
        const {ability, children, index, level} = this.props
        const prefix = index == 0 ? "Perform" : "perform"

        return (
            <ParentContext.Provider value={this}>
                <a onClick={this.execute}
                  href="javascript:void(0)"
                >
                    {prefix} a {ability} roll at level {level}
                    {children}
                </a>
            </ParentContext.Provider>
        )
    }

    execute() {
        const {ability, level, player} = this.props
        var adjustment = this.adjustments.calculate(player)
        this.props.game.performAbilityRoll(ability, level, adjustment)
    }

    addAdjust(adjust) {
        this.adjustments.push(adjust)
    }
}

function mapStateToProps(state) {
    return {
        player: state.player,
    }
}

export default connect(mapStateToProps)(Difficulty);