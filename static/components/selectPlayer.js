import React from 'react'
import {connect} from 'react-redux'

import {newGame} from '../actions'

class _SelectPlayer extends React.Component {
    render() {
        const {game} = this.props
        const adventurers = game.getAdventurers()
        return <div>Select a player: {adventurers.map(this._renderAdventurer.bind(this))}</div>
    }

    _renderAdventurer(adventurer, index) {
        const {abilities, profession} = adventurer

        const attribs = [
            {name: 'Charisma', value: abilities.charisma},
            {name: 'Combat', value: abilities.combat},
            {name: 'Magic', value: abilities.magic},
            {name: 'Sanctity', value: abilities.sanctity},
            {name: 'Scouting', value: abilities.scouting},
            {name: 'Thievery', value: abilities.thievery},
        ]

        return (
            <div key={index}>
                <h4><a href='javascript:void(0)'
                       onClick={() => this.props.onClick(adventurer)}>
                       {adventurer.profession}
                </a></h4>

                <table>
                    <tbody>
                        {attribs.map((attrib, index) => (
                            <tr key={index}>
                                <th>{attrib.name}</th>
                                <td>{attrib.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onClick: function (adventurer) {
            dispatch(newGame(adventurer))
        }
    }
}

export const SelectPlayer = connect(null, mapDispatchToProps)(_SelectPlayer)
