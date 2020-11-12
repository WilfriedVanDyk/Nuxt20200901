/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import axios from 'axios'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
// const JWT = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

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
    IdUiTdbEvenement: '', // dit wordt op dit moment niet gebruikt !!!!
    venueNaam: '',
    type: '' // hier de naam van het type plaatsen, waarna de id wordt toegevoegd door een mutatie te maken die via de naam (uit de typeaanbod.data.typeAanbod) de id haalt en opslaat in het EVenementToPut
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
        console.log('evenenemtToPost in mutation na addVenue :', state.evenementToPut)
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
        console.log('typid in evenementToPut in addType mutation:', id)
        // console.log('state.type in evenementToPut is: ', state.type)
        state.evenementToPut.terms.length = 0
        state.evenementToPut.terms.push({ id })
    }
}
export const actions = {
    findVenueId(context, venue) {
        // console.log('venue uit de findVenueId store action: ', venue)
        context.commit('addVenueName', venue)
        if (venue) {
            axios
                .get(
                    `https://search-test.uitdatabank.be/places/?embed=true&q=name.nl:("${venue}")&apiKey=${APIKEYWilfried}&addressCountry=BE&postalCode=9880`
                )
                .then((res) => {
                    const json = res.data.member[0]
                    console.log('dit is de id van de locatie: ', json['@id'])
                    context.commit('addVenue', json['@id'])
                })
                .catch((err) => {
                    console.log('error in evenementToStore findVenueId: ', err)
                })
        }
    }
}
