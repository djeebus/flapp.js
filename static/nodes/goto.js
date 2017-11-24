import React from 'react';

class GoTo extends React.Component {
    componentDidMount() {
        const {group} = this.props

        if (group) {
            group.register(this)
        }
    }

    execute() {
        const {book, game, section} = this.props
        game.goToSection(book, section)
    }

    render() {
        const {children, section} = this.props

        return (
            <a href="javascript:void(0)" onClick={this.execute.bind(this)}>
                {this._renderPrompt()}
            </a>
        )
    }

    _renderPrompt() {
        const {children, section} = this.props

        if (children.length) {
            return children
        }

        return `Turn to #${section}`
    }
}

export default GoTo;
