import React from 'react';
import {connect} from 'react-redux';

import {goToSection} from '../actions';

class Success extends React.Component {
    constructor(props) {
        super(props)

        let game = props.game
        game.registerSuccess(props.onSuccess)
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch, {section}) => {
    return {
        onSuccess: () => {
            console.log('Success.onSuccess')
            dispatch(goToSection(section))
        }
    }
}

export default connect(null, mapDispatchToProps)(Success);
