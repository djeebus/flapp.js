import { connect } from 'react-redux';
import React from 'react';
import { addProps } from '../util';


class If extends React.Component {
    constructor(props) {
        super(props)

        this.state = {'isTrue': false}

        this._executables = []
    }

    canExecute() {
        const {
            codeword, equals, game, item, player, profession,
            safeAddGod, sectionTicks, shards, ticks, title,
        } = this.props

        if (shards) {
            if (parseInt(shards) > player.shards) {
                return false;
            }
        }

        if (codeword) {
            if (player.codewords[codeword] !== true) {
                return false;
            }
        }

        if (item) {
            const hasItem = player.inventory.find(i => i.name == item)
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
            if (parseInt(ticks) != sectionTicks) {
                return false;
            }
        }

        if (this.props.var) {
            const value = game.getVar(this.props.var)
            if (value != equals) {
                return false
            }
        }

        return true;
    }

    register(child) {
        this._executables.push(child)
        console.log('registering child (now ', this._executables.length, ')')
    }

    componentDidMount() {
        let result = this.canExecute(this.props);
        if (this.props.not == "t") {
            result = !result
        }

        console.log('execute', result)

        if (result) {
            this.setState({'execute': true})
            this._executables.forEach(child => child.execute())
        }
    }

    render() {
        const {children, hidden} = this.props
        const {execute} = this.state
        let attrs = {}
        if (!execute) {
            attrs['disabled'] = 'disabled'
            attrs['style'] = {'textDecorationLine': 'line-through'}
        }

        const childrenWithProps = addProps(children, {group: this})

        return <span {...attrs}>{childrenWithProps}</span>
    }
}

const mapStateToProps = ({player}, {game}) => {
    return {
        player: {
            codewords: player.codewords,
            inventory: player.inventory,
            profession: player.profession,
            shards: player.shards,
            titles: player.titles,
        },
        sectionTicks: game.getTicks(),
    };
}

export default connect(mapStateToProps)(If);