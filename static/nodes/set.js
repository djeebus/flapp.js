import React from 'react';
import {connect} from 'react-redux';

class Set extends React.Component {
    execute() {
        console.log('setting stuff')
        const {game, value} = this.props
        let name = this.props.var

        game.setVar(name, value)
    }

    render() {
        return null
    }
}

export default connect()(Set);