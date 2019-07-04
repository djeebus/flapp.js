import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class Player extends React.Component {
    _renderEffect(effect, index) {
        return (
            <span key={index}>
                {effect.ability} {effect.bonus > 0 ? "+" : ""}{effect.bonus}
            </span>
        )
    }

    _renderItem(item, index) {
        return <li key={index}>{item.name}</li>
    }

    _renderPoison(poison, index) {
        const effects = poison.effects || []
        return (
            <li key={index}>
                {poison.name}:
                {effects.map(this._renderEffect.bind(this))}
            </li>
        )
    }

    render() {
        const {abilities, codewords, inventory, poisons, shards, stamina} = this.props

        return (
            <div>
                <h3>Codewords</h3>
                <ul>{codewords.map(cw => <li key={cw}>{cw}</li>)}</ul>

                <h3>Shards</h3>
                <div>{shards} shards</div>

                <h3>Stamina</h3>
                <div>{stamina}</div>

                <h3>Inventory</h3>
                <ul>{inventory.map(this._renderItem.bind(this))}</ul>

                <h3>Poison</h3>
                <div>{poisons.map(this._renderPoison.bind(this))}</div>

                <h3>Abilities</h3>
                <ul>
                    <li>Charisma: {abilities.charisma}</li>
                    <li>Combat: {abilities.combat}</li>
                    <li>Magic: {abilities.magic}</li>
                    <li>Sanctity: {abilities.sanctity}</li>
                    <li>Scouting: {abilities.scouting}</li>
                    <li>Thievery: {abilities.thievery}</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({player}) => {
    const {abilities, codewords, inventory, poisons, shards, stamina} = player
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
        inventory,
        poisons,
        shards,
        stamina,
        abilities,
    }
}

export default connect(mapStateToProps)(Player)