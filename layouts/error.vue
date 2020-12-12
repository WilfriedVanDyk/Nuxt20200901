<template>
  <v-main dark>
    <h1 v-if="error.statusCode === 404">
      <div></div>
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      <div></div>
      <p> {{ error.message }}</p>
      <p> {{ otherError }}</p>
    </h1>
    <p>Terug naar de <a href="/"> HomePagina</a>!</p>
  </v-main>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 De pagina is niet gevonden',
      otherError: 'Er is een fout gebeurd'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
