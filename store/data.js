/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import axios from 'axios'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'

export const state = () => ({
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
    getStatusArray(state) {
        return state.statusArray
    }
}
export const mutations = {
    PopulateVenues(state, member) {
        state.venues = member.map((location) => {
            const venue = {}
            venue.name = location.name.nl
            venue.id = location['@id']
            return venue
        })
    }
}
export const actions = {
    GetVenues(context) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `https://search-test.uitdatabank.be/places/?embed=true&apiKey=${APIKEYWilfried}&limit=300&addressCountry=BE&regions=reg-meetjesland`
                )
                .then((res) => {
                    context.commit('PopulateVenues', res.data.member)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}
