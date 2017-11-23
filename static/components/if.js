import {connect} from 'react-redux';
import React from 'react';


const canExecute = ({
    safeAddGod, shards, playerShards, codeword, playerCodewords, profession,
    playerProfession,
}) => {
    if (shards) {
        shards = parseInt(shards);
        if (shards > playerShards) {
            return false;
        }
    }

    if (codeword) {
        if (playerCodewords[codeword] !== true) {
            return false;
        }
    }

    if (profession) {
        if (playerProfession !== profession) {
            return false;
        }
    }

    return true;
}

const If = function (props) {
    let attrs = {}
    if (!canExecute(props)) {
        attrs['disabled'] = 'disabled'
        attrs['style'] = {'textDecorationLine': 'line-through'}
    }

    return <span {...attrs}>{props.children}</span>
}

const mapStateToProps = state => {
    return {
        playerCodewords: state.codewords,
        playerProfession: state.profession,
        playerShards: state.shards,
    };
}

export default connect(mapStateToProps)(If);