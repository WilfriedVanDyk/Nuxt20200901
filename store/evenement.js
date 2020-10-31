/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
export const state = () => ({
    evenementToPostFireBase: {},
    evenementToPostUiTdb: {},
    typeId: '' // mag verwijdert worden als we met de volledige evenementToPostUiTdb werken (zie ook in updateEvenementType const mag weg)
})
export const getters = {}
export const mutations = {
    updateEvenementTitle(state, title) {
        state.evenementToPostFireBase.evenement = title
        state.evenementToPostUiTdb.name = { nl: title }
    },
    updateEvenementBeschrijving(state, beschrijving) {
        state.evenementToPostFireBase.beschrijving = beschrijving
        state.evenementToPostUiTdb.description = { nl: beschrijving }
    },
    updateEvenementType: (state, getters, rootState, rootGetters, type) => {
        console.log('in updateEvenementType in store.evenement:')
        state.evenementToPostFireBase.type = type
        //  hoe roep ik findTypeId(type) op uit typeAanbod module  ?????????????
        // const typeId = rootGetters['typeAanbod/findTypeId'](type) // geeft error: rootGetters is undefined...
        // const typeId = getters.findTypeId(type) // geeft zelfde error
        // console.log('tyeId in store.evenement mutation updateEvenementType is: ', typeId)
        // state.evenementToPostUiTdb.terms.push({ typeId })
    }
}
export const actions = {}

// const evenement = {
//     evenement: this.evenement,
//     type: this.type,
//     organisator: this.organisator,
//     locatie: this.locatie,
//     datum: this.datum,
//     startUur: this.startUur,
//     eindUur: this.eindUur,
//     status: this.status,
//     beschrijving: this.beschrijving,
//     idUiTdatabank: ''
// }

// evenementToPost: {
//     mainLanguage: 'nl',
//         name: {
//         nl: ''
//     },
//     calendarType: 'single',
//         startDate: '',
//             endDate: '',
//                 terms: [],
//                     location: {
//         '@id': ''
//     },
//     description: {
//         nl: ''
//     }
// }
