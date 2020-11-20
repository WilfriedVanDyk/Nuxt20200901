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
              <v-overflow-btn
                v-model="type"
                label="Type Evenement?"
                prepend-icon="event"
                required
                class="my-2 mx-2"
                :items="getTypeAanbodLabel"
                :rules="inputValidation"
              />
              <v-text-field
                v-model="organisator"
                label="Organisator"
                prepend-icon="mdi-account-circle"
                required
                :rules="inputValidation"
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
                <v-date-picker v-model="datum" locale="nl" :min="nowDate" :max="getEndDate" />
              </v-menu>

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
                      :max="eindUur"
                      full-width
                      @click:minute="$refs.menu1.save(startUur)"
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
                      :min="startUur"
                      full-width
                      @click:minute="$refs.menu2.save(eindUur)"
                    />
                  </v-menu>
                </v-col>
              </v-row>

              <v-overflow-btn
                v-model="status"
                class="my-2 mx-2"
                prepend-icon="help"
                :items="getStatusArray"
                label="status ?"
              />
              <ImageInput class="mb-10" />
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
/* eslint-disable no-console */
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'
// import axios from 'axios'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'PopUp',
  data () {
    return {
      evenement: null,
      timePicker1: false,
      timePicker2: false,
      // type: '',
      nowDate: new Date().toISOString().slice(0, 10),
      datum: null,
      startUur: null,
      eindUur: null,
      beschrijving: null,
      inputValidation: [
        v => (v && v.length >= 3) || ' de minimum lengte is 3 karakters',
        v => (v && v.length <= 300) || ' de maximum lengte is 300 karakters'
      ],
      loading: false,
      organisator: null,
      dialog: false,
      status: null,
      type: null,
      typeId: ''
    }
  },
  computed: {
    getEndDate () {
      const endDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDay())
      return endDate.toISOString().slice(0, 10)
    },
    formattedDate () {
      return this.datum
        ? format(parseISO(this.datum), 'do MMMM yyyy', { locale: nl })
        : ''
    },
    ...mapGetters({
      getTypeAanbodLabel: 'evenement/getTypeAanbodLabel',
      getStatusArray: 'data/getStatusArray',
      findTypeId: 'evenement/findTypeId'
    })
  },
  _methods: {
    ...mapMutations({
      updateEvenementDatum: 'evenement/updateEvenementDatum',
      updateEvenementStartUur: 'evenement/updateEvenementStartUur',
      updateEvenementEindUur: 'evenement/updateEvenementEindUur',
      updateEvenementIdUiTdatabank: 'evenement/updateEvenementIdUiTdatabank',
      addStartDateToEvenementToPostUiTdb: 'evenement/addStartDateToEvenementToPostUiTdb',
      addEndDateToEvenementToPostUiTdb: 'evenement/addEndDateToEvenementToPostUiTdb',
      addTypeToEvenementToPostUiTdb: 'evenement/addTypeToEvenementToPostUiTdb'
    }),
    ...mapActions({
      AddImageToEvenementUiTdb: 'evenement/AddImageToEvenementUiTdb',
      PostEvent: 'evenement/PostEvent'
    }),
    submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.commit('evenement/updateEvenementTitle', this.evenement)
        this.$store.commit('evenement/updateEvenementBeschrijving', this.beschrijving)
        this.$store.commit('evenement/updateEvenementOrganisator', this.organisator)
        this.$store.commit('evenement/updateEvenementStatus', this.status)
        this.updateEvenementDatum(this.datum)
        this.updateEvenementStartUur(this.startUur)
        this.updateEvenementEindUur(this.eindUur)
        this.$store.commit('evenement/updateEvenementType', this.type)

        this.addStartDateToEvenementToPostUiTdb()
        this.addEndDateToEvenementToPostUiTdb()
        this.addTypeToEvenementToPostUiTdb(this.findTypeId(this.$store.state.evenement.evenementToPostFireBase.type))

        this.PostEvent()
          .then(() => {
            this.loading = false
            this.dialog = false
            this.$emit('eventAdded')
            this.$refs.form.reset()
            this.$router.push({ name: 'Dashboard' })
          })
          .catch((error) => {
            console.log(`${error} + post met axios in popUp  met errors`)
          })
      }
    },
    cancel () {
      this.dialog = false
      this.$refs.form.reset()
      this.$router.push({ name: 'Dashboard' })
    }
  },
  get methods () {
    return this._methods
  },
  set methods (value) {
    this._methods = value
  }
}
</script>

<style>
</style>
