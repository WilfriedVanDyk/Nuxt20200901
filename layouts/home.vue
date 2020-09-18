<template>
  <v-app dark class="app-container" :style="{ 'background-image' : 'url(' + require('../assets/pictures/mensen.jpg') + ')'}">
    <p>message from customised layout page: home</p>
    <h1>this is the homepage of this app: needs to be devellopped further</h1>
    <NavBar />
    <div class="app-content">
      <v-card class="post-preview">
        <div class="post-thumbnail">
          <div class="post-content">
            <h1>Post title</h1>
            <p>preview text</p>
          </div>
        </div>
      </v-card>
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
.app-container {
background: #0a2742;
background-size: 100% 500px;
background-repeat: no-repeat;
}
</style>
