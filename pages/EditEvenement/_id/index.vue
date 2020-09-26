<template>
  <div v-if="evenementToUpdate">
    <v-card>
      <v-card-title>
        <span class="headline">Wijzig evenement: {{ evenementToUpdate.evenement }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="px-3">
          <v-text-field
            v-model="evenementToUpdate.evenement"
            label="Naam Evenement"
            prepend-icon="title"
            required
            :rules="inputValidation"
          />
          <v-text-field
            v-model="evenementToUpdate.type"
            label="Type Evenement"
            prepend-icon="event"
            required
            :rules="inputValidation"
          />
          <v-text-field
            v-model="evenementToUpdate.organisator"
            label="Organisator"
            prepend-icon="mdi-account"
            required
            :rules="inputValidation"
          />
          <!-- <v-text-field
            v-model="evenementToUpdate.locatie"
            label="Locatie"
            prepend-icon="house"
            required
            :rules="inputValidation"
          /> -->
          <VenuePicker class="mb-10" :locatieprop="evenementToUpdate.locatie" @naamVanVenue="evenementToUpdate.locatie=$event" />
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
            <v-date-picker v-model="evenementToUpdate.datum" locale="nl" />
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
                :return-value.sync="evenementToUpdate.startUur"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="evenementToUpdate.startUur"
                    label="start uur"
                    prepend-icon="access_time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="timePicker1"
                  v-model="evenementToUpdate.startUur"
                  full-width
                  @click:minute="$refs.menu1.save(evenementToUpdate.startUur)"
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
                :return-value.sync="evenementToUpdate.eindUur"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="evenementToUpdate.eindUur"
                    label="eind uur"
                    prepend-icon="access_time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="timePicker2"
                  v-model="evenementToUpdate.eindUur"
                  full-width
                  @click:minute="$refs.menu2.save(evenementToUpdate.eindUur)"
                />
              </v-menu>
            </v-col>
          </v-row>
          <!-- einde begin uur en eind uur toevoegen met time picker -->

          <v-overflow-btn
            v-model="evenementToUpdate.status"
            class="my-2 mx-2"
            prepend-icon="help"
            :items="statusArray"
            label="status ?"
          />

          <v-textarea
            v-model="evenementToUpdate.beschrijving"
            label="Beschrijving evenement"
            prepend-icon="edit"
            :rules="inputValidation"
          />
          <v-row justify="end">
            <v-btn class="primary mx-2 mt-3" @click="cancel">
              cancel
            </v-btn>
            <v-btn
              :loading="loading"
              class="primary mx-2 mt-3"
              @click="editEvenement"
            >
              Wijzig evenement
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */
import db from '@/plugins/fb'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'
import axios from 'axios'

export default {
  name: 'EditEvenement',
  data () {
    return {
      evenementToUpdate: null,
      loading: false,
      timePicker1: false,
      timePicker2: false,
      statusArray: ['in voorbereiding', 'afgewerkt', 'gepasseerd'],
      inputValidation: [
        v => (v && v.length >= 3) || ' de minimum lengte is 3 karakters',
        v => (v && v.length <= 300) || ' de maximum lengte is 300 karakters'
      ]
    }
  },
  // if you want to validate anything
  validate (data) {
    // console.log(data)
    console.log('in validate voorlopig: ' + data.params.id)
    return true
    // /^\d+$/.test(data.params.id) // vb van Reguliere Expressies: het mag alleen een nummer zijn
  },
  computed: {
    formattedDate () {
      return this.evenementToUpdate.datum
        ? format(parseISO(this.evenementToUpdate.datum), 'do MMMM yyyy', {
          locale: nl
        })
        : ''
    }
  },
  created () {
    // console.log(this.$route.params.id)
    if (this.$route.params.id) {
      const stringId = (this.$route.params.id).toString()
      const docRef = db.collection('evenementen').doc(stringId)
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log('Document data:', doc.data())
            this.evenementToUpdate = doc.data()
            this.evenementToUpdate.id = doc.id
            // console.log('evenementToUpdate:', this.evenementToUpdate)
          } else {
          // doc.data() will be undefined in this case
            console.log('No such document to edit!')
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })
    }
  },
  methods: {
    editEvenement () {
      // console.log(
      //   'het gewijzigd evenement is: ',
      //   this.evenementToUpdate.evenement,
      //   this.evenementToUpdate
      // )

      if (this.$refs.form.validate()) {
        this.loading = true
        const evenement = {
          id: this.evenementToUpdate.id,
          evenement: this.evenementToUpdate.evenement,
          type: this.evenementToUpdate.type,
          organisator: this.evenementToUpdate.organisator,
          locatie: this.evenementToUpdate.locatie,
          datum: this.evenementToUpdate.datum, // format(parseISO(this.datum), "do MMMM yyyy", { locale: nl }),
          startUur: this.evenementToUpdate.startUur,
          eindUur: this.evenementToUpdate.eindUur,
          status: this.evenementToUpdate.status,
          beschrijving: this.evenementToUpdate.beschrijving
        }

        this.$store.dispatch('putEvent', evenement)
          .then(() => {
            this.loading = false
            // this.$refs.form.reset();
          })
          .catch((error) => {
            console.log('Error getting document in dispatch van _id.editEvenement:', error)
          })

        // hier de express index PUT aanroepen om dan de onderstaande code uit te voeren naar firebase, en ook naar de uitDataBank
        // geupdate evenement meegeven in de body MEEGEVEN IN DE BODY
        axios
          // .put(`http://localhost:3000/api/putEventAPI/?id=${evenement.id}`, { evenement })
          .put(`/api/putEventAPI/?id=${evenement.id}`, { evenement })
          .then(res => (console.log('response in editEvenement.index._id. axiosPutEvent is : ' + res.data.json))) // deze response gebeurt niet
        // axios
        // .put('https://jsonplaceholder.typicode.com/posts/1', {
        //   body: JSON.stringify({
        //     title: 'foo',
        //     body: 'bar',
        //     userId: 2
        //   })
        // })
        // .then((response) => {
        //   console.log(response.data)
        //   console.log('put met axios succesfull')
        // })
          .catch((error) => {
            console.log(`${error} + put met fetch in index EditEvenement._id.index  met errors`)
          })
          .finally(() => console.log('put met fetch in index EditEvenement._id.index is complete'))

        this.$router.push({ name: 'Dashboard' })
      }
    },
    cancel () {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>

<style scoped>
</style>
