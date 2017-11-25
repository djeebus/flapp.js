import React from 'react'


export class SelectPlayer extends React.Component {
    render() {
        const {game} = this.props

        const adventurers = game.getAdventurers()

        return <div>Select a player: {adventurers.map(this._renderAdventurer.bind(this))}</div>
    }

    _renderAdventurer(adventurer, index) {
        const {abilities, profession} = adventurer
        return (
            <dl key={index}>
                <dt>Profession:</dt><dd>{adventurer.profession}</dd>

                <dt>Charisma</dt><dd>{abilities.charisma}</dd>
                <dt>Combat</dt><dd>{abilities.combat}</dd>
                <dt>Magic</dt><dd>{abilities.magic}</dd>
                <dt>Sanctity</dt><dd>{abilities.sanctity}</dd>
                <dt>Scouting</dt><dd>{abilities.scouting}</dd>
                <dt>Thievery</dt><dd>{abilities.thievery}</dd>
            </dl>
        )
    }
}