/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import axios from 'axios'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
const JWT = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

export const state = () => ({
    evenementToPost: {
        mainLanguage: 'nl',
        name: {
            nl: ''
        },
        calendarType: 'single',
        startDate: '',
        endDate: '',
        terms: [
            {
                id: '0.50.4.0.0'
            }
        ],
        location: {
            '@id': ''
        }
    },
    IdUiTdbEvenement: '', // waar wordt dit gebruikt ?????
    venueNaam: ''
})
export const getters = {
    getEvenementToPost(state) {
        return state.evenementToPost
    },
    getVenueNaam(state) {
        return state.venueNaam
    }
}
export const mutations = {
    addVenue(state, venueId) {
        state.evenementToPost.location['@id'] = venueId
        console.log('evenenemtToPost in mutation:', state.evenementToPost)
    },
    addName(state, evenement) {
        state.evenementToPost.name.nl = evenement.evenement
    },
    addStartDate(state, evenement) {
        const startDateTime = `${evenement.datum}T${evenement.startUur}:00+01:00`
        state.evenementToPost.startDate = startDateTime
    },
    addEndDate(state, evenement) {
        const eindDateTime = `${evenement.datum}T${evenement.eindUur}:00+01:00`
        state.evenementToPost.endDate = eindDateTime
    },
    addVenueName(state, locatieNaam) {
        state.venueNaam = locatieNaam
    }
}
export const actions = {
    findVenueId(context, venue) {
        console.log('venue uit de findVenueId store action: ', venue)
        context.commit('addVenueName', venue)

        axios
            .get(
                `https://search-test.uitdatabank.be/places/?embed=true&q=name.nl:("${venue}")&apiKey=${APIKEYWilfried}&addressCountry=BE&postalCode=9000`
            )
            .then((res) => {
                const json = res.data.member[0]
                console.log('dit is de id van de locatie: ', json['@id'])
                context.commit('addVenue', json['@id'])
            })
            .catch((err) => {
                console.log('error in evenementToStore findVenueId: ', err)
            })
    },
    // hier de post naar UiTdatabank maken.... ?
    postEvenementToUiTdatabank() {
        console.log('store evenementToPost state is: ', state.evenementToPost)
        console.log(state.evenementToPost)
        axios
            .post(
                'https://io-test.uitdatabank.be/imports/events/', state.evenementToPost, {
                headers: {
                    'x-api-key': APIKEYWilfried,
                    Authorization: `${JWT}`
                }
            }
            )
            // .then(console.log('in de axios post van Uitdb'))
            .then((response) => {
                // res.json(response.data)
                // const data = res.json(response)
                console.log('respons op post naar UiTdb in store evenementToPost: ', response.data)
                // HIER DE ID OPSLAAN IN DE STATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            })
            .catch((err) => {
                console.log('error post in store evenementToPost: ', err)
            })
    }

}

// const jsonLdCorneel = {
//     mainLanguage: 'nl',
//     name: {
//         nl: req.body.evenement
//     },
//     calendarType: 'single',
//                              // startDate: '2022-04-01T14:45:00+01:00',
//     startDate: startDateTime,
//     endDate: eindDateTime,
//     terms: [
//         {
//             id: '0.50.4.0.0'
//         }
//     ],
//     location: {
//         '@id': 'https://io-test.uitdatabank.be/place/b99cda5f-9101-402b-83e4-109299b7aaee'
//     }
// }
