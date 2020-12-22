/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from '~/plugins/fb'

export const state = () => ({
    evenementen: []
})
export const mutations = {
    ...vuexfireMutations
}
export const actions = {
    //  works only when the mode is universal in nuxt.config.js
    async nuxtServerInit({ dispatch }) {
        if (!process.client) { await dispatch('bindEvenementen') }
    },

    // get all evenementen from fb and inserts the objects into state.evenementen array
    bindEvenementen: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('evenementen', db.collection('evenementen'))
            .then(res => res)
    }),

    // delete an evenement
    deleteEvent: firestoreAction((context, id) => {
        db.collection('evenementen')
            .doc(id)
            .delete()
    }),

    // updating an event
    putEvent: firestoreAction(({ context }, evenement) => {
        const { id, ...evenementNoId } = evenement
        return db.collection('evenementen')
            .doc(id)
            .update(evenementNoId)
    }),

    // posting an event
    postEvent: firestoreAction((context, evenement) => {
        // return the promise so we can await the write
        return db.collection('evenementen').add(evenement)
    })
}
