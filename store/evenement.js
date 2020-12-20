/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
// import axios from 'axios'

export const state = () => ({
    evenementToPostFireBase: {},
    evenementToPostUiTdb: {
        mainLanguage: 'nl',
        name: {
            nl: ''
        },
        calendarType: 'single',
        startDate: '',
        endDate: '',
        terms: [],
        location: {
            '@id': ''
        },
        description: {
            nl: ''
        }
    }
})
export const getters = {}
export const mutations = {
    commitEventsToNull(state) {
        state.evenementToPostFireBase = {}
        state.evenementToPostUiTdb = {
            mainLanguage: 'nl',
            name: {
                nl: ''
            },
            calendarType: 'single',
            startDate: '',
            endDate: '',
            terms: [],
            location: {
                '@id': ''
            },
            description: {
                nl: ''
            }
        }
    },
    commitEventToStore(state, event) {
        state.evenementToPostFireBase.beschrijving = event.beschrijving
        state.evenementToPostUiTdb.description = { nl: event.beschrijving }
        state.evenementToPostFireBase.datum = event.datum
        state.evenementToPostFireBase.evenement = event.evenement
        state.evenementToPostUiTdb.name = { nl: event.evenement }
        state.evenementToPostFireBase.eindUur = event.eindUur
        state.evenementToPostFireBase.organisator = event.organisator
        state.evenementToPostFireBase.startUur = event.startUur
        state.evenementToPostFireBase.status = event.status
        state.evenementToPostFireBase.type = event.type
    },
    // to post to uitdb extra info
    addDateToEvenementToPostUiTdb(state) {
        const startDateTime = `${state.evenementToPostFireBase.datum}T${state.evenementToPostFireBase.startUur}:00+01:00`
        state.evenementToPostUiTdb.startDate = startDateTime
        const endDateTime = `${state.evenementToPostFireBase.datum}T${state.evenementToPostFireBase.eindUur}:00+01:00`
        state.evenementToPostUiTdb.endDate = endDateTime
    },
    addTypeToEvenementToPostUiTdb(state, id) {
        state.evenementToPostUiTdb.terms.length = 0
        state.evenementToPostUiTdb.terms.push({ id })
    },
    // to venuPicker
    updateEvenementLocatie: (state, locatie) => {
        state.evenementToPostFireBase.locatie = locatie
        state.evenementToPostUiTdb.location['@id'] = locatie.id
    }
}
export const actions = {
    EventToStore(context, event) {
        context.commit('commitEventToStore', event)
        context.dispatch('EventToUiTdbStore')
    },
    EventToUiTdbStore(context) {
        context.commit('addDateToEvenementToPostUiTdb')
        context.commit('addTypeToEvenementToPostUiTdb', (context.rootGetters['uiTdatabank/findTypeId'](context.state.evenementToPostFireBase.type)))
    },
    PostEvent(context) {
        const eventToUiTdb = context.state.evenementToPostUiTdb
        const eventToFb = context.state.evenementToPostFireBase
        return new Promise((resolve, reject) => {
            context.dispatch('uiTdatabank/postEventUiTdb', eventToUiTdb, { root: true })
                .then((response) => {
                    eventToFb.idUiTdatabank = response
                })
                .then(() => {
                    context.dispatch('postEvent', eventToFb, { root: true })
                    resolve()
                }
                ).catch((err) => {
                    reject(err)
                })
        })
    }
}
