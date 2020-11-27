/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import axios from 'axios'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
const JWT = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

export const state = () => ({
    imageId: null
})
export const getters = {}
export const mutations = {
    addImageIdToState(state, id) {
        state.imageId = id
        // state.evenementToPostFireBase.imageId = id
    }
}
export const actions = {
    // this action must be in de store.evenement file ACTIONS
    // the id is to find in the "state" of this store.imageUpload file
    addImageIdToEvenementToPostUiTdb(context) {
        context.dispatch('imageUpload/AddImageId')
        context.state.evenementToPostFireBase.image = context.state.imageUpload.imageId
        context.state.evenementToPostUiTdb.mediaObjectId = context.state.imageUpload.imageId
    },
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
            axios.post('api/imageToEvent', { idEvent, idFoto })
                // axios.post(
                //     `https://io-test.uitdatabank.be/events/${idEvent}/images/`
                //     ,
                //     {
                //         /*eslint-disable */
                //         // "mediaObjectId": "70806433-772a-4413-b7e6-63e41d1a1887"
                //         "mediaObjectId": idFoto

                //     },
                //     {
                //         headers: {
                //             'x-api-key': APIKEYWilfried,
                //             Authorization: `${JWT}`,
                //             'Content-Type': 'text/plain'
                //         }
                //     })
                .then((response) => {
                    console.log('55', response)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}
