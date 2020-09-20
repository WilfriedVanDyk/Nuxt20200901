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
              v-model="eventprop.title"
              label="Naam Evenement"
              prepend-icon="title"
              required
            />
            <v-text-field
              v-model="eventprop.location"
              label="Locatie"
              prepend-icon="mdi-home"
              required
            />
            <v-text-field
              v-model="eventprop.price"
              label="Prijs in euro"
              prepend-icon="mdi-currency-eur"
              required
            />
            <v-text-field
              v-model="eventprop.description"
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
              <v-date-picker v-model="eventprop.startDate" locale="nl" />
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
    eventprop: {
      type: Object,
      default: null,
      required: true
    }
  },
  data () {
    return {
      datum: new Date(this.eventprop.startDate).toLocaleDateString()
      //   uitEvenement: this.uitEvenementObject
    }
  },
  computed: {
    formattedDate () {
      return this.eventprop.startDate
        ? format(parseISO(this.eventprop.startDate), 'do MMMM yyyy', { locale: nl })
        : ''
    }
  },
  methods: { }
}
</script>

<style>

</style>
