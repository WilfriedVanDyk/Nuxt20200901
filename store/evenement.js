/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

import axios from 'axios'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
// const JWT = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

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
    typeId: null, // mag verwijdert worden als we met de volledige evenementToPostUiTdb werken (zie ook in updateEvenementType const mag weg)
    image: null,
    imageJson: null,
    imageId: null
})
export const getters = {
    getTypeAanbod: (state) => {
        return state.typeAanbod
    },
    getTypeAanbodLabel(state) {
        return state.typeAanbod.map(object => object.label).sort()
    },
    // findTypeId(state) {
    //     // hier het type Id halen uit de data.state.typeAanbod ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     // console.log('in de findTypeId: typeObject is :', typeEvenement)
    //     // typeId = (state.typeAanbod.map(object => object.label === type)).id // context.rootState.data.typeAanbod;     this.$store.data of/en   state.typeAanbod is undefined.....
    //     const gekozenType = state.typeAanbod.find(object => object.label === state.evenementToPostFireBase.type) // console.log('in de findTypeId: gekozen type is: ', gekozenType)
    //     const typeId = gekozenType.id
    //     // console.log('in findTypeId in mutation van data.js, de gevonden id is:', typeId) // dit werkt tot  en met hier ik weet nog niet zeker of het iets returned... dat gebeurt dus niet....
    //     // state.typeId = typeId
    //     // console.log('data state.typeId is: ', state.typeId)
    //     return typeId
    // },
    findTypeId: state => (typeEvenement) => {
        // hier het type Id halen uit de data.state.typeAanbod ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // console.log('in de findTypeId: typeObject is :', typeEvenement)
        // typeId = (state.typeAanbod.map(object => object.label === type)).id // context.rootState.data.typeAanbod;     this.$store.data of/en   state.typeAanbod is undefined.....
        const gekozenType = state.typeAanbod.find(object => object.label === typeEvenement)
        // console.log('in de findTypeId: gekozen type is: ', gekozenType)
        const typeId = gekozenType.id
        // console.log('in findTypeId in mutation van data.js, de gevonden id is:', typeId) // dit werkt tot  en met hier ik weet nog niet zeker of het iets returned... dat gebeurt dus niet....
        // state.typeId = typeId
        // console.log('data state.typeId is: ', state.typeId)
        return typeId
    }
}
export const mutations = {
    AddImage(state, image) {
        // console.log('image in AddImage store.evenement: ', image)
        state.image = image
        // console.log('image file in store.evenement: ', image)
        // //// hier de api.index aanspreken  imageToUiTdb
        const formData = new FormData()
        formData.set('image', image)
        // image is een file, kan ik blijkbaar niet meegeven als een object...
        axios.post('/api/imageToUiTdb', formData,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                // console.log('AddImage in store Evenement: respons is ', res)
            })
            .catch((error) => {
                console.log(`${error} + AddImage in store Evenement  met errors`)
            })
            .finally(() => console.log('AddImage in store Evenement is complete'))
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
        // console.log('in updateEvenementType in store.evenement:', type)
        state.evenementToPostFireBase.type = type
        //  hoe roep ik findTypeId(type) op uit typeAanbod module  ?????????????
        // const typeId = rootGetters['typeAanbod/findTypeId'](type) // geeft error: rootGetters is undefined...
        // const typeId = getters.findTypeId(type) // geeft zelfde error
        // console.log('tyeId in store.evenement mutation updateEvenementType is: ', typeId)
        // state.evenementToPostUiTdb.terms.push({ typeId })
    },
    updateEvenementOrganisator: (state, organisator) => {
        state.evenementToPostFireBase.organisator = organisator
    },
    updateEvenementLocatie: (state, locatie) => {
        state.evenementToPostFireBase.locatie = locatie
        console.log('3: ', state.evenementToPostFireBase.locatie)
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
    updateEvenementIdUiTdatabank: (state, idUiTdatabank) => {
        state.evenementToPostFireBase.idUiTdatabank = idUiTdatabank
    },
    addStartDateToEvenementToPostUiTdb(state) {
        const startDateTime = `${state.evenementToPostFireBase.datum}T${state.evenementToPostFireBase.startUur}:00+01:00`
        state.evenementToPostUiTdb.startDate = startDateTime
    },
    addEndDateToEvenementToPostUiTdb(state) {
        const eindDateTime = `${state.evenementToPostFireBase.datum}T${state.evenementToPostFireBase.eindUur}:00+01:00`
        // console.log(' in de store.evenement endDate to UitDb json: ', eindDateTime)
        state.evenementToPostUiTdb.endDate = eindDateTime
    },
    addTypeToEvenementToPostUiTdb(state, id) {
        // console.log('typid in evenementToPost in addType mutation:', id)
        // state.type = { id }
        // console.log('state.type in evenementToPost is: ', state.type)
        state.evenementToPostUiTdb.terms.length = 0
        state.evenementToPostUiTdb.terms.push({ id })
    },
    addVenue(state, venueId) {
        state.evenementToPostUiTdb.location['@id'] = venueId
        console.log('evenementToPostUiTdb evenement.addVenue :5', state.evenementToPostUiTdb)
    },
    addVenueName(state, locatieNaam) {
        state.venueNaam = locatieNaam
        console.log('3: ', state.venueNaam)
    }
}
export const actions = {
    findVenueId(context, venue) {
        console.log('venue uit de evenement.findVenueId store action:2 ', venue)
        context.commit('addVenueName', venue)
        // er komt soms een fout op het einde... waarom ???
        axios
            .get(
                `https://search-test.uitdatabank.be/places/?embed=true&q=name.nl:("${venue}")&apiKey=${APIKEYWilfried}&addressCountry=BE&postalCode=9880`
            )
            .then((res) => {
                const json = res.data.member[0]
                console.log('dit is de id van de locatie:4 ', json['@id'])
                context.commit('addVenue', json['@id'])
            })
            .catch((err) => {
                console.log('error in evenementToStore findVenueId: ', err)
            })
    }
}

// const evenement = {
//     evenement: this.evenement,
//     type: this.type,
//     organisator: this.organisator,
//     locatie: this.locatie,
//     datum: this.datum,
//     startUur: this.startUur,
//     eindUur: this.eindUur,
//     status: this.status,
//     beschrijving: this.beschrijving,
//     idUiTdatabank: ''
// }

// evenementToPost: {
//     mainLanguage: 'nl',
//         name: {
//         nl: ''
//     },
//     calendarType: 'single',
//         startDate: '',
//             endDate: '',
//                 terms: [],
//                     location: {
//         '@id': ''
//     },
//     description: {
//         nl: ''
//     }
// }
