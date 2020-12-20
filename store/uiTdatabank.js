/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import axios from 'axios'

export const state = () => ({
    // apikey and json webtoken from UiTdatabank
    APIKEYWilfried: '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64',
    JWT: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw',

    // type of event array: https://documentatie.uitdatabank.be/content/uitdatabank/latest/categorisatie/type_aanbod.html
    typeAanbod: [
        { label: 'Lezing of congres', scopeNote: 'Thematische voordracht of interview voor publiek.', id: '0.3.2.0.0' },
        { label: 'Opendeurdag', scopeNote: 'Dagen waarop het publiek vrij een monument, een bedrijf / organisatie, etc.mag bezichtigen.Het openstellen van een bepaalde ruimte of een bedrijf kan specifiek gericht zijn op het verbreden van de kennis van het publiek over die organisatie(Def.Van Dale).Voorbeelden: openmonumentendag, erfgoedweekend, open bedrijvendag.', id: '0.12.0.0.0' },
        { label: 'Beurs', scopeNote: 'Gelegenheden waar producten / diensten binnen een bepaald vakgebied, of die behoren tot een bepaalde tak van de industrie, aan het publiek worden voorgesteld, om de kennis hierover te verbreden.De mogelijkheid bestaat om deze producten / diensten te kopen. Omvat ook: vakbeurzen, cultuurbeurzen, showcases, etc.', id: '0.6.0.0.0' },
        { label: 'Tentoonstelling', scopeNote: 'Tijdens een tentoonstelling krijgen de bezoekers de mogelijkheid om voorwerpen of objecten te bezichtigen en te beleven.', id: '0.0.0.0.0' },
        { label: 'Begeleide rondleiding', scopeNote: 'Vb. (Excursies): groepsbezoek, reis, rondleiding, toer, boottocht of rondvaart, rondvlucht of vlucht', id: '0.7.0.0.0' },
        { label: 'Eten en drinken', scopeNote: 'Omvat de horeca, eet- en drankgelegenheden.', id: '1.50.0.0.0' }
    ],
    // https://documentatie.uitdatabank.be/content/uitdatabank/latest/werking-uitdatabank.html
    statusArray: [
        'DRAFT',
        'READY_FOR_VALIDATION',
        'APPROVED',
        'REJECTED',
        'DELETED'
    ],
    venues: []
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
    },
    getStatusArray(state) {
        return state.statusArray
    }
}
export const mutations = {
    populateVenues(state, member) {
        state.venues = member.map((location) => {
            const venue = {}
            venue.name = location.name.nl
            venue.id = location['@id']
            return venue
        })
    }
}
export const actions = {
    getVenues(context) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `https://search-test.uitdatabank.be/places/?embed=true&apiKey=${context.state.APIKEYWilfried}&limit=300&addressCountry=BE&regions=reg-meetjesland`
                )
                .then((res) => {
                    context.commit('populateVenues', res.data.member)
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    deleteEventUiTdb(context, idUiTdatabank) {
        return new Promise((resolve, reject) => {
            axios
                .delete(
                    `https://io-test.uitdatabank.be/events/${idUiTdatabank}`, {
                    headers: {
                        'x-api-key': context.state.APIKEYWilfried,
                        Authorization: context.state.JWT
                    }
                })
                .then((response) => {
                    resolve(response)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    postEventUiTdb(context, eventToUiTdb) {
        return new Promise((resolve, reject) => {
            axios
                .post(
                    'https://io-test.uitdatabank.be/imports/events/', eventToUiTdb, {
                    headers: {
                        'x-api-key': context.state.APIKEYWilfried,
                        Authorization: context.state.JWT
                    }
                })
                .then((response) => {
                    resolve(response.data.id)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    putEventUiTdb(context, eventUiTdb) {
        return new Promise((resolve, reject) => {
            const id = eventUiTdb.id
            const evenementNoId = { ...eventUiTdb }
            axios
                .put(
                    `https://io-test.uitdatabank.be/imports/events/${id}`, evenementNoId, {
                    headers: {
                        'x-api-key': context.state.APIKEYWilfried,
                        Authorization: context.state.JWT
                    }
                }
                )
                .then(() => {
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}
