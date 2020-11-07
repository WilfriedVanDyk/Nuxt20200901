<template>
  <div class="container">
    <h1>Evenementen pagina</h1>
    <!-- <script type="text/javascript" src="https://projectaanvraag-api.uitdatabank.be/widgets/layout/fae611103435362fb39420f91fc8b4e1.js"></script> -->
    <!-- <client-only> <script type="application/javascript" src="https://projectaanvraag-api.uitdatabank.be/widgets/layout/fae611103435362fb39420f91fc8b4e1.js"></script> </client-only> -->
    <div id="widget"></div>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
// import Dashboard from '~/components/Dashboard'
// import UitEvenement from '~/components/UitEvenement'
// import postscribe from 'postscribe'
export default {
  components: { },
  data () {
    return { }
  },
  // layout: 'home',
  // mounted () {
  //   if (process.browser) {
  //     postscribe('#widget', '<script type="application/javascript" src="https://projectaanvraag-api.uitdatabank.be/widgets/layout/fae611103435362fb39420f91fc8b4e1.js"><\/script>')
  //   }
  // },
  methods: { }
  // head () {
  //   return {
  //     title: 'InvoerApp van Wilfried'
  //     // meta: [
  //     //   { name: 'twitter:title', content: this.$store.state.evenementen }
  //     // ]
  //   }
  // }
}
</script>
<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  min-width: 200vh;
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
}
</style>
