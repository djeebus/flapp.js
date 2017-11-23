import React from 'react';
import {connect} from 'react-redux';

import Armour from '../nodes/armour';
import Choice from '../nodes/choice';
import Choices from '../nodes/choices';
import Difficulty from '../nodes/difficulty';
import Else from '../nodes/else';
import ElseIf from '../nodes/elseif';
import Failure from '../nodes/failure';
import Gain from '../nodes/gain';
import GoTo from '../nodes/goto';
import Group from '../nodes/group';
import Header from '../nodes/header';
import If from '../nodes/if';
import Item from '../nodes/item';
import Lose from '../nodes/lose';
import Market from '../nodes/market';
import Outcomes from '../nodes/outcomes';
import Rest from '../nodes/rest';
import Set from '../nodes/set';
import Success from '../nodes/success';
import Text from '../nodes/text';
import Tick from '../nodes/tick';
import Tool from '../nodes/tool';
import Trade from '../nodes/trade';
import Unknown from '../nodes/unknown';
import Weapon from '../nodes/weapon';

const
    ELEMENT_NODE = 1,
    ATTRIBUTE_NODE = 2,
    TEXT_NODE = 3;


const boolAttr = (attrs, name) => attrs.getNamedItem(name).value == 't';
const intAttr = (attrs, name) => parseInt(attrs.getNamedItem(name).value);
const textAttr = (attrs, name) => attrs.getNamedItem(name).value;

class View extends React.Component {
    *parseNodes(nodes) {
        for (let x = 0; x < nodes.length; x++) {
            let node = nodes[x];
            node = this.parseNode(node, x);
            if (node) {
                yield node
            }
        }
    }

    parseNode(node, index) {
        switch (node.nodeType) {
            case ELEMENT_NODE:
                return this.parseElementNode(node, index);

            case TEXT_NODE:
                let text = node.wholeText.trim()
                if (text) {
                    return node.wholeText
                }
        }
    }

    parseElementNode(node, index) {
        let attrs = node.attributes;

        let props = {
            game: this.props.game,
            key: index,
        };

        for (var x = 0; x < attrs.length; x++) {
            let attr = attrs[x];
            props[attr.name] = attr.value;
        }

        let children = this.parseNodes(node.childNodes);
        children = [...children]

        let components = {
            'armour': Armour,
            'choice': Choice,
            'choices': Choices,
            'difficulty': Difficulty,
            'else': Else,
            'elseif': ElseIf,
            'failure': Failure,
            'gain': Gain,
            'goto': GoTo,
            'group': Group,
            'header': Header,
            'if': If,
            'item': Item,
            'lose': Lose,
            'market': Market,
            'outcomes': Outcomes,
            'rest': Rest,
            'set': Set,
            'success': Success,
            'text': Text,
            'tick': Tick,
            'tool': Tool,
            'trade': Trade,
            'weapon': Weapon,
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

        console.warn('Unknown tag: ', node.localName)
        return <Unknown tag={node.localName} {...props}>{children}</Unknown>
    }

    render() {
        let section = this.props.game.getSection()
        let attrs = section.attributes;
        let name = textAttr(attrs, 'name')

        return (
            <div>
                <h1>#{name || "unknown"}</h1>
                {[...this.parseNodes(section.childNodes)]}
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => {
        return {
            book: state.book,
            section: state.section,
        };
    },
    (dispatch, ownProps) => { return {}; },
)(View);
