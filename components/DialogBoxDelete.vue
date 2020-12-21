<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <template v-slot:activator="{ on, attrs }">
          <v-chip color="black" class="my-1" small v-bind="attrs" v-on="on">
            <span>verwijderen</span>
            <v-icon right small>
              mdi-delete
            </v-icon>
          </v-chip>
        </template>

        <v-card>
          <v-card-title class="headline">
            verwijderen ?
          </v-card-title>

          <v-card-text>
            Ben je zeker dat je het evenement <strong>{{ event.evenement }}</strong>  wil verwijderen ?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              text
              color="teal"
              class="ml-15"
              @click="dialog = false"
            >
              annuleer
            </v-btn>

            <v-btn
              text
              color="teal"
              class="ml-15"
              @click="deleteItem (event.id, event.idUiTdatabank)"
            >
              verwijder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DialogBox',
  props: {
    event: {
      type: Object,
      default: null,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {

  },
  methods: {
    deleteItem (id, idUiTdatabank) {
      this.$store.dispatch('uiTdatabank/deleteEventUiTdb', idUiTdatabank)
        .then(
          this.$store.dispatch('deleteEvent', id)
        )
        .then(this.$emit('eventDeleted'))
        .catch((error) => {
          this.$nuxt.error({ statusCode: error.code, message: error.message })
        })
        .finally(() => {
          this.dialog = false
          this.$router.push({ name: 'index' })
        }
        )
    }
  }
}
</script>

<style>

</style>
