import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Adjust from '../nodes/adjust'
import Armour from '../nodes/armour'
import Buy from '../nodes/buy'
import Choice from '../nodes/choice'
import Choices from '../nodes/choices'
import Curse from '../nodes/curse'
import Desc from '../nodes/desc'
import Difficulty from '../nodes/difficulty'
import Disease from '../nodes/disease'
import Effect from '../nodes/effect'
import Else from '../nodes/else'
import ElseIf from '../nodes/elseif'
import Failure from '../nodes/failure'
import Fight from '../nodes/fight'
import Gain from '../nodes/gain'
import GoTo from '../nodes/goto'
import Group from '../nodes/group'
import Header from '../nodes/header'
import If from '../nodes/if'
import Item from '../nodes/item'
import Items from '../nodes/items'
import Lose from '../nodes/lose'
import Market from '../nodes/market'
import Outcome from '../nodes/outcome'
import Outcomes from '../nodes/outcomes'
import Poison from '../nodes/poison'
import Random from '../nodes/random'
import RankCheck from '../nodes/rankcheck'
import Reroll from '../nodes/reroll'
import Rest from '../nodes/rest'
import Resurrection from '../nodes/resurrection'
import Sell from '../nodes/sell'
import Set from '../nodes/set'
import Sold from '../nodes/sold'
import Success from '../nodes/success'
import Text from '../nodes/text'
import Tick from '../nodes/tick'
import Tool from '../nodes/tool'
import Trade from '../nodes/trade'
import Training from '../nodes/training'
import Transfer from '../nodes/transfer'
import unknownFactory from '../nodes/unknown'
import Weapon from '../nodes/weapon'

const
    ELEMENT_NODE = 1,
    ATTRIBUTE_NODE = 2,
    TEXT_NODE = 3;


const boolAttr = (attrs, name) => attrs.getNamedItem(name).value == 't';
const intAttr = (attrs, name) => {
    let item = attrs.getNamedItem(name)
    if (item == null) {
        return null;
    }

    return parseInt(item.value);
}
const textAttr = (attrs, name) => attrs.getNamedItem(name).value;

class View extends React.Component {
    *parseNodes(nodes) {
        let prev

        for (let x = 0; x < nodes.length; x++) {
            let node = nodes[x];
            node = this.parseNode(node, x, prev);
            if (node) {
                prev = node
                yield node
            }
        }
    }

    parseNode(node, index, prev) {
        switch (node.nodeType) {
            case ELEMENT_NODE:
                return this.parseElementNode(node, index, prev);

            case TEXT_NODE:
                let text = node.nodeValue.trim()
                if (text) {
                    return <Text key={index}>{node.nodeValue}</Text>
                }
        }
    }

    parseElementNode(node, index, prev) {
        let attrs = node.attributes;

        let props = {
            game: this.props.game,
            index: index,
            key: index,
            previous: prev,
            store: this.props.store,
        };

        let children = this.parseNodes(node.childNodes);
        children = [...children]

        let components = {
            'adjust': Adjust,
            'adjustmoney': unknownFactory('adjustMoney'),
            'armour': Armour,
            'buy': Buy,
            'choice': Choice,
            'choices': Choices,
            'curse': Curse,
            'desc': Desc,
            'disease': Disease,
            'difficulty': Difficulty,
            'effect': Effect,
            'else': Else,
            'elseif': ElseIf,
            'exclude': unknownFactory('exclude'),
            'extrachoice': unknownFactory('extrachoice'),
            'failure': Failure,
            'fight': Fight,
            'fightdamage': unknownFactory('fightdamage'),
            'flee': unknownFactory('flee'),
            'gain': Gain,
            'goto': GoTo,
            'group': Group,
            'header': Header,
            'if': If,
            'image': unknownFactory('image'),
            'include': unknownFactory('include'),
            'item': Item,
            'itemcache': unknownFactory('itemcache'),
            'items': Items,
            'lose': Lose,
            'market': Market,
            'moneycache': unknownFactory('moneycache'),
            'outcome': Outcome,
            'outcomes': Outcomes,
            'poison': Poison,
            'price': unknownFactory('price'),
            'random': Random,
            'rankcheck': RankCheck,
            'reroll': Reroll,
            'return': unknownFactory('return'),
            'rest': Rest,
            'resurrection': Resurrection,
            'sell': Sell,
            'set': Set,
            'sold': Sold,
            'success': Success,
            'text': Text,
            'tick': Tick,
            'tool': Tool,
            'trade': Trade,
            'training': Training,
            'transfer': Transfer,
            'weapon': Weapon,
        }

        for (var x = 0; x < attrs.length; x++) {
            let attr = attrs[x];
            props[attr.name] = attr.value;
        }

        let Component = components[node.localName];
        if (Component) {
            return <Component {...props}>{children}</Component>
        }

        switch (node.localName) {
            case 'b': return <b {...props}>{children}</b>
            case 'i': return <i {...props}>{children}</i>
            case 'p': return <p {...props}>{children}</p>
        }

        throw 'Unknown tag: ' + node.localName
    }

    boxes(count) {
        if (!count) {
            return
        }

        let ticks = this.props.ticks
        let boxes = []
        for (let x = 0; x < count; x++) {
            let attrs = {
                key: x,
                type: 'checkbox',
                disabled: 'disabled',
            }
            if (x < ticks) {
                attrs.checked = 'checked'
            }

            boxes.push(<input {...attrs} />)
        }
        return boxes;
    }

    render() {
        this.props.noScroll || scrollTo(0, 0)

        const section = this.props.game.getSection()
        const rootDoc = section
        this.props.debug && console.log('section: ', rootDoc)
        let attrs = rootDoc.attributes
        let name = textAttr(attrs, 'name')
        let boxes = intAttr(attrs, 'boxes')

        return (
            <div>
                <h1>#{name || "unknown"}</h1>
                {this.boxes(boxes)}
                {[...this.parseNodes(rootDoc.childNodes)]}
            </div>
        );
    }

    componentDidMount() {
        this.props.noScroll || scroll(0, 0)
    }
}

View.propTypes = {
    game: PropTypes.object.isRequired,
}

function mapStateToProps({player}) {
    const {book, section, ticks} = player
    const bookTicks = ticks[book] || {}

    return {
        book,
        section,
        ticks: bookTicks[section] || 0
    };
}

export default connect(mapStateToProps)(View);
