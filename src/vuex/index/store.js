import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
console.log('actions')
console.log(actions)

Vue.use(Vuex)

const state = {
    datePointer: {
        value: '',
        format: ''
    },
    days: [],
    themes: [],
    name: 'wx'
}

let test = 0

const mutations = {
    ['SET_ARTICLES'] (state, date, arr) {
        state.days.push({
            date: date,
            articles: arr
        })
    },
    ['SET_DATE_POINTER'] (state, value) {
        state.datePointer = value
    },
    ['SET_THEMES'] (state, arr) {
        state.themes = arr
    },
    ['TEST'] (state, name) {
        state.name = test++
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})
