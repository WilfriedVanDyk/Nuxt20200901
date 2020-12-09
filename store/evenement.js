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
    }
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
        context.commit('addTypeToEvenementToPostUiTdb', (context.getters.findTypeId(context.state.evenementToPostFireBase.type)))
    },
    PostEvent(context) {
        const event = context.state.evenementToPostFireBase
        return new Promise((resolve, reject) => {
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
                    event.idUiTdatabank = response.data.id
                    context.dispatch('postEvent', event, { root: true })
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    DeleteEventUiTdb(context, idUiTdatabank) {
        return new Promise((resolve, reject) => {
            axios
                .delete(
                    `https://io-test.uitdatabank.be/events/${idUiTdatabank}`, {
                    headers: {
                        'x-api-key': APIKEYWilfried,
                        Authorization: `${JWT}`
                    }
                })
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}
