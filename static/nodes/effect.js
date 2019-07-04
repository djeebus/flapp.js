import React from 'react';
import {connect} from 'react-redux';
import {ParentContext} from '../contexts'
import PropTypes from 'prop-types'
import { INSPECT_MAX_BYTES } from 'buffer';

class Effect extends React.Component {
    componentWillMount() {
        const {ability, bonus, parent} = this.props
        parent.registerEffect({
            ability,
            bonus,
        })
    }

    render() {
        return null;
    }
}

Effect.propTypes = {
    ability: PropTypes.string,
    bonus: PropTypes.string,
    parent: PropTypes.shape({
        registerEffect: PropTypes.func.isRequired,
    }).isRequired
}

const ConnectedEffect = connect()(Effect)

export default props => (
    <ParentContext.Consumer>
        {parent => <ConnectedEffect {...props} parent={parent} />}
    </ParentContext.Consumer>
) ;