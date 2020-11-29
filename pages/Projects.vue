<template>
  <div class="projects">
    <div class="chip">
      <v-chip color="grey darken-2" class="my-5" large href="https://wilfriedvandyk.github.io/VZWFatima/">
        <span> Beklijk WidgetPagina van VZW Fatima</span>
        <v-icon right medium>
          event_note
        </v-icon>
      </v-chip>
    </div>
    <v-container class="my-5">
      <v-expansion-panels id="expan" popout multiple>
        <v-expansion-panel v-for="evenementItem in evenementen" :key="evenementItem.evenement" class="my-3">
          <v-expansion-panel-header>{{ evenementItem.evenement }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 py-1 grey--text">
                <div class="font-weight-bold">
                  Datum: {{ evenementItem.datum }}
                </div>

                <v-row>
                  <v-col
                    cols="12"
                  >
                    <div class="caption grey--text">
                      start uur:
                      <span class="white--text">{{ evenementItem.startUur }}</span>
                    </div>

                    <div class="caption grey--text">
                      eind uur:
                      <span class="white--text">{{ evenementItem.eindUur }}</span>
                    </div>

                    <div>{{ evenementItem.status }}</div>
                  </v-col>
                </v-row>

                <v-col cols="12">
                  {{ evenementItem.beschrijving }}
                </v-col>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Projects',
  computed: {
    evenementen () {
      let evenementen = this.$store.state.evenementen
      evenementen = evenementen.filter(evenement => evenement.organisator === 'VZW Fatima')
      return evenementen
    }
  }
}
</script>
<style scoped>
.chip {
  text-align: center;
}
</style>
