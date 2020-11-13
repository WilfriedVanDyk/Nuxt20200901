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
              <!-- hier het type vinden om dan later in de UiTdb het type ID te plaatsen -->
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
import axios from 'axios'
import { mapMutations, mapGetters, mapActions } from 'vuex' // , mapState

export default {
  name: 'PopUp',
  data () {
    return {
      timePicker1: false,
      timePicker2: false,
      type: '',
      datum: null,
      startUur: null,
      eindUur: null,
      inputValidation: [
        v => (v && v.length >= 3) || ' de minimum lengte is 3 karakters',
        v => (v && v.length <= 300) || ' de maximum lengte is 300 karakters'
      ],
      loading: false,
      dialog: false,
      typeId: ''
    }
  },
  computed: {
    evenement: {
      get () {
        return this.$store.state.evenement.evenementToPostFireBase.evenement
      },
      set (value) {
        // console.log('evenement.evenement is: ', value)
        this.$store.commit('evenement/updateEvenementTitle', value)
      }
    },
    beschrijving: {
      get () {
        return this.$store.state.evenement.evenementToPostFireBase.beschrijving
      },
      set (value) {
        // console.log('evenement.beschrijving is: ', value)
        this.$store.commit('evenement/updateEvenementBeschrijving', value)
      }
    },
    organisator: {
      get () {
        // console.log('get evenement.organisator is: ', this.$store.state.evenement.evenementToPostFireBase.organisator)
        return this.$store.state.evenement.evenementToPostFireBase.organisator
      },
      set (value) {
        // console.log('set evenement.organisator is: ', this.$store.state.evenement.evenementToPostFireBase.organisator)
        this.$store.commit('evenement/updateEvenementOrganisator', value)
      }
    },
    formattedDate () {
      // console.log('datum in formatted date popup.vue: ', this.datum)
      return this.datum
        ? format(parseISO(this.datum), 'do MMMM yyyy', { locale: nl })
        : ''
    },
    status: {
      get () {
        return this.$store.state.evenement.evenementToPostFireBase.status
      },
      set (value) {
        // console.log('set evenement.status is: ', this.$store.state.evenement.evenementToPostFireBase.status)
        this.$store.commit('evenement/updateEvenementStatus', value)
      }

    },
    // ...mapState([
    //   'typeAanbod'
    // ]),
    ...mapGetters({
      // getEvenementToPost: 'evenement/getevenementToPostUiTdb',
      getVenueNaam: 'evenementToPost/getVenueNaam',
      getTypeAanbod: 'evenement/getTypeAanbod',
      getTypeAanbodLabel: 'evenement/getTypeAanbodLabel',
      getStatusArray: 'typeAanbod/getStatusArray',
      findTypeId: 'evenement/findTypeId'
    })
  },
  _methods: {
    ...mapMutations({
      updateEvenementType: 'evenement/updateEvenementType',
      updateEvenementDatum: 'evenement/updateEvenementDatum',
      updateEvenementStartUur: 'evenement/updateEvenementStartUur',
      updateEvenementEindUur: 'evenement/updateEvenementEindUur',
      updateEvenementIdUiTdatabank: 'evenement/updateEvenementIdUiTdatabank',
      addStartDateToEvenementToPostUiTdb: 'evenement/addStartDateToEvenementToPostUiTdb',
      addEndDateToEvenementToPostUiTdb: 'evenement/addEndDateToEvenementToPostUiTdb',
      addTypeToEvenementToPostUiTdb: 'evenement/addTypeToEvenementToPostUiTdb'
    }),
    ...mapActions({
      AddImageToEvenementUiTdb: 'evenement/AddImageToEvenementUiTdb'
    }),
    submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        // console.log('type in evenement is : ', this.type)
        this.updateEvenementType(this.type)
        this.updateEvenementDatum(this.datum)
        this.updateEvenementStartUur(this.startUur)
        this.updateEvenementEindUur(this.eindUur)
        this.addStartDateToEvenementToPostUiTdb() // werkt
        this.addEndDateToEvenementToPostUiTdb() // werkt
        this.addTypeToEvenementToPostUiTdb(this.findTypeId(this.$store.state.evenement.evenementToPostFireBase.type)) // werkt
        console.log('in popup method submit: de jsonld opgeslaan in store.evenement.evenementToPostUiTdb: OK!!', this.$store.state.evenement.evenementToPostUiTdb)

        axios
          .post('/api/postEventAPI', this.$store.state.evenement.evenementToPostUiTdb)
          .then((res) => {
            // hier controle invoeren: als de vorige post naar UiTdb werkte, maar die naar Fb niet: Moet ik de UitDb entry weer verwijderen!!!!!
            console.log('respons id na post naar UitDb: 3b ', res.data.id)
            // hier moet je de image nog uploaden naar het pas geposte evenement gebruik makend van de id v het evenement
            this.AddImageToEvenementUiTdb(res.data.id)

            this.updateEvenementIdUiTdatabank(res.data.id)
            const eventStore = this.$store.state.evenement.evenementToPostFireBase
            // console.log('voor de dispatch in het postevent naar fb: evenement is 7 ', eventStore)
            this.$store.dispatch('postEvent', eventStore)
            // console.log('na de dispatch in het postevent 8')
          })
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
        // .finally(() => console.log('post met axios in PopUp is complete'))
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
