import books from 'json-loader!../books.json';
import {GO_TO_SECTION, gainStamina, loseShards, addTick } from './actions';

export class Game {
    constructor(store) {
        this.store = store
        this.reset()
    }

    getSection() {
        let state = this.store.getState()
        let bookId = state.book
        let sectionId = state.section

        let xml = books['book' + bookId][sectionId + '.xml']
        if (!xml) {
            throw `cannot find ${bookId}:${sectionId} `;
        }

        let parser = new DOMParser();
        let doc = parser.parseFromString(xml, 'text/xml');
        console.log('section', doc)

        let section = doc.documentElement

        return section
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
        this.onSuccess && this.onSuccess()
    }

    _failure() {
        console.log('onFailure')
        this.onFailure && this.onFailure()
    }

    performAbilityRoll(ability, level) {
        let state = this.store.getState()
        let currentLevel = state.abilities[ability];

        let result = this.roll() + this.roll()
        console.log(`${result} > ${level}`)

        if (result > level) {
            this._success()
        } else {
            this._failure()
        }
    }

    performRandomRoll(count) {
        count = parseInt(count)
        let result = 0;
        for (let x = 0; x < count; x++) {
            result += this.roll()
        }

        this.outcomes.execute(result)
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

    roll() {
        const result = Math.floor(Math.random() * 6) + 1;
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