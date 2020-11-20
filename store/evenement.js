/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

import axios from 'axios'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
const JWT = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

export const state = () => ({
    typeAanbod: [
        { label: 'Lezing of congres', scopeNote: 'Thematische voordracht of interview voor publiek.', id: '0.3.2.0.0' },
        { label: 'Opendeurdag', scopeNote: 'Dagen waarop het publiek vrij een monument, een bedrijf / organisatie, etc.mag bezichtigen.Het openstellen van een bepaalde ruimte of een bedrijf kan specifiek gericht zijn op het verbreden van de kennis van het publiek over die organisatie(Def.Van Dale).Voorbeelden: openmonumentendag, erfgoedweekend, open bedrijvendag.', id: '12.0.0.0' },
        { label: 'Beurs', scopeNote: 'Gelegenheden waar producten / diensten binnen een bepaald vakgebied, of die behoren tot een bepaalde tak van de industrie, aan het publiek worden voorgesteld, om de kennis hierover te verbreden.De mogelijkheid bestaat om deze producten / diensten te kopen. Omvat ook: vakbeurzen, cultuurbeurzen, showcases, etc.', id: '0.6.0.0.0' },
        { label: 'Tentoonstelling', scopeNote: 'Tijdens een tentoonstelling krijgen de bezoekers de mogelijkheid om voorwerpen of objecten te bezichtigen en te beleven.', id: '0.0.0.0.0' },
        { label: 'Begeleide rondleiding', scopeNote: 'Vb. (Excursies): groepsbezoek, reis, rondleiding, toer, boottocht of rondvaart, rondvlucht of vlucht', id: '0.7.0.0.0' },
        { label: 'Cursus of workshop', scopeNote: 'Een reeks lessen, een les, of een werkgroep die gericht is op het overdragen van specifieke kennis of het aanleren van bepaalde vaardigheden die behoren tot een bepaald vakgebied of een bepaalde discipline.', id: '0.3.1.0.0' },
        { label: 'Eten en drinken', scopeNote: 'Omvat de horeca, eet- en drankgelegenheden.', id: '1.50.0.0.0' }
    ],
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
    },
    venueNaam: '',
    imageId: null
})
export const getters = {
    getTypeAanbod: (state) => {
        return state.typeAanbod
    },
    getTypeAanbodLabel(state) {
        return state.typeAanbod.map(object => object.label).sort()
    },
    findTypeId: state => (typeEvenement) => {
        const gekozenType = state.typeAanbod.find(object => object.label === typeEvenement)
        const typeId = gekozenType.id
        return typeId
    }
}
export const mutations = {
    addImageIdToState(state, id) {
        state.imageId = id
        state.evenementToPostFireBase.imageId = id
    },
    addImageIdToEvenementToPostUiTdb(state, id) {
        state.evenementToPostFireBase.image = id
        state.evenementToPostUiTdb.mediaObjectId = id
    },
    updateEvenementTitle(state, title) {
        state.evenementToPostFireBase.evenement = title
        state.evenementToPostUiTdb.name = { nl: title }
    },
    updateEvenementBeschrijving(state, beschrijving) {
        state.evenementToPostFireBase.beschrijving = beschrijving
        state.evenementToPostUiTdb.description = { nl: beschrijving }
    },
    updateEvenementType: (state, type) => {
        state.evenementToPostFireBase.type = type
    },
    updateEvenementOrganisator: (state, organisator) => {
        state.evenementToPostFireBase.organisator = organisator
    },
    updateEvenementLocatie: (state, locatie) => {
        state.evenementToPostFireBase.locatie = locatie
    },
    updateEvenementDatum: (state, datum) => {
        state.evenementToPostFireBase.datum = datum
    },
    updateEvenementStartUur: (state, startUur) => {
        state.evenementToPostFireBase.startUur = startUur
    },
    updateEvenementEindUur: (state, eindUur) => {
        state.evenementToPostFireBase.eindUur = eindUur
    },
    updateEvenementStatus: (state, status) => {
        state.evenementToPostFireBase.status = status
    },
    // updateEvenementIdUiTdatabank: (state, idUiTdatabank) => {
    //     state.evenementToPostFireBase.idUiTdatabank = idUiTdatabank
    // },
    addStartDateToEvenementToPostUiTdb(state) {
        const startDateTime = `${state.evenementToPostFireBase.datum}T${state.evenementToPostFireBase.startUur}:00+01:00`
        state.evenementToPostUiTdb.startDate = startDateTime
    },
    addEndDateToEvenementToPostUiTdb(state) {
        const eindDateTime = `${state.evenementToPostFireBase.datum}T${state.evenementToPostFireBase.eindUur}:00+01:00`
        state.evenementToPostUiTdb.endDate = eindDateTime
    },
    addTypeToEvenementToPostUiTdb(state, id) {
        state.evenementToPostUiTdb.terms.length = 0
        state.evenementToPostUiTdb.terms.push({ id })
    },
    addVenue(state, venueId) {
        state.evenementToPostUiTdb.location['@id'] = venueId
    },
    addVenueName(state, locatieNaam) {
        state.venueNaam = locatieNaam
    }
}
export const actions = {
    AddImageId(context, image) {
        if (image) {
            const formData = new FormData()
            formData.append('file', image)
            formData.append('description', 'een foto bij een evenement')
            formData.append('language', 'nl')
            formData.append('copyrightHolder', 'pixabay')

            axios.post('https://io-test.uitdatabank.be/images/', formData, {
                headers: {
                    'x-api-key': APIKEYWilfried,
                    Authorization: `${JWT}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    context.commit('addImageIdToState', response.data.imageId)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    AddImageToEvenementUiTdb(context, idEvent) {
        const idFoto = context.state.imageId
        if (idFoto) {
            axios.post(
                `https://io-test.uitdatabank.be/events/${idEvent}/images/`
                ,
                {
                    /*eslint-disable */
                    "mediaObjectId": "70806433-772a-4413-b7e6-63e41d1a1887"
                    // "mediaObjectId": idFoto

                },
                {
                    headers: {
                        'x-api-key': APIKEYWilfried,
                        Authorization: `${JWT}`,
                        'Content-Type': 'text/plain'
                    }
                })
                .then((response) => {
                    console.log('55', response)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    findVenueId(context, venue) {
        context.commit('addVenueName', venue)
        if (venue) {
            axios
                .get(
                    `https://search-test.uitdatabank.be/places/?embed=true&q=name.nl:("${venue}")&apiKey=${APIKEYWilfried}&addressCountry=BE&postalCode=9880`
                    // `https://search-test.uitdatabank.be/places/?embed=true&apiKey=${APIKEYWilfried}&limit=200&addressCountry=BE&q=(postalCode=9880 OR postalCode=9990)`
                    // `https://search-test.uitdatabank.be/places/?embed=true&q=name.nl:("${venue}")&apiKey=${APIKEYWilfried}&addressCountry=BE&&q=(postalCode=9880 OR postalCode=9990)`
                )
                .then((res) => {
                    const json = res.data.member[0]
                    context.commit('addVenue', json['@id'])
                })
                .catch((err) => {
                    console.log('error in evenementToStore findVenueId: ', err)
                })
        }
    },
    PostEvent(context) {
        let event = context.state.evenementToPostFireBase
        const location = context.state.evenementToPostFireBase.locatie
        console.log('let event: 0', event)
        axios
            .post(
                'https://io-test.uitdatabank.be/imports/events/', context.state.evenementToPostUiTdb, {
                headers: {
                    'x-api-key': APIKEYWilfried,
                    Authorization: `${JWT}`
                }
            }
            )
            .then((response) => {
                console.log('id UiTdb als repose:1 ', response.data.id)
                event.idUiTdatabank = response.data.id
                event.locatie = location

                // context.dispatch('AddImageToEvenementUiTdb', context.state.evenementToPostFireBase.idUiTdatabank)
                console.log('toFbEvent: 2', event)
                context.dispatch('postEvent', event, { root: true })
            })
            .catch((err) => {
                // delete mogelijk event in UiTdb
                // en delete mogelijk event in Fb
                console.log('error post offer STORE EVENEMENT', err)
            })

    }
}

