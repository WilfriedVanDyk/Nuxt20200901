/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import axios from 'axios'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'

export const state = () => ({
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
    venueNaam: '',
    type: ''
})
export const getters = {
    getEvenementToPut(state) {
        return state.evenementToPut
    },
    getVenueNaam(state) {
        return state.venueNaam
    }
}
export const mutations = {
    addVenue(state, venueId) {
        state.evenementToPut.location['@id'] = venueId
    },
    addName(state, evenement) {
        state.evenementToPut.name.nl = evenement.evenement
    },
    addStartDate(state, evenement) {
        const startDateTime = `${evenement.datum}T${evenement.startUur}:00+01:00`
        state.evenementToPut.startDate = startDateTime
    },
    addEndDate(state, evenement) {
        const eindDateTime = `${evenement.datum}T${evenement.eindUur}:00+01:00`
        state.evenementToPut.endDate = eindDateTime
    },
    addDescription(state, evenement) {
        state.evenementToPut.description.nl = evenement.beschrijving
    },
    addVenueName(state, locatieNaam) {
        state.venueNaam = locatieNaam
    },
    addType(state, id) {
        state.evenementToPut.terms.length = 0
        state.evenementToPut.terms.push({ id })
    }
}
export const actions = {
    findVenueId(context, venue) {
        context.commit('addVenueName', venue)
        if (venue) {
            axios
                .get(
                    `https://search-test.uitdatabank.be/places/?embed=true&q=name.nl:("${venue}")&apiKey=${APIKEYWilfried}&addressCountry=BE&postalCode=9880`
                )
                .then((res) => {
                    const json = res.data.member[0]
                    context.commit('addVenue', json['@id'])
                })
                .catch((err) => {
                    console.log('error in evenementToStore findVenueId: ', err)
                })
        }
    }
}
