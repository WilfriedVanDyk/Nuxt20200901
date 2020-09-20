/* eslint-disable no-console */
/* eslint-disable indent */
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from '~/plugins/fb'
// import firebase from '~/plugins/fb'
// const db = firebase.firestore()

export const state = () => ({ evenementen: [] })
export const mutations = { ...vuexfireMutations }
export const actions = {
    // eslint-disable-next-line space-before-function-paren
    // nuxtServerInit(vuexContext, context) {
    //     // of ({ commit }, { req })
    //     if (!process.client) {
    //         // eslint-disable-next-line no-console
    //         console.log(context.req.session)
    //     }
    // },
    bindEvenementen: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('evenementen', db.collection('evenementen'))
    }),

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
        const evenementNoId = { ...evenement }
        // return the promise so we can await this action
        return db.collection('evenementen')
            .doc(id)
            .update(evenementNoId)
            // .then(() => {
            //     console.log('in de put event')
            //     // this.$refs.form.reset();
            // })
            .catch((error) => {
                console.log('Error getting document in index.store put event:', error)
            })
    }),

    // posting an event
    postEvent: firestoreAction((context, evenement) => {
        // return the promise so we can await the write
        return db.collection('evenementen').add(evenement)
            .then(() => {
                console.log('in de post event')
            })
            .catch((error) => {
                console.log('Error getting document in index.store post event:', error)
            })
    })

}
