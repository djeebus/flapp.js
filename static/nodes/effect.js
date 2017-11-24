import React from 'react';
import {connect} from 'react-redux';

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

export default connect()(Effect);