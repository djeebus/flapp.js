import React from 'react';
import {connect} from 'react-redux'
import {addProps} from '../util'

class Outcomes extends React.Component {
    render() {
        const {children, game} = this.props
        const childrenWithProps = addProps(children, {game, parent: this})

        return (
            <ul>
                {childrenWithProps.map((child, index) => <li key={index}>{child}</li>)}
            </ul>
        )
    }
}

export default connect()(Outcomes);