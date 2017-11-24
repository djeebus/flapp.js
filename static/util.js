import React from 'react'

export function addProps(children, props) {
    return React.Children.map(
        children,
        child => React.cloneElement(child, props),
    )
}