import React from 'react';
import {connect} from 'react-redux'
import {addProps} from '../util'

class Outcomes extends React.Component {
    constructor(props) {
        super(props)

        const {game} = props

        this.outcomes = []
        game.registerOutcomes(this)
    }

    registerOutcome(outcome) {
        this.outcomes.push(outcome)
    }

    execute(result) {
        for (let index in this.outcomes) {
            let outcome = this.outcomes[index]
            outcome.execute(result);
        }
    }

    render() {
        const {children} = this.props
        const childrenWithProps = addProps(children, {parent: this})

        return (
            <ul>
                {childrenWithProps.map((child, index) => <li key={index}>{child}</li>)}
            </ul>
        )
    }
}

export default connect()(Outcomes);