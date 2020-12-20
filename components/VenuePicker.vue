<template>
  <v-card dark>
    <v-card-text>
      <h2
        v-if="locatieprop"
      >
        Je selecteerde: <strong>{{ locatieprop.name }}</strong>
      </h2>
      <span v-if="!locatie">selecteer een andere locatie indien nodig</span>
      <v-autocomplete
        v-model="locatie"
        :items="this.$store.state.uiTdatabank.venues"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="name"
        item-value="API"
        label="Locatie ?"
        placeholder="Start typing to Search"
        prepend-icon="mdi-theater"
        return-object
      />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    locatieprop: {
      type: Object,
      default: null,
      required: false
    }
  },
  data: () => ({
    isLoading: false,
    search: null
  }),
  computed: {
    locatie: {
      get () {
        return this.$store.state.evenement.evenementToPostFireBase.locatie
      },
      set (value) {
        if (value) {
          this.$store.commit('evenement/updateEvenementLocatie', value)
          this.$store.commit('evenementToPut/addChangedVenue', value)
        }
      }
    }
  },
  watch: {
    search () {
      if (this.$store.state.uiTdatabank.venues.length > 0) { return }
      this.$store.dispatch('uiTdatabank/getVenues')
    }
  }
}
</script>
