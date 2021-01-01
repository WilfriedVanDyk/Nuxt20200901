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
    venue: {}
})
export const getters = {
    getChangedVenue(state) {
        return state.venue
    }
}
export const mutations = {
    eventsToNull(state) {
        state.evenementputToFireBase = {}
        state.evenementToPut = {
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
        state.venue = {}
    },
    evenementToStore(state, event) {
        state.evenementputToFireBase = event

        state.evenementToPut.description.nl = event.beschrijving
        state.evenementToPut.name.nl = event.evenement

        let startDateTime = new Date(`${event.datum} ${event.startUur}`).toString()
        if (startDateTime.includes('Standard')) {
            startDateTime = `${event.datum}T${event.startUur}:00+01:00`
        } else { startDateTime = `${event.datum}T${event.startUur}:00+02:00` }
        state.evenementToPut.startDate = startDateTime

        let endDateTime = new Date(`${event.datum} ${event.eindUur}`).toString()
        if (endDateTime.includes('Standard')) {
            endDateTime = `${event.datum}T${event.eindUur}:00+01:00`
        } else { endDateTime = `${event.datum}T${event.eindUur}:00+02:00` }
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
    }
}
export const actions = {
    putEventToAlldb(context) {
        const eventToFb = context.state.evenementputToFireBase
        const eventToUiTdb = context.state.evenementToPut
        eventToUiTdb.id = eventToFb.idUiTdatabank

        return new Promise((resolve, reject) => {
            context.dispatch('uiTdatabank/putEventUiTdb', eventToUiTdb, { root: true })
                .then(() => {
                    context.dispatch('putEvent', eventToFb, { root: true })
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
                .finally(
                    context.commit('eventsToNull')
                )
        })
    }
}
