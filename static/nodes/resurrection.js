import React from 'react';
import { connect } from 'react-redux'

class _Resurrection extends React.Component {
    render() {
        const {children, game, section} = this.props

        let attrs
        if (section) {
            attrs = {
                href: 'javascript:void(0)',
                onClick: () => game.goToSection(section),
            }
        } else {
            attrs = {
                disabled: 'disabled',
                style: {'textDecorationLine': 'line-through'},
            }
        }

        return (
            <a {...attrs}>{children}</a>
        )
    }
}

function mapStateToProps({player}) {
    const {resurrection} = player

    return {
        section: resurrection ? resurrection.section : null,
    }
}

export default connect(mapStateToProps)(_Resurrection)
