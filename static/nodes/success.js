import React from 'react'
import Result from './result'

class Success extends Result {
    constructor(props) {
        super(props)

        let game = props.game
        game.registerSuccess(this)
    }
}

export default Success;
