import React from 'react'
import _ from 'lodash'
import books from 'json-loader!../books.json';
import {GO_TO_SECTION, gainStamina, loseShards, addTick} from './actions';

function getDoc(bookId, file) {
    const book = 'book' + bookId
    let xml = books[book][file]
    if (!xml) {
        throw `cannot find ${book}:${file} `;
    }

    let parser = new DOMParser();
    let doc = parser.parseFromString(xml, 'text/xml');
    console.log(`${book}/${file}`, doc)
    return doc
}

export class Game {
    constructor(store) {
        this.store = store
        this.reset()
    }

    getAdventurers() {
        const doc = getDoc(1, 'Adventurers.xml').documentElement

        const professions = {}
        const common = {
            'inventory': [],
        }

        for (let x = 0; x < doc.children.length; x++) {
            const node = doc.children[x]
            const attrs = node.attributes

            function getAmountAttr() {
                return parseInt(attrs.getNamedItem('amount').value)
            }

            switch (node.localName) {
                case 'abilities':
                    const statNames = node.children[0].textContent
                        .split(' ')
                        .map(s => s.toLowerCase())
                    const profNodes = [...node.children].slice(1)
                    profNodes.forEach(p => {
                        const attribs = p.attributes
                        const profession = attribs.getNamedItem('name').value
                        professions[profession] = {
                            'abilities': {},
                            'inventory': [],
                            'profession': profession,
                        }
                        const abilities = professions[profession]['abilities']
                        const stats = p.textContent.split(' ').map(s => parseInt(s))
                        for (let y = 0; y < stats.length; y++) {
                            abilities[statNames[y]] = stats[y]
                        }
                    })
                    break

                case 'stamina':
                    common.stamina = getAmountAttr()
                    break

                case 'rank':
                    common.rank = getAmountAttr()
                    break

                case 'gold':
                    common.gold = getAmountAttr()
                    break

                case 'items':
                    for (let y = 0; y < node.children.length; y++) {
                        let item = node.children[y]
                        const [profession, parsed] = this._parseItem(item)
                        if (profession) {
                            professions[profession].inventory.push(parsed)
                        } else {
                            common.inventory.push(parsed)
                        }
                    }
                    break
            }
        }

        const profs = _.sortBy(Object.values(professions), p => p.name)
        const full = profs.map(p => {
            return {
                ...p,
                stamina: common.stamina,
                rank: common.rank,
                shards: common.gold,
                inventory: [
                    ...p.inventory,
                    ...common.inventory,
                ],
            }
        })

        return full
    }

    _parseItem(node) {
        const getAttr = name => {
            const attr = node.attributes.getNamedItem(name)
            if (attr) {
                return attr.value
            }
        }
        const profession = getAttr('profession')
        const parsed = {
            'type': node.localName,
            'name': getAttr('name'),
        }

        const bonus = getAttr('bonus')
        if (bonus) {
            parsed['bonus'] = parseInt(bonus)
        }

        return [profession, parsed]
    }

    getSection() {
        const {player} = this.store.getState()
        const {book, section} = player
        const doc = getDoc(book, section + '.xml')

        return doc.documentElement
    }

    getBoxes() {
        const doc = this.getSection()
        const attrs = doc.attributes

        let item = attrs.getNamedItem('boxes')
        if (item == null) {
            return null
        }

        return parseInt(item.value);
    }

    getRank() {
        const state = this.store.getState()
        return state.player.rank
    }

    getTicks() {
        const {player} = this.store.getState()

        const book = parseInt(player.book)
        const section = parseInt(player.section)

        const bookTicks = player.ticks[book] || {}
        return bookTicks[section] || 0
    }

    performAbilityRoll(ability, level) {
        let {player} = this.store.getState()
        let currentLevel = player.abilities[ability];

        let result = this.roll(2)
        console.log(`${result} > ${level}`)

        if (result > level) {
            alert(`You rolled a ${result} and succeeded!`)
        } else {
            alert(`You rolled a ${result} and failed.`)
        }
    }

    performRandomRoll(count) {
        const result = this.roll(count)

        alert(`You rolled a ${result}`)
    }

    performRankCheck(count, add) {
        const result = this.roll(count) + add
        const rank = this.getRank()

        if (result <= rank) {
            this.onFailure.execute()
        } else {
            this.onSuccess.execute()
        }
    }

    rest(shards, stamina) {
        shards = parseInt(shards)
        stamina = parseInt(stamina)

        let store = this.store
        let {player} = store.getState()
        let playerShards = player.shards
        let playerStamina = player.stamina
        let playerMaxStamina = player.maxStamina

        if (playerShards < shards) {
            return false;
        }

        if (playerMaxStamina <= playerStamina) {
            return false;
        }

        store.dispatch(loseShards(shards))
        store.dispatch(gainStamina(stamina))

        return true;
    }

    roll(count) {
        let result = 0

        for (var x = 0; x < count; x++) {
            result += Math.floor(Math.random() * 6) + 1
        }

        console.log(`roll = ${result}`)
        return result
    }

    reset() {
        this.onSuccess = null
        this.onFailure = null
        this.outcomes = null

        this.vars = {}
    }

    getVar(name) {
        const value = this.vars[name]
        console.log(name, ' == ', value)
        return value
    }

    setVar(name, value) {
        console.log('setting', name, 'to', value)
        this.vars[name] = value
    }

    goToSection(book, section) {
        const store = this.store
        const {player} = store.getState()

        store.dispatch({
            type: GO_TO_SECTION,
            book: parseInt(book || player.book),
            section: parseInt(section || 1),
        })
    }
}
