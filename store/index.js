/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
/* eslint-disable indent */
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from '~/plugins/fb'

export const state = () => ({
    evenementen: []
})
export const mutations = { ...vuexfireMutations }
export const actions = {

    async nuxtServerInit({ dispatch }) {
        if (!process.client) { await dispatch('bindEvenementen') }
    },

    // get all evenementen from fb and inserts the objects into state.evenementen array
    bindEvenementen: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('evenementen', db.collection('evenementen')).then(res => res).catch(error => console.log('error in bindEvenementen van Fb in index.store: ', error))
    }),

    // delete an evenement
    deleteEvent: firestoreAction((context, id) => {
        db.collection('evenementen')
            .doc(id)
            .delete()
            .catch((error) => {
                this.$nuxt.error({ statusCode: 400, message: error.message })
            })
    }),

    // updating an event
    putEvent: firestoreAction(({ state }, evenement) => {
        // we first create a copy that excludes `id`
        // this exclusion is automatic because `id` is non-enumerable
        const id = evenement.id
        const evenementNoId = { ...evenement }
        // return the promise so we can await this action
        return db.collection('evenementen')
            .doc(id)
            .update(evenementNoId)
            .catch((error) => {
                console.log('Error getting document in index.store put event:', error)
            })
    }),

    // posting an event
    postEvent: firestoreAction((context, evenement) => {
        // return the promise so we can await the write
        return db.collection('evenementen').add(evenement)
            .catch((error) => {
                console.log('Error getting document in index.store post event:', error)
            })
    })

}
