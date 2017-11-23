import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

const Player = ({codewords, shards}) => {
    return (
        <div>
            <h3>Codewords</h3>
            <ul>{codewords.map(cw => <li key={cw}>{cw}</li>)}</ul>
        </div>
    )
}

const mapStateToProps = ({codewords, shards}) => {
    let cws = []
    for (let key in codewords) {
        let value = codewords[key]
        if (value) {
            cws.push(key)
        }
    }

    cws = _.sortBy(cws);

    return {
        codewords: cws
    }
}

export default connect(mapStateToProps)(Player)