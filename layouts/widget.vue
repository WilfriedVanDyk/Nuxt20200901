<template>
  <div>
    <h1>Widget</h1>
    <div class="cultuurnet-widgets"></div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Widget page',
    script: [
      { hid: 'widgets', src: 'https://projectaanvraag-api.uitdatabank.be/widgets/layout/fae611103435362fb39420f91fc8b4e1.js', body: true }
    ]
  }
}
</script>
