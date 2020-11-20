<template>
  <v-card dark>
    <v-card-text>
      <h2
        v-if="locatieprop"
      >
        Je selecteerde: <strong>{{ locatieprop }}</strong>
      </h2>
      <span v-if="!locatie">selecteer een andere locatie indien nodig</span>
      <v-autocomplete
        v-model="locatie"
        :items="venues"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
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
      type: String,
      default: null,
      required: false
    }
  },
  data: () => ({
    // descriptionLimit: 60,
    venues: [],
    isLoading: false,
    search: null
  }),
  computed: {
    locatie: {
      get () {
        return this.$store.state.evenement.evenementToPostFireBase.locatie
      },
      set (value) {
        this.$store.commit('evenement/updateEvenementLocatie', value)
        this.$store.dispatch('evenement/findVenueId', value)
        this.$store.dispatch('evenementToPut/findVenueId', value)
      }
    }
  },
  watch: {
    search () {
      // Items have already been loaded
      if (this.venues.length > 0) { return }

      // Items have already been requested
      if (this.isLoading) { return }

      this.isLoading = true
      // Lazily load input items
      fetch('/api/venues')
        .then(res => res.json())
        .then((res) => {
          const { totalItems, member } = res
          this.count = totalItems
          this.venues = member.map(location => location.name.nl)
          // voor als ik veiliger de juiste locatie wil opzoeken
          // this.venues = member.map(location => {name: location.name.nl, id: location.id)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>
