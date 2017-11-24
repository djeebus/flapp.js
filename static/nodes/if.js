import {connect} from 'react-redux';
import React from 'react';


const canExecute = ({
    safeAddGod, shards, playerShards, codeword, playerCodewords, profession,
    playerProfession, title, playerTitles, ticks, sectionTicks,
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

    if (title) {
        if (playerTitles[title] !== true) {
            return false;
        }
    }

    if (ticks != undefined) {
        ticks = parseInt(ticks)
        if (ticks != sectionTicks) {
            return false;
        }
    }

    return true;
}

const If = function (props) {
    let attrs = {}
    let result = canExecute(props);
    if (props.not == "t") {
        result = !result
    }

    if (!result) {
        attrs['disabled'] = 'disabled'
        attrs['style'] = {'textDecorationLine': 'line-through'}
    }

    return <span {...attrs}>{props.children}</span>
}

const mapStateToProps = (state, {game}) => {
    return {
        playerCodewords: state.codewords,
        playerProfession: state.profession,
        playerShards: state.shards,
        playerTitles: state.titles,
        sectionTicks: game.getTicks(),
    };
}

export default connect(mapStateToProps)(If);