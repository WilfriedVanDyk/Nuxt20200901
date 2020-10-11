/* eslint-disable no-console */
/* eslint-disable indent */
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import db from '~/plugins/fb'
// import firebase from '~/plugins/fb'
// const db = firebase.firestore()

export const state = () => ({
    evenementen: [],
    typbeAanbod: [
        { label: 'Lezing of congres', scopeNote: 'Thematische voordracht of interview voor publiek.', id: '0.3.2.0.0' },
        { label: 'Opendeurdag', scopeNote: 'Dagen waarop het publiek vrij een monument, een bedrijf / organisatie, etc.mag bezichtigen.Het openstellen van een bepaalde ruimte of een bedrijf kan specifiek gericht zijn op het verbreden van de kennis van het publiek over die organisatie(Def.Van Dale).Voorbeelden: openmonumentendag, erfgoedweekend, open bedrijvendag.', id: '12.0.0.0' },
        { label: 'Beurs', scopeNote: 'Gelegenheden waar producten / diensten binnen een bepaald vakgebied, of die behoren tot een bepaalde tak van de industrie, aan het publiek worden voorgesteld, om de kennis hierover te verbreden.De mogelijkheid bestaat om deze producten / diensten te kopen. Omvat ook: vakbeurzen, cultuurbeurzen, showcases, etc.', id: '0.6.0.0.0' },
        { label: 'Tentoonstelling', scopeNote: 'Tijdens een tentoonstelling krijgen de bezoekers de mogelijkheid om voorwerpen of objecten te bezichtigen en te beleven.', id: '0.0.0.0.0' },
        { label: 'Begeleide rondleiding', scopeNote: 'Vb. (Excursies): groepsbezoek, reis, rondleiding, toer, boottocht of rondvaart, rondvlucht of vlucht', id: '0.7.0.0.0' },
        { label: 'Cursus of workshop', scopeNote: 'Een reeks lessen, een les, of een werkgroep die gericht is op het overdragen van specifieke kennis of het aanleren van bepaalde vaardigheden die behoren tot een bepaald vakgebied of een bepaalde discipline.', id: '0.3.1.0.0' },
        { label: 'Eten en drinken', scopeNote: 'Omvat de horeca, eet- en drankgelegenheden.', id: '1.50.0.0.0' }
    ],
    statusArray: [
        'DRAFT',
        'READY_FOR_VALIDATION',
        'APPROVED',
        'REJECTED',
        'DELETED'
    ]
})
export const mutations = { ...vuexfireMutations }
export const actions = {

    // get all evenementen from fb and inserts the objects into evenementen state (array)
    bindEvenementen: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('evenementen', db.collection('evenementen'))
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
        console.log(id)
        console.log(evenement.idUiTdatabank)
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
        console.log('posteventIdUitdb is: ')
        console.log(evenement)
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
