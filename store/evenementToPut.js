/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

export const state = () => ({
    evenementputToFireBase: {},
    evenementToPut: {
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
    },
    venue: null
})
export const getters = {
    getChangedVenue(state) {
        return state.venue
    }
}
export const mutations = {
    evenementToStore(state, event) {
        state.evenementputToFireBase = event

        state.evenementToPut.description.nl = event.beschrijving
        state.evenementToPut.name.nl = event.evenement

        const startDateTime = `${event.datum}T${event.startUur}:00+01:00`
        state.evenementToPut.startDate = startDateTime
        const endDateTime = `${event.datum}T${event.eindUur}:00+01:00`
        state.evenementToPut.endDate = endDateTime

        state.evenementToPut.location['@id'] = event.locatie.id
    },
    addType(state, id) {
        state.evenementToPut.terms.length = 0
        state.evenementToPut.terms.push({ id })
    },
    addChangedVenue(state, venue) {
        state.venue = venue
        state.evenementToPut.location['@id'] = venue.id
    },
    venueToNull(state) {
        state.venue = null
    }
}
export const actions = {
    putEventToAlldb(context) {
        const eventToFb = context.state.evenementputToFireBase
        const eventToUiTdb = context.state.evenementToPut
        eventToUiTdb.id = eventToFb.idUiTdatabank

        return new Promise((resolve, reject) => {
            context.dispatch('data/putEventUiTdb', eventToUiTdb, { root: true })
                .then(() => {
                    context.dispatch('putEvent', eventToFb, { root: true })
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
                .finally(
                    context.commit('venueToNull')
                )
        })
    }
}
