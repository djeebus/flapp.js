import {connect} from 'react-redux';
import React from 'react';


const canExecute = ({
    player, safeAddGod, shards, codeword, profession, title, ticks, item,
}) => {
    if (shards) {
        shards = parseInt(shards);
        if (shards > player.shards) {
            return false;
        }
    }

    if (codeword) {
        if (player.codewords[codeword] !== true) {
            return false;
        }
    }

    if (item) {
        const hasItem = player.items.find(i => i.name == item)
        if (!hasItem) {
            return false;
        }
    }

    if (profession) {
        if (player.profession !== profession) {
            return false;
        }
    }

    if (title) {
        if (player.titles[title] !== true) {
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
        player: {
            codewords: state.codewords,
            items: state.items,
            profession: state.profession,
            shards: state.shards,
            titles: state.titles,
        },
        sectionTicks: game.getTicks(),
    };
}

export default connect(mapStateToProps)(If);