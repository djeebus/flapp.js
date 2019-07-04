import React from 'react';
import { ParentContext } from '../contexts';

class Random extends React.Component {
    constructor(props) {
        super(props)

        this.adjustments = []
    }

    onClick() {
        const {game, dice=1} = this.props
        game.performRandomRoll(dice)
    }

    addAdjust(adjustment) {
        this.adjustments.push(adjustment)
    }

    render() {
        let {children, dice=1} = this.props

        if (!children || children.length == 0) {
            children = `Roll ${dice} dice`
        }

        return (
            <ParentContext.Provider value={this}>
                <a href="javascript:void(0)"
                onClick={this.onClick.bind(this)}
                >
                    {children}
                </a>
            </ParentContext.Provider>
        )
    }
}

export default Random