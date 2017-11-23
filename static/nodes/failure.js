import React from 'react';
import {connect} from 'react-redux';

import {goToSection} from '../actions';

class Failure extends React.Component {
    constructor(props) {
        super(props)

        let game = props.game
        game.registerFailure(props.onFailure)
    }

    render() {
        return null
    }
}

const mapDispatchToProps = (dispatch, {section}) => {
    return {
        onFailure: () => dispatch(goToSection(section))
    }
}

export default connect(null, mapDispatchToProps)(Failure);
