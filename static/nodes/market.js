import { connect } from 'react-redux';
import React from 'react';

import { addProps } from '../util'

class Market extends React.Component {
    constructor(props) {
        super(props)
    }

    register(child) {}

    render() {
        const { children } = this.props
        const childrenWithProps = addProps(children, {group: this})

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
                                <td>{renderBuy(child)}</td>
                                <td>{renderSell(child)}</td>
                            </tr>
                        )
                    }
                })}</tbody>
            </table>
        )
    }
}

function renderBuy(child) {
    const {buy} = child.props
    if (!buy) {
        return
    }

    return buy + " Shards"
}
function renderSell(child) {
    const {sell} = child.props
    if (!sell) {
        return
    }

    return sell + " Shards"
}

export default Market;