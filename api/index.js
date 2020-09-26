/* eslint-disable indent */
/* eslint-disable no-console */
const express = require('express')
const app = express()
const axios = require('axios')

// welke key is dit: van expres of van uitdatabank ?
const APIKEY = 'ed024fbf-2596-4b20-8393-2aac31525cbd'
const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
const JWT = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

// routing in expres...
// routing: Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }

app.use(express.json()) // support json encoded bodies
module.exports = { path: '/api/', handler: app }

// Sanity endpoint works!!!
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello', (req, res) => {
  console.log('hello nuxt')
  res.send('world')
})

// post event in uitDataBank : app.post works with axios.post in popup.vue component
app.post('/postEventAPI', (req, res) => {
  // req.header('naamVanHeader') // toevoegen van een header
  console.log('in de postEventAPI: body ?')
  console.log(req.body)
  console.log('in de postEvenAPI express method')
  const evenementVoorUitDatabank = req.body
  axios
    .post(
      'https://io-test.uitdatabank.be/imports/events/', evenementVoorUitDatabank, {
      headers: {
        'x-api-key': APIKEYWilfried,
        Authorization: `${JWT}`
      }
    }
    )
    .then((response) => {
      res.json(response.data)
      // const data = res.json(response)
      // console.log(data)
    })
    .catch((err) => {
      console.log('error post offer', err)
    })
  // app.get('/putEventAPI/:id', (req, res) => {
  // const id = req.query.id
  // console.log(`de id GEKREGEN VIA req.query.id in api.putEvent is :${id}`) // via de req.query.id als in de http request ?id=... staat
  // console.log(res.headers.host)
  // console.log(res.body)
  // console.log(' params id van putEvent  in api.index is  : ' + req.params.id) // via parameter
})

// Put event in uitDataBank : app.put works with axios.put in EditEvenement.index._id
app.put('/putEventAPI', (req, res) => {
  // req.header('User-Agent') // toevoegen van een header
  const id = req.query.id
  console.log(`de id GEKREGEN VIA req.query.id in api.putEvent is :${id}`) // via de req.query.id als in de http request ?id=... staat
  console.log(req.body) // geeft de juiste body mee!!!
  // console.log(' params id van putEvent  in api.index is  : ' + req.params.id) // via parameter

  // / imports / events / { cdbid }
  // axios
  //   .get(
  //     `https://io-test.uitdatabank.be/import/events/?${id}&jwt=${JWT}&apiKey=${APIKEYWilfried}`
  //   )
  //   .then((response) => {
  //     res.json(response.data)
  //     // const data = res.json(response)
  //     // console.log(data)
  //   })
  //   .catch((err) => {
  //     console.log('error put offer', err)
  //   })
})

// delete event in uitDataBank: app.delete works with axios.delete in dashboard
app.delete('/deleteEventAPI', (req, res) => {
  // req.header('User-Agent') // toevoegen van een header
  const id = req.query.id
  console.log(`de id GEKREGEN VIA req.query.id in api.deleteEvent is :${id}`) // via de req.query.id als in de http request ?id=... staat
  // console.log(res.headers.host)
  // console.log(res.body)
  // console.log(' params id van putEvent  in api.index is  : ' + req.params.id) // via parameter
})
/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.get offer locatie/venues
app.get('/venues', (req, res) => {
  axios
    .get(
      // `https://search.uitdatabank.be/places/?embed=true&q=terms.label:Bioscoop&apiKey=${APIKEY}&limit=200` // Bram
      `https://search-test.uitdatabank.be/places/?embed=true&apiKey=${APIKEYWilfried}&limit=200&addressCountry=BE&postalCode=9000`
    )
    .then((response) => {
      res.json(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
})

// app.get offer event (by id and/or by name ???)

// app.get offers all events from Wilfried

/// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Offer endpoint Bram
app.get('/offer', (req, res) => {
  const id = req.query.id
  console.log(id)
  axios
    .get(
      // error
      // `https://io.uitdatabank.be/offers/?disableDefaultFilters=true&embed=true&q=id:${id}&start=0&workflowStatus=READY_FOR_VALIDATION,APPROVED&apiKey=0`
      `https://io.uitdatabank.be/offers/?disableDefaultFilters=true&embed=true&q=id:${id}&start=0&workflowStatus=READY_FOR_VALIDATION,APPROVED&apiKey=${APIKEY}`
    )
    .then((response) => {
      res.json(response.data)
      // const data = res.json(response)
      // console.log(data)
    })
    .catch((err) => {
      console.log('error offer', err)
    })
})
// getEventUitDataBank endpoint
app.get('/getEventUitDataBank', (req, res) => {
  const id = req.query.id
  console.log(id)
  console.log(res)
  axios
    .get(
      'https://io-test.uitdatabank.be/event/687ae349-8a64-4d54-b1a4-d86151adb7ce'
    )
    .then((response) => {
      res.json(response.data)
      // const data = res.json(response)
      // console.log(data)
    })
    .catch((err) => {
      console.log('error offer', err)
    })
})

// // Voorbeeld van een html response met Express (ter illustratie)
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'))
// })

// Movie endpoint
// app.get('/movie', (req, res) => {
//   const movieName = req.query.name
//   axios
//     .get(
//       `https://search.uitdatabank.be/offers/?embed=true&q=terms.label:Film AND name.nl:(${movieName})&apiKey=${APIKEY}&limit=200`
//     )
//     .then((response) => {
//       res.json(response.data)
//     })
//     .catch((err) => {
//       console.log('err', err)
//     })
// })

// // Movies endpoint
// app.get('/movies', (req, res) => {
//   axios
//     .get(
//       `https://search.uitdatabank.be/offers/?embed=true&q=terms.label:Film AND workflowStatus:APPROVED&apiKey=${APIKEY}&limit=200`
//     )
//     .then((response) => {
//       res.json(response.data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
