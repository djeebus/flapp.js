import React from 'react';
import {connect} from 'react-redux';

class Failure extends React.Component {
    constructor(props) {
        super(props)

        let game = props.game
        game.registerFailure(this)
    }

    execute() {
        const {game, section} = this.props
        game.goToSection(null, section)
    }

    render() {
        return null
    }
}

export default Failure;
