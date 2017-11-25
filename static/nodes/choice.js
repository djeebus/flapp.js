import {connect} from 'react-redux';
import React from 'react';

import {goToSection} from '../actions';

class Choice extends React.Component {
    execute() {
        const {game, section} = this.props

        game.goToSection(null, section)
    }

    render() {
        const {children} = this.props

        return (
            <li>
                <a
                    href="javascript:void(0)"
                    onClick={this.execute.bind(this)}
                >
                    {children}
                </a>
            </li>
        )
    }
}

export default Choice