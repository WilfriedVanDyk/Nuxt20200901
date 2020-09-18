<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          Evenemnent van UitDataBank
        </v-card-title>
        <v-card-text>
          <v-form ref="form" class="px-3">
            <v-text-field
              v-model="evenement"
              label="Naam Evenement"
              prepend-icon="title"
              required
              :rules="inputValidation"
            />
            <v-text-field
              v-model="type"
              label="Type Evenement"
              prepend-icon="event"
              required
              :rules="inputValidation"
            />
            <v-text-field
              v-model="organisator"
              label="Organisator"
              prepend-icon="people_alt"
              required
              :rules="inputValidation"
            />
            <v-text-field
              v-model="locatie"
              label="Locatie"
              prepend-icon="house"
              required
              :rules="inputValidation"
            />

            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="formattedDate"
                  prepend-icon="date_range"
                  label="Datum evenement"
                  v-bind="attrs"
                  :rules="inputValidation"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="datum" locale="nl" />
            </v-menu>
            <!-- voeg het begin uur en eind uur toe met time picker -->
            <!-- voeg het begin uur toe met time picker -->
            <v-row>
              <v-col cols="11" sm="5">
                <v-menu
                  ref="menu1"
                  v-model="timePicker1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="startUur"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startUur"
                      label="start uur"
                      prepend-icon="access_time"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-if="timePicker1"
                    v-model="startUur"
                    full-width
                    @click:minute="$refs.menu1.save(startUur)"
                  />
                </v-menu>
              </v-col>
              <v-spacer />

              <!-- voeg het eind uur toe met time picker -->
              <v-col cols="11" sm="5">
                <v-menu
                  ref="menu2"
                  v-model="timePicker2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="eindUur"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="eindUur"
                      label="eind uur"
                      prepend-icon="access_time"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-if="timePicker2"
                    v-model="eindUur"
                    full-width
                    @click:minute="$refs.menu2.save(eindUur)"
                  />
                </v-menu>
              </v-col>
            </v-row>
            <!-- einde begin uur en eind uur toevoegen met time picker -->

            <v-overflow-btn
              v-model="status"
              class="my-2 mx-2"
              prepend-icon="help"
              :items="statusArray"
              label="status ?"
            />

            <v-textarea
              v-model="beschrijving"
              label="Beschrijving evenement"
              prepend-icon="edit"
              :rules="inputValidation"
            />
            <v-btn :loading="loading" class="primary mx-2 mt-3" @click="submit">
              Voeg evenement toe
            </v-btn>
            <v-btn class="primary mx-2 mt-3" @click="cancel">
              cancel
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
