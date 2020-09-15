<template>
  <div class="container" :style="{ 'background-image' : 'url(' + require('../assets/pictures/mensen.jpg') + ')'}">
    <h1>home page</h1>
    <ul>
      <li>
        <nuxt-link to="/EditEvenement/">
          EditEvenement
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/EditEvenement/2mc8wTTrp4ntNuUQxLPk">
          editeEvenment met id
        </nuxt-link>
      </li>
    </ul>
  <!-- <Dashboard /> -->
  </div>
</template>

<script>
// import Dashboard from '~/components/Dashboard'
export default {
  layout: 'home',
  components: {}, // {Dashboard }
  head () {
    return {
      title: 'InvoerApp van Wilfried'
      // meta: [
      //   { name: 'twitter:title', content: this.$store.state.evenementen }
      // ]
    }
  }
}
</script>
<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
