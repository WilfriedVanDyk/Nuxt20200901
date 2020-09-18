<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          Evenemnent van UitDataBank
        </v-card-title>
        <v-card-text>
          <v-form ref="form" class="px-3">
            <v-text-field
              v-model="propperke.title"
              label="Naam Evenement"
              prepend-icon="title"
              required
            />
            <v-text-field
              v-model="propperke.location"
              label="Locatie"
              prepend-icon="mdi-home"
              required
            />
            <v-text-field
              v-model="propperke.price"
              label="Prijs in euro"
              prepend-icon="mdi-currency-eur"
              required
            />
            <v-text-field
              v-model="propperke.description"
              label="beschrijving"
              prepend-icon="mdi-book-open"
              required
            />
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
              <v-date-picker v-model="propperke.startDate" locale="nl" />
            </v-menu>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'

// import axios from "axios";
export default {
  props: {
    propperke: {
    // uitEvenementObject: {
      type: Object,
      default: null,
      required: true
    }
  },
  data () {
    return {
      datum: new Date(this.propperke.startDate).toLocaleDateString()
      //   uitEvenement: this.uitEvenementObject

    //   timePicker1: false,
    //   timePicker2: false,
    //   dialog: false,
    //   evenement: '',
    //   type: '',
    //   organisator: '',
    //   locatie: '',
    //   datum: null,
    //   startUur: null,
    //   eindUur: null,
    //   status: '',
    //   beschrijving: '',
    //   inputValidation: [
    //     v => (v && v.length >= 3) || ' de minimum lengte is 3 karakters',
    //     v => (v && v.length <= 300) || ' de maximum lengte is 300 karakters'
    //   ],
    //   loading: false,
    //   statusArray: ['in voorbereiding', 'afgewerkt', 'gepasseerd']
    }
  },
  computed: {
    formattedDate () {
      return this.propperke.startDate
        ? format(parseISO(this.propperke.startDate), 'do MMMM yyyy', { locale: nl })
        : ''
    }
  },
  methods: {
    // cancel () {
    //   this.dialog = false
    //   this.$refs.form.reset()
    //   this.$router.push({ name: 'Dashboard' })
    // }
  }
}
</script>

<style>

</style>
