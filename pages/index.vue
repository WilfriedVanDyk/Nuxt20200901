<template>
  <div class="container">
    <h1>home page</h1>
    <ul>
      <li>
        <v-btn to="/EditEvenement/" nuxt>
          EditEvenement
        </v-btn>
      </li>
      <li>
        <v-btn to="/EditEvenement/UlWF5BGAaZzrsa3bGpvr" nuxt>
          EditEvenement met id
        </v-btn>
      </li>
      <li>
        <v-btn @click="getEventUitDataBank">
          get Event UitdataBank
        </v-btn>
      </li>
    </ul>
    <!-- <Dashboard /> -->
    <UitEvenement />
  </div>
</template>

<script>
/* eslint-disable no-console */
// import Dashboard from '~/components/Dashboard'
import UitEvenement from '~/components/UitEvenement'
export default {
  layout: 'home',
  components: { UitEvenement },
  data () {
    return {
      title: '',
      description: '',
      location: '',
      startDate: '',
      prijs: ''

    }
  },
  methods: {
    getEventUitDataBank () {
      console.log('button works')
      fetch('http://localhost:3000/api/offer/?id=3ddf6a0b-76f8-40a9-b7aa-848a09db32f0')
        .then(res => res.json())
        .then((res) => {
          console.log(res)
          const member = res.member
          this.title = member[0].name.nl
          this.description = member[0].description.nl
          this.startDate = member[0].startDate
          this.prijs = member[0].priceInfo[0].price
          this.location = member[0].location.name.nl

          console.log(`titel : ${this.title}`)
          console.log(`titel : ${this.description}`)
          console.log(`titel : ${this.startDate}`)
          console.log(`titel : ${this.prijs}`)
          console.log(`titel : ${this.location}`)
        })
    }
  } // {Dashboard }
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
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
