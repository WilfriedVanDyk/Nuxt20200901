/* eslint-disable no-console */
// import db from '@/plugins/fb'
const express = require('express')
const app = express()

// const axios = require('axios')
// welke key is dit: van expres of van uitdatabank ?
// const APIKEY = '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64'
app.use(express.json()) // support json encoded bodies
module.exports = { path: '/api', handler: app }

// Sanity endpoint works!!!
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/hello', (req, res) => {
  console.log('hello nuxt in text')
  res.send('world')
})

// delete in firestore
app.get('/deleteEvenement', (req, res) => {
  console.log(`id van het evenement is :  ${req.query.id}`)
  // db.collection('evenementen')
  //   .doc(req.params.id)
  //   .delete()
  //   .catch((err) => {
  //     // eslint-disable-next-line no-console
  //     console.log(err)
  //   })
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

// // Offer endpoint
// app.get('/offer', (req, res) => {
//   const id = req.params.id
//   axios
//     .get(
//       `https://search.uitdatabank.be/offers/?embed=true&q=id:${id}&apiKey=${APIKEY}`
//     )
//     .then((response) => {
//       res.json(response.data)
//     })
//     .catch((err) => {
//       console.log(err)
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
// Sta externe communicatie toe
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', '*') // heeft te maken met HTTP headers (indien geïnteresseerd kan je dit nalezen op https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)
//   res.header('Access-Control-Allow-Methods', '*')
//   next()
// })
