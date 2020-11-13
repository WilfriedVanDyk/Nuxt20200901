<template>
  <!-- <v-app dark class="app-container" :style="{ 'background-image' : 'url(' + require('../assets/pictures/mensen.jpg') + ')'}"> -->
  <!-- <v-app dark class="app-container"> -->
  <!-- </v-app> -->
  <!-- <NavBar /> -->
  <!-- <div class="app-content"> -->
  <div class="cultuurnet-widgets">
    <h1>in de widget layout</h1>
    <!-- <v-app-bar text app>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" text color="grey" class="mx-10" v-on="on">
            <v-icon left>
              expand_more
            </v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(link,i) in links" :key="i" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey" small>
        <span>Sign Out</span>
        <v-icon right>
          exit_to_app
        </v-icon>
      </v-btn>
    </v-app-bar> -->
  <!-- <nuxt /> -->
  </div>
</template>

<script>
export default {
  // data: () => ({
  //   links: [
  //     { icon: 'event', text: 'Evenementen', route: '/' },
  //     { icon: 'dashboard', text: 'Dashboard', route: '/dashboard' },
  //     // { icon: 'folder', text: 'Mijn evenementen', route: '/projects' },
  //     { icon: 'person', text: 'Team', route: '/Team' }
  //   ]
  // }),
  head: {
    title: 'Widget page',
    script: [
      { hid: 'widgets', src: 'https://projectaanvraag-api.uitdatabank.be/widgets/layout/fae611103435362fb39420f91fc8b4e1.js', body: true }
    ]
  }
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
