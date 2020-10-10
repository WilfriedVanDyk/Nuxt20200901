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
              <!-- <v-text-field
                v-model="locatie"
                label="Locatie"
                prepend-icon="house"
                required
                :rules="inputValidation"
              /> -->
              <!-- <VenuePicker class="mb-10" @naamVanVenue="locatie=$event" /> -->
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
/* eslint-disable no-console */
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'
import axios from 'axios'
import { mapMutations, mapGetters, mapActions } from 'vuex'

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
      statusArray: ['in voorbereiding', 'afgewerkt', 'gepasseerd']
    }
  },
  computed: {
    formattedDate () {
      return this.datum
        ? format(parseISO(this.datum), 'do MMMM yyyy', { locale: nl })
        : ''
    },
    ...mapGetters({
      getEvenementToPost: 'evenementToPost/getEvenementToPost',
      getVenueNaam: 'evenementToPost/getVenueNaam'
    })
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const evenement = {
          evenement: this.evenement,
          type: this.type,
          organisator: this.organisator,
          // locatie: this.getVenueNaam,
          locatie: this.locatie,
          datum: this.datum,
          startUur: this.startUur,
          eindUur: this.eindUur,
          status: this.status,
          beschrijving: this.beschrijving,
          idUiTdatabank: ''
        }

        this.addName(evenement)
        this.addStartDate(evenement)
        this.addEndDate(evenement)
        console.log('in popup method submit: de jsonld opgeslaan in store evenementToPost: ', this.getEvenementToPost)

        axios
          .post('/api/postEventAPI', this.getEvenementToPost) // hier een object evenement meegeven als body { evenement }
          .then(console.log('een respons'))
          .then((res) => {
            evenement.idUiTdatabank = res.data.id
            evenement.locatie = this.getVenueNaam
            console.log('voor de dispatch in het postevent')
            this.$store.dispatch('postEvent', evenement)
            console.log('na de dispatch in het postevent')
            // console.log(res.data.id)
            // console.log(evenement)
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
          .finally(() => console.log('post met axios in PopUp is complete'))

        // hoe de id van firebase ophalen !! en id van UitDataBank opslaan in Firebase
        // fetch(`http://localhost:3000/api/postEventAPI/?id=${evenement.id}`) // via req.query.id in api index
        // fetch(`http://localhost:3000/api/postEventAPI/${evenement.id}`) // via req.params.id in api.index

        // this.$router.push({ name: 'Dashboard' })
      }
    },
    cancel () {
      this.dialog = false
      this.$refs.form.reset()
      this.$router.push({ name: 'Dashboard' })
    },
    ...mapMutations({
      addName: 'evenementToPost/addName',
      addStartDate: 'evenementToPost/addStartDate',
      addEndDate: 'evenementToPost/addEndDate'
    }),
    ...mapActions({
      postEvenementToUiTdatabank: 'evenementToPost/postEvenementToUiTdatabank' // deze actie wordt voorlopig niet gebruikt ....
    })
  }
}
</script>

<style>
</style>
