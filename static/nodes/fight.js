import React from 'react';
import {connect} from 'react-redux';
import { loseStamina } from '../actions';

class _Fight extends React.Component {

    constructor(props) {
        super(props)
        const {stamina} = this.props
        this.state = {hp: stamina}
    }

    render() {
        const {name, monsterCombat, monsterDefense, stamina, flee} = this.props
        const {hp} = this.state

        return (
            <div>
                <h4>{name}</h4>
                <div>Combat: {monsterCombat}</div>
                <div>Defence: {monsterDefense}</div>
                <div>Stamina: {hp}/{stamina}</div>
                <div>Flee: {flee}</div>
                <a href="javascript:void(0)" onClick={this.onClick.bind(this)}>
                    Fight!
                </a>
            </div>
        )
    }

    onClick() {
        const {
            playerCombat, playerDefense,
            monsterCombat, monsterDefense,
            game, flee,
        } = this.props

        let intFlee = parseInt(flee) || 0

        const monsterHits = this._oneRound(playerCombat, monsterDefense)
        if (monsterHits > 0) {
            const monsterHp = this.reduceMonster(monsterHits)
            if (monsterHp <= intFlee) {
                return
            }
        }

        const playerHits = this._oneRound(monsterCombat, playerDefense)
        if (playerHits > 0) {
            this.props.reducePlayer(playerHits)
        }
    }

    reduceMonster(stamina) {
        const {hp} = this.state

        const newHp = hp - stamina

        this.setState({hp: newHp})

        return newHp
    }

    _oneRound(combat, defense) {
        const {game} = this.props

        const result = game.roll(2) + combat

        console.log(result, 'vs', defense)
        return result - defense
    }
}

function getPlayerCombat(player) {
    let totalBonus = 0
    player.inventory.forEach(({bonus, type}) => {
        if (type != 'weapon') {
            return
        }

        if (bonus) {
            totalBonus += bonus
        }
    })

    return player.abilities.combat + totalBonus
}

function getPlayerDefense(player) {
    let totalBonus = 0
    player.inventory.forEach(({bonus, type}) => {
        if (type != 'armour') {
            return
        }

        if (bonus) {
            totalBonus += bonus
        }
    })

    return player.rank + totalBonus + player.abilities.combat
}

function mapStateToProps({player}, {combat, defence}) {
    return {
        playerCombat: getPlayerCombat(player),
        playerDefense: getPlayerDefense(player),
        monsterCombat: parseInt(combat),
        monsterDefense: parseInt(defence),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reducePlayer: stamina => dispatch(loseStamina(stamina)),
    }
}

export default connect(mapStateToProps)(_Fight)
