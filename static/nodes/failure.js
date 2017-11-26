import React from 'react'
import Result from './result'

class Failure extends Result {
    constructor(props) {
        super(props)

        let game = props.game
        game.registerFailure(this)

        this.prompt = "Failure"
    }
}

export default Failure;
