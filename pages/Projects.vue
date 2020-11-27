<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">
      Mijn evenementen (after login, this page shows your organised events)
    </h1>
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
