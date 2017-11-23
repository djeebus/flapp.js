import books from 'json-loader!../books.json';
import { gainStamina, loseShards } from './actions';

export class Game {
    constructor(store) {
        this.store = store

        this.onSuccess = null
        this.onFailure = null
    }

    registerSuccess(onSuccess) {
        console.log('storing onSuccess')
        this.onSuccess = onSuccess
    }

    registerFailure(onFailure) {
        console.log('storing onFailure')
        this.onFailure = onFailure
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
        return Math.floor(Math.random() * 6) + 1;
    }

    reset(state) {
        this.onSuccess = null
        this.onFailure = null
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
}