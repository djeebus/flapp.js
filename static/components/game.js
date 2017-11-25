import React from 'react'

import Player from './player'
import {SelectPlayer} from './selectPlayer'
import View from './view'


export function Game({game, player}) {
    if (player == null) {
        return <SelectPlayer game={game} />
    }

    return <View game={game} />
}
