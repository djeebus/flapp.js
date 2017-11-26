import React from 'react';
import {connect} from 'react-redux';

class Set extends React.Component {
    constructor(props) {
        super(props)

        const {group} = this.props
        group.register(this)
    }

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