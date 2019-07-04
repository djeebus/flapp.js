import React from 'react'
import { ParentContext } from '../contexts';

class RankCheck extends React.Component {
    constructor(props) {
        super(props)

        this.adjustments = []
    }

    addAdjust(adjustment) {
        this.adjustments.push(adjustment)
    }

    onClick() {
        const {add, dice, game} = this.props

        game.performRankCheck(dice, add)
    }

    render() {
        const {children} = this.props

        return (
            <ParentContext.Provider value={this}>
                <a href="javascript:void(0)"
                   onClick={this.onClick.bind(this)}>{children}</a>
            </ParentContext.Provider>
        )
    }
}

export default RankCheck