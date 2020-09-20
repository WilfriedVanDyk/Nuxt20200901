/* eslint-disable no-console */
// import db from '@/plugins/fb.js'
const express = require('express')
const app = express()
const axios = require('axios')
// Sta externe communicatie toe
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', '*') // heeft te maken met HTTP headers (indien geïnteresseerd kan je dit nalezen op https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)
//   res.header('Access-Control-Allow-Methods', '*')
//   next()
// })

// welke key is dit: van expres of van uitdatabank ?
const APIKEY = 'ed024fbf-2596-4b20-8393-2aac31525cbd'
// const APIKEYWilfried = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
// const Authorisation = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw'

app.use(express.json()) // support json encoded bodies
module.exports = { path: '/api/', handler: app }

// Sanity endpoint works!!!
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello', (req, res) => {
  console.log('hello nuxt')
  res.send('world')
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

// Put event in uitDataBank : maar app.put doesn't work
app.get('/putEvent', (req, res) => {
  // app.get('/putEvent/:id', (req, res) => {  //also doens't work
  const id = req.query.id
  console.log(`de id GEKREGEN VIA req.query.id in api.putEvent is :${id}`)
  // console.log(res)
  console.log(' params id van putEvent  in api.index is  : ' + req.params.id)
})

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

// // Voorbeeld van een html response met Express (ter illustratie)
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'))
// })
// // Antwoord met een lijst van alle gebruikers uit angular
// app.get('/users', (req, res) => {
//   db.all('SELECT * from Users', (err, rows) => {
//     if (err) {
//       res.send({ error: err })
//       return
//     }
//     res.send(JSON.stringify(rows))
//   })
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

// // Venues endpoint
// app.get('/venues', (req, res) => {
//   axios
//     .get(
//       `https://search.uitdatabank.be/places/?embed=true&q=terms.label:Bioscoop&apiKey=${APIKEY}&limit=200`
//     )
//     .then((response) => {
//       res.json(response.data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
//
