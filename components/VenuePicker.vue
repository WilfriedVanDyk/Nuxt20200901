<template>
  <v-card dark>
    <v-card-text>
      <v-autocomplete
        v-model="model"
        :items="venues"
        :loading="isLoading"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="Description"
        item-value="API"
        label="Bioscoop"
        placeholder="Start typing to Search"
        return-object
      />
      <span
        v-if="model"
      >Je selecteerde: <strong>{{ model }}</strong></span>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn v-show="model" @click="model = null">
        Verwijder selectie
        <v-icon color="accent" right>
          mdi-close-circle
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
/* eslint-disable no-console */
export default {
  data: () => ({
    descriptionLimit: 60,
    venues: [],
    isLoading: false,
    model: null,
    search: null
  }),
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
    probeersel () {
      this.$emmit('naamVanVenue', this.model)
    }

  }
}
</script>
