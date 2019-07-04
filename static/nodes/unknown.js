import React from 'react';

export default function (tag) {
    return ({children}) => <span>[[ {tag} ]] {children}</span>
}