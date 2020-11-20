/* eslint-disable indent */
/* eslint-disable no-console */
const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
const JWT = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

app.use(express.json())

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
module.exports = { path: '/api/', handler: app }

// Sanity endpoint works!!!
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello', (req, res) => {
  res.send('world')
})
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post image to event in UiTdb
app.post('/imageToEvent', (req, res) => {
  console.log('body bij imageToEvent: 5', req.body)
  const idEvent = req.body.idEvent
  const idFoto = req.body.idFoto
  axios.post(`https://io-test.uitdatabank.be/events/${idEvent}4dc2bd3b-1971-4487-96a6-5fc43129f0d2/images/`, { mediaObjectId: idFoto }, {
    headers: {
      'Content-Type': 'text/plain',
      'x-api-key': APIKEYWilfried,
      Authorization: `${JWT}`
    }
  })
    .then((response) => {
      console.log('55', response)
      res.json(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
})
//  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// app.get offer locatie/venues
app.get('/venues', (req, res) => {
  axios
    .get(
      `https://search-test.uitdatabank.be/places/?embed=true&apiKey=${APIKEYWilfried}&limit=200&addressCountry=BE&postalCode=9880`
      // `https://search-test.uitdatabank.be/places/?embed=true&apiKey=${APIKEYWilfried}&limit=200&addressCountry=BE&(postalCode=9880 OR postalCode=9990)`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
})
