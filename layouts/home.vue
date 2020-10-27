<template>
  <v-app dark class="app-container" :style="{ 'background-image' : 'url(' + require('../assets/pictures/mensen.jpg') + ')'}">
    <!-- <v-app dark class="app-container"> -->
    <NavBar />
    <p>message from customised layout page: home</p>
    <h1>this is the homepage of this app: needs to be devellopped further</h1>
    <div class="app-content">
      <nuxt />
    </div>
  </v-app>
</template>

<script>
import NavBar from '~/components/NavBar'
export default {
  components: { NavBar }
}
</script>

<style scoped>
/* .app-content {
  margin-left: 256px;
} */
/* .app-container {
background: #0a2742;
background-size: 100% 500px;
background-repeat: no-repeat;
} */
</style>
