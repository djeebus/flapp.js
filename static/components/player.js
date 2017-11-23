import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

const Player = ({codewords, shards, stamina}) => {
    return (
        <div>
            <h3>Codewords</h3>
            <ul>{codewords.map(cw => <li key={cw}>{cw}</li>)}</ul>

            <h3>Shards</h3>
            <div>{shards} shards</div>

            <h3>Stamina</h3>
            <div>{stamina}</div>
        </div>
    )
}

const mapStateToProps = ({codewords, shards, stamina}) => {
    let cws = []
    for (let key in codewords) {
        let value = codewords[key]
        if (value) {
            cws.push(key)
        }
    }

    cws = _.sortBy(cws);

    return {
        codewords: cws,
        shards,
        stamina,
    }
}

export default connect(mapStateToProps)(Player)