<template>
  <v-card dark>
    <v-card-text>
      <v-autocomplete
        v-model="locatie"
        :items="this.$store.state.uiTdatabank.venues"
        color="white"
        hide-no-data
        hide-selected
        item-text="name"
        label="Locatie ?"
        placeholder="Start met typen om te zoeken"
        prepend-icon="mdi-theater"
        return-object
        :rules="[locationRules]"
      />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    locatie: {
      get () {
        if (!this.$route.params.id) {
          return this.$store.state.evenement.evenementToPostFireBase.locatie
        } else { return this.$store.state.evenementToPut.venue }
      },
      set (value) {
        if (value) {
          this.$store.commit('evenement/updateEvenementLocatie', value)
          this.$store.commit('evenementToPut/addChangedVenue', value)
        }
      }
    }
  },
  methods: {
    locationRules (v) {
      if (v) {
        const result = this.$store.state.uiTdatabank.venues.findIndex(item => item.id === v.id)
        return result >= 0
      } else {
        // eslint-disable-next-line no-console
        console.log('else waarde', v)
        return 'selecteer een locatie uit de lijst'
      }
    }
  }
}
</script>
