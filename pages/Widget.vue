<template>
  <div class="container">
    <h1>Evenementen pagina</h1>
    <div id="widget"></div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Widget page',
    script: [
      { hid: 'widgets', src: 'https://projectaanvraag-api.uitdatabank.be/widgets/layout/fae611103435362fb39420f91fc8b4e1.js' }
    ]
  }
}
</script>
