import React from 'react'

class RankCheck extends React.Component {
    onClick() {
        const {add, dice, game} = this.props

        game.performRankCheck(dice, add)
    }

    render() {
        const {children} = this.props

        return <a href="javascript:void(0)" onClick={this.onClick.bind(this)}>{children}</a>
    }
}

export default RankCheck