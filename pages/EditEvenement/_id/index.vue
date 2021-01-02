<template>
  <v-main>
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
            :counter="60"
            :rules="inputValidationShortText"
          />
          <v-overflow-btn
            v-model="evenementToUpdate.type"
            label="Type Evenement?"
            prepend-icon="event"
            required
            class="my-2 mx-2"
            :items="getTypeAanbodLabel"
            :rules="inputValidationSelectText"
          />
          <v-text-field
            v-model="evenementToUpdate.organisator"
            label="Organisator"
            prepend-icon="mdi-account"
            required
            :counter="60"
            :rules="inputValidationShortText"
          />
          <VenuePicker class="mb-10" />
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
            :rules="inputValidationSelectText"
            label="status ?"
          />

          <v-textarea
            v-model="evenementToUpdate.beschrijving"
            label="Beschrijving evenement"
            prepend-icon="edit"
            :counter="300"
            :rules="inputValidation"
          />
          <v-row justify="end">
            <v-btn
              :loading="loading"
              class="success mx-2 mt-3"
              @click="editEvenement"
            >
              Wijzig evenement
            </v-btn>
            <v-btn class="success mx-2 mt-3" @click="cancel">
              annuleer
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import db from '~/plugins/fb'

export default {
  name: 'EditEvenement',
  data () {
    return {
      evenementToUpdate: {},
      loading: false,
      nowDate: new Date().toISOString().slice(0, 10),
      inputValidation: [
        value => !!value || 'Verplicht veld',
        v => (v && v.length >= 3) || ' de minimum lengte is 3 karakters',
        v => (v && v.length <= 300) || ' de maximum lengte is 300 karakters'
      ],
      inputValidationShortText: [
        value => !!value || 'Verplicht veld',
        v => (v && v.length >= 3) || ' de minimum lengte is 3 karakters',
        v => (v && v.length <= 60) || ' de maximum lengte is 60 karakters'
      ],
      inputValidationSelectText: [
        value => !!value || 'Verplicht veld'
      ],
      inputValidationDateTime: [
        value => !!value || 'Verplicht veld'
      ],
      timePicker1: false,
      timePicker2: false
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
    ...mapGetters({
      getChangedVenue: 'evenementToPut/getChangedVenue',
      getTypeAanbod: 'uiTdatabank/getTypeAanbod',
      getTypeAanbodLabel: 'uiTdatabank/getTypeAanbodLabel',
      getStatusArray: 'uiTdatabank/getStatusArray',
      findTypeId: 'uiTdatabank/findTypeId'
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
            this.addChangedVenue(this.evenementToUpdate.locatie)
          }
        })
        .catch(function (error) {
          this.$nuxt.error({ statusCode: error.code, message: error.message })
        })
    }
  },
  methods: {
    ...mapMutations({
      addType: 'evenementToPut/addType',
      evenementToStore: 'evenementToPut/evenementToStore',
      addChangedVenue: 'evenementToPut/addChangedVenue'
    }),
    ...mapActions({
      putEventToAlldb: 'evenementToPut/putEventToAlldb'
    }),
    editEvenement () {
      if (this.$refs.form.validate()) {
        this.loading = true
        // add location to date.evenementToUpdate
        this.evenementToUpdate.locatie = this.getChangedVenue

        // evenementToUpdate to store.evenementToPut.state objects for firestore and UiTdatabank
        this.evenementToStore(this.evenementToUpdate)
        // add type to store.state.evenementToPut.evenementToPut (UiTdatabank)
        const id = this.findTypeId(this.evenementToUpdate.type)
        this.addType(id)

        // put both objects to backend firestore and UiTdatabank
        this.putEventToAlldb()
          .catch((error) => {
            this.$store.commit('evenement/commitEventsToNull')
            this.$store.commit('evenementToPut/eventsToNull')
            this.$nuxt.error({ statusCode: error.code, message: error.message })
          })
          .finally(
            this.$store.commit('evenement/commitEventsToNull'),
            this.$store.commit('evenementToPut/eventsToNull'),
            this.$router.push({ name: 'index' })
          )
      }
    },
    cancel () {
      this.$store.commit('evenement/commitEventsToNull')
      this.$store.commit('evenementToPut/eventsToNull')
      this.$router.push({ name: 'index' })
    }
  },
  head: {
    title: 'Evenement aanpassen'
  }
}
</script>
