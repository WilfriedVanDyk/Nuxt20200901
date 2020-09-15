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
    })
}
