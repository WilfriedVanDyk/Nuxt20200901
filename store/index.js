/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
/* eslint-disable indent */
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from '~/plugins/fb'
// import firebase from '~/plugins/fb'
// const db = firebase.firestore()

export const state = () => ({
    evenementen: []
})
export const mutations = { ...vuexfireMutations }
export const actions = {

    async nuxtServerInit({ dispatch }) {
        if (!process.client) { await dispatch('bindEvenementen') }
        // kan beter... zie later...
    },

    // get all evenementen from fb and inserts the objects into evenementen state (array)
    bindEvenementen: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('evenementen', db.collection('evenementen')).then(res => console.log('respons in bindEvenementen van Fb in index.store: 200')).catch(error => console.log('error in bindEvenementen van Fb in index.store: ', error))
    }),

    // get one evenement
    // getEvenement: firestoreAction((context, id) => {
    // }),

    // delete an evenement (works)
    deleteEvent: firestoreAction((context, id) => {
        // console.log('id', id)
        db.collection('evenementen')
            .doc(id)
            .delete()
            .then(() => {
                // console.log('in de delete event')
                // this.$refs.form.reset();
            })
            .catch((error) => {
                console.log('Error getting document in index.store delete event:', error)
            })
    }),

    // updating an event
    putEvent: firestoreAction(({ state }, evenement) => {
        // we first create a copy that excludes `id`
        // this exclusion is automatic because `id` is non-enumerable
        const id = evenement.id
        console.log('firestore putEvent: id firebase event', id)
        console.log('firestore putEvent: idUiTdb', evenement.idUiTdatabank)
        const evenementNoId = { ...evenement }
        // return the promise so we can await this action
        return db.collection('evenementen')
            .doc(id)
            .update(evenementNoId)
            .then((res) => {
                console.log('in de put event met als respons: ', res)
                // this.$refs.form.reset();
            })
            .catch((error) => {
                console.log('Error getting document in index.store put event:', error)
            })
    }),

    // posting an event
    postEvent: firestoreAction((context, evenement) => {
        // console.log('posteventIdUitdb is: ', evenement.idUiTdatabank)
        // console.log(evenement)
        // return the promise so we can await the write
        return db.collection('evenementen').add(evenement)
            .then((res) => {
                console.log('in de post event fb met respons: ', res)
            })
            .catch((error) => {
                console.log('Error getting document in index.store post event:', error)
            })
    })

}
