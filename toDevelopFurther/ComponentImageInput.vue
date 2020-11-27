<template>
  <div
    v-cloak
    class="image__drop"
    @drop.prevent="addDropFile"
    @dragover.prevent
  >
    <v-file-input
      v-model="file"
      accept="image/*"
      prepend-icon="mdi-camera"
      placeholder="Voeg afbeelding toe"
      show-size
    />
  </div>
</template>

<script>

export default {
  name: 'ImageInput',
  data () {
    return {
      droppedFile: null
    }
  },
  computed: {
    file: {
      get () {
        return this.$store.state.evenement.image
      },
      set (value) {
        this.$store.dispatch('imageUpload/AddImageId', value)
      }
    }
  },
  methods: {
    addDropFile (e) {
      alert('Ok! It looks like you dropped something! this is still in development. try selecting an image!!')
      this.file = e.dataTransfer.items[0]
    }
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.image__drop {
  width: 50%;
  border: 1px dashed #fff;
  padding: 50px;
  border-radius: 20px;
}
</style>
