<template>
  <v-app dark class="app-container">
    <NavBar />
    <div class="app-content">
      <nuxt />
    </div>
    <v-footer app>
      VZW Fatima: Invoer applicatie
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar'
export default {
  components: { NavBar }
}
</script>
