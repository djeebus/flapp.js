import React from 'react';
import {addProps} from '../util'
import GoTo from './goto.js'

class Result extends React.Component {
    render() {
        const {children, game, section} = this.props
        const childProps = {game, group: this}

        if (children && children.length) {
            const childrenWithProps = addProps(children, childProps)
            return <span>{childrenWithProps}</span>
        }

        if (section) {
            return <p>On {this.prompt}, <GoTo {...childProps} section={section} /></p>
        }

        return null
    }
}

export default Result;
