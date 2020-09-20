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
      <li>
        <v-btn @click="getEventTESTUitDataBank">
          get Event TEST UitdataBank
        </v-btn>
      </li>
    </ul>
    <!-- <Dashboard /> -->
    <!-- <UitEvenement v-show="uitEvenementObject" v-bind="uitEvenementObject" />/ -->
    <UitEvenement :eventprop="uitEvenementObject" />
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
      uitEvenementObject:
       {
         title: '',
         description: '',
         location: '',
         startDate: '',
         price: ''
       }
    }
  },
  methods: {
    getEventUitDataBank () {
      // console.log('button works')
      fetch('http://localhost:3000/api/offer/?id=3ddf6a0b-76f8-40a9-b7aa-848a09db32f0')
        .then(res => res.json())
        .then((res) => {
          console.log(res)
          const member = res.member
          this.uitEvenementObject.title = member[0].name.nl
          this.uitEvenementObject.description = member[0].description.nl
          this.uitEvenementObject.location = member[0].location.name.nl
          this.uitEvenementObject.startDate = member[0].startDate
          this.uitEvenementObject.price = member[0].priceInfo[0].price

          console.log(`titel : ${this.uitEvenementObject.title}`)
          console.log(`description : ${this.uitEvenementObject.description}`)
          console.log(`location : ${this.uitEvenementObject.startDate}`)
          console.log(`startDate : ${this.uitEvenementObject.prijs}`)
          console.log(`prijs : ${this.uitEvenementObject.location}`)
        })
    },
    getEventTESTUitDataBank () {
      fetch('http://localhost:3000/api/getEventUitDataBank/?id=687ae349-8a64-4d54-b1a4-d86151adb7ce')
        .then(res => res.json())
        .then((res) => {
          console.log('in de index pagina met test')
          // console.log(res)
          console.log(res.description.nl)
          // const member = res.member
          // this.uitEvenementObject.title = member[0].name.nl
          // this.uitEvenementObject.description = member[0].description.nl
          // this.uitEvenementObject.location = member[0].location.name.nl
          // this.uitEvenementObject.startDate = member[0].startDate
          // this.uitEvenementObject.price = member[0].priceInfo[0].price

          // console.log(`titel : ${this.uitEvenementObject.title}`)
          // console.log(`description : ${this.uitEvenementObject.description}`)
          // console.log(`location : ${this.uitEvenementObject.startDate}`)
          // console.log(`startDate : ${this.uitEvenementObject.prijs}`)
          // console.log(`prijs : ${this.uitEvenementObject.location}`)
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
  min-width: 200vh;
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
}
</style>
