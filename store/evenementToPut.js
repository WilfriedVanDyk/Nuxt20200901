/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import axios from 'axios'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
const JWT = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

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
    evenementputToFireBase: null,
    venue: null,
    type: ''
})
export const getters = {
    // getEvenementToPut(state) {
    //     return state.evenementToPut
    // },
    getVenue(state) {
        return state.venue
    }
}
export const mutations = {
    evenementfbToStore(state, evenement) {
        state.evenementputToFireBase = evenement
    },
    addVenue(state, venue) {
        state.venue = venue
        state.evenementToPut.location['@id'] = venue.id
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
    addType(state, id) {
        state.evenementToPut.terms.length = 0
        state.evenementToPut.terms.push({ id })
    }
}
export const actions = {
    putEventToAlldb(context, id) {
        axios
            .put(
                `https://io-test.uitdatabank.be/imports/events/${id}`, context.state.evenementToPut, {
                headers: {
                    'x-api-key': APIKEYWilfried,
                    Authorization: `${JWT}`
                }
            }
            )
            .then(() => {
                context.dispatch('putEvent', context.state.evenementputToFireBase, { root: true })
            })
            .catch((err) => {
                console.log('error put offer in api.index om update te doen: ', err)
            })
    }
}
