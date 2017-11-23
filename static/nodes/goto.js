import {connect} from 'react-redux';
import React from 'react';

import {goToSection} from '../actions';

class GoTo extends React.Component {
    componentDidMount() {
        const {group, onClick} = this.props

        if (group) {
            group.register(onClick)
        }
    }

    render() {
        const {children, group, onClick, section} = this.props

        if (group) {
            return null;
        }

        return (
            <a href="javascript:void(0)" onClick={onClick}>
                {this._renderPrompt()}
            </a>
        )
    }

    _renderPrompt() {
        const {children, section} = this.props

        if (children.length) {
            return children
        }

        return `go to section #${section}`
    }
}

const mapDispatchToProps = (dispatch, {section}) => {
    return {
        onClick: () => dispatch(goToSection(section)),
    };
}

export default connect(null, mapDispatchToProps)(GoTo);
