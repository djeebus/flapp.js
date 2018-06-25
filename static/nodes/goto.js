import React from 'react';

class GoTo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    execute() {
        const {book, game, section} = this.props
        game.goToSection(book, section)
    }

    render() {
        const {section} = this.props

        return (
            <a href="javascript:void(0)" onClick={this.execute.bind(this)}>
                {this._renderPrompt()}
            </a>
        )
    }

    _renderPrompt() {
        const {children, index, section} = this.props

        if (children && children.length) {
            return <span>{children}</span>
        }

        const prompt = index == 0 ? "Turn" : "turn"
        return `${prompt} to #${section}`
    }
}

export default GoTo;
