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
                v-model="event.evenement"
                label="Naam Evenement"
                prepend-icon="title"
                required
                :counter="60"
                :rules="inputValidationShortText"
              />
              <v-overflow-btn
                v-model="event.type"
                label="Type Evenement?"
                prepend-icon="event"
                required
                class="my-2 mx-2"
                :items="getTypeAanbodLabel"
                :rules="inputValidationSelectText"
              />
              <v-text-field
                v-model="event.organisator"
                label="Organisator"
                prepend-icon="mdi-account-circle"
                required
                placeholder="VZW Fatima"
                filled
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
                    :rules="inputValidationDateTime"
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="event.datum" locale="nl" :min="nowDate" :max="getEndDate" />
              </v-menu>

              <v-row>
                <v-col cols="11" sm="5">
                  <v-menu
                    ref="menu1"
                    v-model="timePicker1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="event.startUur"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="event.startUur"
                        label="start uur"
                        prepend-icon="access_time"
                        readonly
                        v-bind="attrs"
                        :rules="inputValidationDateTime"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="timePicker1"
                      v-model="event.startUur"
                      :max="event.eindUur"
                      full-width
                      @click:minute="$refs.menu1.save(event.startUur)"
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
                    :return-value.sync="event.eindUur"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="event.eindUur"
                        label="eind uur"
                        prepend-icon="access_time"
                        readonly
                        v-bind="attrs"
                        :rules="inputValidationDateTime"
                        v-on="on"
                      />
                    </template>
                    <v-time-picker
                      v-if="timePicker2"
                      v-model="event.eindUur"
                      :min="event.startUur"
                      full-width
                      @click:minute="$refs.menu2.save(event.eindUur)"
                    />
                  </v-menu>
                </v-col>
              </v-row>

              <v-overflow-btn
                v-model="event.status"
                class="my-2 mx-2"
                prepend-icon="help"
                :items="getStatusArray"
                label="status ?"
                :rules="inputValidationSelectText"
              />
              <v-textarea
                v-model="event.beschrijving"
                locale="nl"
                auto-grow
                :counter="300"
                label="Beschrijving evenement"
                prepend-icon="edit"
                :rules="inputValidation"
              />
              <v-btn :loading="loading" class="success mx-2 mt-3" @click="submit">
                Voeg evenement toe
              </v-btn>
              <v-btn class="success mx-2 mt-3" @click="cancel">
                annuleer
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PopUp',
  data () {
    return {
      dialog: false,
      event: {
        beschrijving: null,
        datum: null,
        eindUur: null,
        evenement: null,
        organisator: null,
        startUur: null,
        status: null,
        type: null
      },
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
      return this.event.datum
        ? format(parseISO(this.event.datum), 'do MMMM yyyy', { locale: nl })
        : ''
    },
    ...mapGetters({
      getTypeAanbodLabel: 'uiTdatabank/getTypeAanbodLabel',
      getStatusArray: 'uiTdatabank/getStatusArray'
    })
  },
  methods: {
    ...mapActions({
      eventToStore: 'evenement/eventToStore',
      postEvent: 'evenement/postEvent'
    }),
    submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.eventToStore(this.event)

        this.postEvent()
          .then(() => {
            this.loading = false
            this.dialog = false
            this.$emit('eventAdded')
            this.$refs.form.reset()
          })
          .catch((error) => {
            this.dialog = false
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
      this.dialog = false
      this.$store.commit('evenement/commitEventsToNull')
      this.$store.commit('evenementToPut/eventsToNull')
      this.$refs.form.reset()
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style>
</style>
