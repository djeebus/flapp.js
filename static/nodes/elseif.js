import React from 'react';
import {connect} from 'react-redux';

import If from './if'

class ElseIf extends If {
    canExecute() {
        let node = this
        do {
            const {executed} = this.state
            if (executed) {
                return false
            }
            node = this.props.parent
        } while (node)

        return super.canExecute()
    }
}

export default ElseIf;