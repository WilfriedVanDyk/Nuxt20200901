/* eslint-disable indent */
<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="grey lighten-1" dark v-bind="attrs" v-on="on">
            Voeg evenement toe
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Voeg een evenement toe</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" class="px-3">
              <v-text-field
                v-model="evenement"
                label="Naam Evenement"
                prepend-icon="title"
                required
                :rules="inputValidation"
              />
              <v-text-field
                v-model="type"
                label="Type Evenement"
                prepend-icon="event"
                required
                :rules="inputValidation"
              />
              <v-text-field
                v-model="organisator"
                label="Organisator"
                prepend-icon="people_alt"
                required
                :rules="inputValidation"
              />
              <v-text-field
                v-model="locatie"
                label="Locatie"
                prepend-icon="house"
                required
                :rules="inputValidation"
              />

              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formattedDate"
                    prepend-icon="date_range"
                    label="Datum evenement"
                    v-bind="attrs"
                    :rules="inputValidation"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="datum" locale="nl" />
              </v-menu>
              <!-- voeg het begin uur en eind uur toe met time picker -->
              <!-- voeg het begin uur toe met time picker -->
              <v-row>
                <v-col cols="11" sm="5">
                  <v-menu
                    ref="menu1"
                    v-model="timePicker1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="startUur"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startUur"
                        label="start uur"
                        prepend-icon="access_time"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="timePicker1"
                      v-model="startUur"
                      full-width
                      @click:minute="$refs.menu1.save(startUur)"
                    />
                  </v-menu>
                </v-col>
                <v-spacer />

                <!-- voeg het eind uur toe met time picker -->
                <v-col cols="11" sm="5">
                  <v-menu
                    ref="menu2"
                    v-model="timePicker2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="eindUur"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="eindUur"
                        label="eind uur"
                        prepend-icon="access_time"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="timePicker2"
                      v-model="eindUur"
                      full-width
                      @click:minute="$refs.menu2.save(eindUur)"
                    />
                  </v-menu>
                </v-col>
              </v-row>
              <!-- einde begin uur en eind uur toevoegen met time picker -->

              <v-overflow-btn
                v-model="status"
                class="my-2 mx-2"
                prepend-icon="help"
                :items="statusArray"
                label="status ?"
              />

              <v-textarea
                v-model="beschrijving"
                label="Beschrijving evenement"
                prepend-icon="edit"
                :rules="inputValidation"
              />
              <v-btn :loading="loading" class="primary mx-2 mt-3" @click="submit">
                Voeg evenement toe
              </v-btn>
              <v-btn class="primary mx-2 mt-3" @click="cancel">
                cancel
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'
// import router from '@/router/index'
import db from '@/plugins/fb'

