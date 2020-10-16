/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
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
    statusArray: [
        'DRAFT',
        'READY_FOR_VALIDATION',
        'APPROVED',
        'REJECTED',
        'DELETED'
    ]
    // typeId: ''
})
export const getters = {
    getTypeAanbod: (state) => {
        return state.typeAanbod
    },
    getTypeAanbodLabel(state) {
        return state.typeAanbod.map(object => object.label).sort()
    },
    getStatusArray(state) {
        return state.statusArray
    },
    // getTypeId(state) {
    //     return state.typeId
    // },
    findTypeId: state => (typeEvenement) => {
        // hier het type Id halen uit de data.state.typeAanbod ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log('in de findTypeId: typeObject is :', typeEvenement)
        // typeId = (state.typeAanbod.map(object => object.label === type)).id // context.rootState.data.typeAanbod;     this.$store.data of/en   state.typeAanbod is undefined.....
        const gekozenType = state.typeAanbod.find(object => object.label === typeEvenement)
        console.log(gekozenType)
        const typeId = gekozenType.id
        console.log('in findTypeId in mutation van data.js, de gevonden id is:', typeId) // dit werkt tot  en met hier ik weet nog niet zeker of het iets returned... dat gebeurt dus niet....
        // state.typeId = typeId
        // console.log('data state.typeId is: ', state.typeId)
        return typeId
    }
    // getTodoById: (state) => (id) => {
    //        return state.todos.find(todo => todo.id === id)
    //    }
}
export const mutations = {}
export const actions = {}
