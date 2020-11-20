<template>
  <v-app>
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
            <div>
              Je selecteerde het evenement type
              <a class="headline grey--text">
                {{ evenementToUpdate.type }} </a>
              <p>kies je een ander type?</p>
            </div>
            <v-overflow-btn
              v-model="evenementToUpdate.type"
              label="Type Evenement?"
              prepend-icon="event"
              required
              class="my-2 mx-2"
              :items="getTypeAanbodLabel"
              :rules="inputValidation"
            />
            <v-text-field
              v-model="evenementToUpdate.organisator"
              label="Organisator"
              prepend-icon="mdi-account"
              required
              :rules="inputValidation"
            />
            <VenuePicker class="mb-10" :locatieprop="evenementToUpdate.locatie" @naamVanVenue="evenementToUpdate.locatie=$event" />
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDate"
                  prepend-icon="date_range"
                  label="Datum evenement"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="evenementToUpdate.datum" locale="nl" :min="nowDate" :max="getEndDate" />
            </v-menu>
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
                    :max="evenementToUpdate.eindUur"
                    full-width
                    @click:minute="$refs.menu1.save(evenementToUpdate.startUur)"
                  />
                </v-menu>
              </v-col>
              <v-spacer />
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
                    :min="evenementToUpdate.startUur"
                    full-width
                    @click:minute="$refs.menu2.save(evenementToUpdate.eindUur)"
                  />
                </v-menu>
              </v-col>
            </v-row>

            <v-overflow-btn
              v-model="evenementToUpdate.status"
              class="my-2 mx-2"
              prepend-icon="help"
              :items="getStatusArray"
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
    <div v-else>
      Dit evenement bestaat niet. De parameter Id is niet juist.
    </div>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
import db from '@/plugins/fb'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'
// import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'EditEvenement',
  data () {
    return {
      evenementToUpdate: null,
      loading: false,
      nowDate: new Date().toISOString().slice(0, 10),
      timePicker1: false,
      timePicker2: false,
      statusArray: ['in voorbereiding', 'afgewerkt', 'gepasseerd'],
      inputValidation: [
        v => (v && v.length >= 3) || ' de minimum lengte is 3 karakters',
        v => (v && v.length <= 300) || ' de maximum lengte is 300 karakters'
      ]
    }
  },
  computed: {
    getEndDate () {
      const endDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDay())
      return endDate.toISOString().slice(0, 10)
    },
    formattedDate () {
      return this.evenementToUpdate.datum
        ? format(parseISO(this.evenementToUpdate.datum), 'do MMMM yyyy', {
          locale: nl
        })
        : ''
    },
    getLocatie () {
      return this.getVenueNaam ? this.getVenueNaam : this.evenementToUpdate.locatie
    },
    ...mapGetters({
      getEvenementToPut: 'evenementToPut/getEvenementToPut',
      getVenueNaam: 'evenementToPut/getVenueNaam',
      getTypeAanbod: 'evenement/getTypeAanbod',
      getTypeAanbodLabel: 'evenement/getTypeAanbodLabel',
      getStatusArray: 'data/getStatusArray',
      findTypeId: 'evenement/findTypeId'
    })
  },
  created () {
    if (this.$route.params.id) {
      const stringId = (this.$route.params.id).toString()
      const docRef = db.collection('evenementen').doc(stringId)
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.evenementToUpdate = doc.data()
            this.evenementToUpdate.id = doc.id
          } else {
            console.log('No such document to edit!')
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error)
        })
    }
  },
  methods: {
    ...mapMutations({
      addName: 'evenementToPut/addName',
      addStartDate: 'evenementToPut/addStartDate',
      addEndDate: 'evenementToPut/addEndDate',
      addDescription: 'evenementToPut/addDescription',
      addType: 'evenementToPut/addType',
      evenementfbToStore: 'evenementToPut/evenementfbToStore'
    }),
    ...mapActions({
      putEventToAlldb: 'evenementToPut/putEventToAlldb'
    }),
    editEvenement () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const evenement = this.evenementToUpdate
        evenement.locatie = this.getLocatie

        this.evenementfbToStore(evenement)
        this.addName(evenement)
        this.addStartDate(evenement)
        this.addEndDate(evenement)
        this.addDescription(evenement)
        const id = this.findTypeId(evenement.type)
        this.addType(id)

        this.putEventToAlldb(evenement.idUiTdatabank)
          .then(this.$router.push({ name: 'Dashboard' }))
      }
    },
    cancel () {
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>
