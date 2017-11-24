import React from 'react';

export default class Random extends React.Component {
    onClick() {
        const {game, dice} = this.props
        game.performRandomRoll(dice)
    }

    render() {
        let {children, dice} = this.props

        if (!children || children.length == 0) {
            children = `Roll ${dice} dice`
        }

        return (
            <a href="javascript:void(0)"
               onClick={this.onClick.bind(this)}
            >
               {children}
            </a>
        )
    }
}
