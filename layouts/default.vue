<template>
  <v-app dark class="app-container">
    <NavBar />
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
.app-container{
        height: 100%;
        position: relative;
        display: grid;
        grid-template: auto 1fr auto / 1fr;
    }
    .app-content{
        min-height: 100vh;
        padding: 24px;
        display: grid;
        align-items: center;
        justify-items: center;
    }
</style>