// import axios from "axios";
// const axios = require('axios').default
export default {
  name: 'PopUp',
  data () {
    return {
      timePicker1: false,
      timePicker2: false,
      dialog: false,
      evenement: '',
      type: '',
      organisator: '',
      locatie: '',
      datum: null,
      startUur: null,
      eindUur: null,
      status: '',
      beschrijving: '',
      inputValidation: [
        v => (v && v.length >= 3) || ' de minimum lengte is 3 karakters',
        v => (v && v.length <= 300) || ' de maximum lengte is 300 karakters'
      ],
      loading: false,
      statusArray: ['in voorbereiding', 'afgewerkt', 'gepasseerd'],
      config: {
        name: 'https://io-test.uitdatabank.be/imports/events/',
        request: {
          method: 'POST',
          header: [
            {
              // "Access-Control-Allow-Origin": true of * ???,
              key: 'Content-Type',
              name: 'Content-Type',
              value: 'application/json',
              type: 'text'
            },
            {
              key: 'Authorization',
              value:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9jdWx1ZGItand0LXByb3ZpZGVyLmRldiIsInVpZCI6IjMzOWQxYmNiLTJiYTYtNDQ1NS04N2UzLTA2MjhiZWNhODE2ZSIsIm5pY2siOiJ3aWxmcmllZHZhbmR5ayIsImVtYWlsIjoid2lsZnJpZWR2YW5keWtAZ21haWwuY29tIiwiaWF0IjoxNTk2NjI1OTg2LCJleHAiOjE5MTE5ODU5ODYsIm5iZiI6MTU5NjYyNTk4Nn0.zEqjZsOh9nHlaby33kPrYbB2WA9HtvODRGx3QoJpplBPpmVEKq5GcgGPd_uxp1R3sxca_JW_fdPt4ODWyUbqACoNdcuBiielQv7uAnYC0pp6rsutR3iQg9-nRr5bbxYmHft32dHBjuRA43usMoHZ78LqvaqpMmFoqaI4sSxs-ny6yBAIN8NsyXO30qzkHah-UQs1x739NXwknGvPn5_e-YAOQD4-xvpyW7DuNpGpixAUZWufZwN3KxjNVtpo2FJLha7voLX4tCI9SBSTh-5HZ74FuqP-Zh9BJeZQEXSEh0TOaFqQw65XHuyi6ag3Xhn6LHubObXnoY6uVZyQzqq-jw',
              type: 'text'
            },
            {
              key: 'x-api-key',
              value: '62c5b61b-46e8-4bc4-8975-d9e06cc5bc64',
              type: 'text'
            },
            {
              key: 'domain-model',
              value: '',
              type: 'text',
              disabled: true
            }
          ],
          body: {
            mode: 'raw',
            raw:
              '{\n  "mainLanguage": "nl",\n  "name": {\n  "nl": "Postman collection event Wilfried"\n  },\n  "calendarType": "single",\n  "startDate": "2023-04-01T14:45:00+01:00",\n  "endDate": "2022-04-02T18:45:00+01:00",\n  "terms": [\n    {\n      "id": "0.50.4.0.0"\n    }\n  ],\n  "location": {\n    "@id": "https://io-test.uitdatabank.be/place/b974e083-442a-4b6c-877c-b5e35c9d14f1"\n  }\n}'
          },
          url: {
            raw: 'https://io-test.uitdatabank.be/imports/events/',
            protocol: 'https',
            host: ['io-test', 'uitdatabank', 'be'],
            path: ['imports', 'events', ''],
            query: [
              {
                key: 'domain-model',
                value: 'Publish',
                disabled: true
              }
            ]
          },
          description:
            ' Wilfried: Create event with only mandatory fields:\n- mainLanguage (nl)\n- name\n- calendar (single, no subevents)\n- terms (eventtype, no theme)\n- location\n\nDocumentation:\nhttps://documentatie.uitdatabank.be/content/json-ld-crud-api/latest/events.html'
        },
        response: []
      }
    }
  },
  computed: {
    formattedDate () {
      return this.datum
        ? format(parseISO(this.datum), 'do MMMM yyyy', { locale: nl })
        : ''
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const evenement = {
          evenement: this.evenement,
          type: this.type,
          organisator: this.organisator,
          locatie: this.locatie,
          datum: this.datum, // format(parseISO(this.datum), "do MMMM yyyy", { locale: nl }),
          startUur: this.startUur,
          eindUur: this.eindUur,
          status: this.status,
          beschrijving: this.beschrijving
        }
        try {
          await db.collection('evenementen')
            .add(evenement)
            .then(() => {
              this.loading = false
              this.dialog = false
              this.$emit('eventAdded')
              this.$refs.form.reset()
            })
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
        // deze post werkt wel naar jsonplaceholder
        // axios({
        //   method: "post",
        //   url: "https://jsonplaceholder.typicode.com/posts",
        //   data: {
        //     title: "foo",
        //     body: "bar",
        //     userId: 1,
        //   },
        // })

        // hier posten van het evenement naar uitdatabank
        // op deze manier de volgende error: CORS header 'Access-Control-Allow-Origin' does not match 'null'(zie screenshot)
        // axios
        // .post("https://io-test.uitdatabank.be/imports/events/", this.config)
        // axios(this.config)
        //   // op deze manier de volgende error: can't acces property 'protocol' parsed is undefined (zie screenshot)
        //   .then((response) => {
        //     // eslint-disable-next-line no-console
        //     console.log(response)
        //     // eslint-disable-next-line no-console
        //     console.log('post met axios succesfull')
        //   })
        //   // eslint-disable-next-line handle-callback-err
        //   .catch((error) => {
        //     // eslint-disable-next-line no-console
        //     console.log(error)
        //     // eslint-disable-next-line no-console
        //     console.log('post met axios errors')
        //   })
        //   // eslint-disable-next-line no-console
        //   .finally(() => console.log('post met axios complete'))
        // hier toevoegen aan firestoreDB
      }
    },
    cancel () {
      this.dialog = false
      this.$refs.form.reset()
      this.router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style>
</style>
