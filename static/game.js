import _ from 'lodash'
import books from 'json-loader!../books.json';
import {GO_TO_SECTION, gainStamina, loseShards, addTick } from './actions';

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

        const players = {}

        for (let x = 0; x < doc.children.length; x++) {
            const node = doc.children[x]
            if (node.localName == 'abilities') {
                const statNames = node.children[0].textContent
                    .split(' ')
                    .map(s => s.toLowerCase())
                const professions = [...node.children].slice(1)
                professions.forEach(p => {
                    const attribs = p.attributes
                    const profession = attribs.getNamedItem('name').value
                    players[profession] = {
                        'abilities': {},
                        'profession': profession,
                    }
                    const abilities = players[profession]['abilities']
                    const stats = p.textContent.split(' ').map(s => parseInt(s))
                    for (let y = 0; y < stats.length; y++) {
                        abilities[statNames[y]] = stats[y]
                    }
                })
            }
        }

        return _.sortBy(Object.values(players), p => p.name)
    }

    getSection() {
        const {book, section} = this.store.getState()
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
        return state.rank
    }

    getTicks() {
        let state = this.store.getState()

        let bookId = parseInt(state.book)
        let sectionId = parseInt(state.section)

        let bookTicks = state.ticks[bookId] || {}
        return bookTicks[sectionId] || 0
    }

    registerFailure(onFailure) {
        console.log('storing onFailure')
        this.onFailure = onFailure
    }

    registerSuccess(onSuccess) {
        console.log('storing onSuccess')
        this.onSuccess = onSuccess
    }

    registerOutcomes(outcomes) {
        this.outcomes = outcomes
    }

    _success() {
        console.log('onSuccess')
        this.onSuccess && this.onSuccess.execute()
    }

    _failure() {
        console.log('onFailure')
        this.onFailure && this.onFailure.execute()
    }

    performAbilityRoll(ability, level) {
        let state = this.store.getState()
        let currentLevel = state.abilities[ability];

        let result = this.roll(2)
        console.log(`${result} > ${level}`)

        if (result > level) {
            this._success()
        } else {
            this._failure()
        }
    }

    performRandomRoll(count) {
        const result = this.roll(count)
        this.outcomes.execute(result)
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
        let state = store.getState()
        let playerShards = state.shards
        let playerStamina = state.stamina
        let playerMaxStamina = state.maxStamina

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

    setVar(name, value) {
        this.vars[name] = value
    }

    goToSection(book, section) {
        const store = this.store
        const state = store.getState()

        store.dispatch({
            type: GO_TO_SECTION,
            book: parseInt(book || state.book),
            section: parseInt(section || 1),
        })
    }
}