import React from 'react';
import {connect} from 'react-redux';
import book1 from 'json-loader!../../book1.json';

import Armour from './armour';
import Choice from './choice';
import Choices from './choices';
import Difficulty from './difficulty';
import Else from './else';
import Failure from './failure';
import Gain from './gain';
import GoTo from './goto';
import Group from './group';
import Header from './header';
import If from './if';
import Item from './item';
import Lose from './lose';
import Market from './market';
import Outcomes from './outcomes';
import Rest from './rest';
import Set from './set';
import Success from './success';
import Tick from './tick';
import Tool from './tool';
import Trade from './trade';
import Unknown from './unknown';
import Weapon from './weapon';

const
    ELEMENT_NODE = 1,
    ATTRIBUTE_NODE = 2,
    TEXT_NODE = 3;


const boolAttr = (attrs, name) => attrs.getNamedItem(name).value == 't';
const intAttr = (attrs, name) => parseInt(attrs.getNamedItem(name).value);
const textAttr = (attrs, name) => attrs.getNamedItem(name).value;

class Section extends React.Component {
    registerSuccess(onSuccess) {

    }

    *parseNodes(nodes) {
        for (let x = 0; x < nodes.length; x++) {
            let node = nodes[x];
            node = this.parseNode(node, x);
            yield node
        }
    }

    parseNode(node, index) {
        switch (node.nodeType) {
            case ELEMENT_NODE:
                return this.parseElementNode(node, index);

            case TEXT_NODE:
                return node.wholeText;

        }
    }

    parseElementNode(node, index) {
        let attrs = node.attributes;

        let props = {
            key: index,
            registerSuccess: self.registerSuccess,
            registerFailure: self.registerFailure,
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
            case 'text': return <span {...props}>{children}</span>
        }

        console.warn('Unknown tag: ', node.localName)
        return <Unknown tag={node.localName} {...props}>{children}</Unknown>
    }

    render() {
        let section = this.props.section
        let index = section - 1;

        let xml = book1[index];
        if (!xml) {
            throw "cannot find section " + section;
        }

        let parser = new DOMParser();
        let doc = parser.parseFromString(xml, 'text/xml');

        section = doc.documentElement;

        let attrs = section.attributes;
        let name = textAttr(attrs, 'name')

        return (
            <div>
                <h1>#{name ? name.value : "unknown"}</h1>
                {[...this.parseNodes(section.childNodes)]}
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => {
        return {
            section: state.section,
        };
    },
    (dispatch, ownProps) => { return {}; },
)(Section);
