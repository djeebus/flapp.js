import { connect } from 'react-redux';
import React from 'react';

import { addProps } from '../util'

class Market extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { children, game } = this.props
        const childrenWithProps = addProps(children, {game, group: this})

        return (
            <table className="market">
                <caption>Market</caption>

                <tbody>{childrenWithProps.map((child, index) => {
                    if (child.props.type) {
                        return (
                            <tr key={index}>
                                <th>{child}</th>
                                <th>To buy</th>
                                <th>To sell</th>
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={index}>
                                <th>{child}</th>
                                <td>{this.renderBuy(child)}</td>
                                <td>{this.renderSell(child)}</td>
                            </tr>
                        )
                    }
                })}</tbody>
            </table>
        )
    }

    renderBuy(child) {
        const {buy} = child.props
        if (!buy) {
            return
        }

        return <button onClick={() => this.buy(child)}>{buy} Shards</button>
    }

    buy(item) {alert('buy a thing')}

    renderSell(child) {
        const {sell} = child.props
        if (!sell) {
            return
        }

        return <button onClick={() => this.sell(child)}>{sell} Shards</button>
    }

    sell(item) {alert('sell a thing')}
}

export default Market;