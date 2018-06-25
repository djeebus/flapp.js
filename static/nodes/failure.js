import React from 'react'
import Result from './result'

class Failure extends Result {
    constructor(props) {
        super(props)
        this.prompt = "Failure"
    }
}

export default Failure;
