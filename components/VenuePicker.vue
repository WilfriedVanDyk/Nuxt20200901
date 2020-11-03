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
// attribute bij v-autocomplete kan zijn  @input="venueToStore" om de method venueToStore aan te spreken
/* eslint-disable no-console */
export default {
  props: {
    locatieprop: {
      type: String,
      default: null,
      required: false
    }
  },
  data: () => ({
    descriptionLimit: 60,
    venues: [],
    isLoading: false,
    // locatie: null,
    search: null
  }),
  computed: {
    locatie: {
      get () {
        return this.$store.state.evenement.evenementToPostFireBase.locatie
      },
      set (value) {
        console.log('VenuePicker locatie is:1 ', value)
        this.$store.commit('evenement/updateEvenementLocatie', value)
        // this.$store.dispatch('evenementToPost/findVenueId', value)
        this.$store.dispatch('evenement/findVenueId', value)
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
          console.log('in de api/venues search')
          const { totalItems, member } = res
          this.count = totalItems
          console.log('in de api/venues totaal aantal items : ' + this.count)
          this.venues = member.map(location => location.name.nl)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  methods: {
    // venueEmmit () {
    //   this.$emit('naamVanVenue', this.locatie)
    // },
    // venueToStore () {
    //   if (this.locatie !== undefined) {
    //     console.log('in de venueStore van de venuePicker: ', this.locatie)
    //     this.$store.dispatch('evenementToPost/findVenueId', this.locatie)
    //   }
    // }
  }
}
</script>
