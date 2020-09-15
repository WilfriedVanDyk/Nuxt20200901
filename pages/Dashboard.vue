<template>
  <div>
    <!-- <vuexProbeersel></vuexProbeersel> -->

    <h1 class="subtitle-1 grey--text">
      Dashboard
    </h1>
    <!-- de tabel start hier-->
    <v-container fluid class="my-5 grey lighten-4">
      <v-card>
        <v-card-title>
          Evenementen
          <v-spacer />
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="zoeken..."
              single-line
              hide-details
            />
          </v-col>
        </v-card-title>
        <br>
        <v-data-table
          :headers="headers"
          :items="evenementen"
          :items-per-page="10"
          :search="search"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
          item-key="id"
          group-by="organisator"
          class="elevation-1"
          show-group-by
          show-expand
        >
          <template v-slot:item.evenement="{ item }">
            <h3 :class="`${item.status} text--ligthen-1 grey--text`">
              {{ item.evenement }}
            </h3>
          </template>
          <template v-slot:item.datum="{ item }">
            {{ formattedDate(item.datum) }}
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip small :class="`${item.status} white--text caption`">
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:expanded-item="{item }">
            <td :colspan="headers.length">
              {{ item.beschrijving }}
            </td>
          </template>
          <!-- item delete of update -->
          <!-- :to="{name:'EditEvenement', params:{id:item.id}}" -->
          <template v-slot:item.actions="{ item }">
            <v-chip
              text
              color="black"
              class="my-1"
              small
              @click="EditEvenement(item.id)"
            >
              <span>wijzigen</span>
              <v-icon right small>
                mdi-pencil
              </v-icon>
            </v-chip>
            <v-chip color="black" class="my-1" small @click="deleteItem(item.id)">
              <span>verwijderen</span>
              <v-icon right small>
                mdi-delete
              </v-icon>
            </v-chip>

            <!-- <v-chip text color="grey lighten-3" class="ma-1" small @click.stop="dialog = true">
              <span>verwijderen</span>
              <v-icon right small>mdi-delete</v-icon>
            </v-chip>

            <v-dialog v-model="dialog" persistent max-width="300px">
              <v-card>
                <v-card-title class="headline">Verwijderen ?</v-card-title>
                <v-card-text>Ben je zeker dat je dit evenement wil verwijderen ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey" text @click="dialog = false">Cancel</v-btn>
                  <v-btn color="grey" text @click="deleteItem(item.id)">Verwijderen</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>-->
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import db from '@/plugins/fb'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'
// import axios from 'axios'
// import vuexProbeersel from "@/components/vuexProbeersel";

export default {
  components: {},

  data () {
    return {
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Evenement',
          align: 'start',
          value: 'evenement',
          groupable: false
        },
        { text: 'Organisator', value: 'organisator' },
        { text: 'Datum', value: 'datum', align: 'left' },
        {
          text: 'Start uur',
          value: 'startUur',
          groupable: false,
          sortable: false,
          filterable: false,
          align: 'right'
        },
        {
          text: 'Eind uur',
          value: 'eindUur',
          groupable: false,
          sortable: false,
          filterable: false,
          align: 'left'
          // width: "100px"
        },
        { text: 'Locatie', value: 'locatie', align: 'center' },
        { text: 'Status', value: 'status' },
        { text: 'beschrijving', value: 'data-table-expand', groupable: false },
        { text: 'Acties', value: 'actions', sortable: false, groupable: false }
      ]
    }
  },
  computed: {
    evenementen () {
      return this.$store.state.evenementen // return this.$store.dispatch("bindEvenementen");
    }
  },
  created () {
    this.$store.dispatch('bindEvenementen')
    // als ik wil werken met parameters:  this.$store.dispatch('evenementen', { id: this.$route.params.assetId });
  },
  methods: {
    deleteItem (id) {
      // console.log("het deleted item id is:  " + id);
      // hier deleten van het evenement in uitdatabank via express
      if (window.confirm('Ben je zeker dat je het evenement wil verwijderen?')) {
        // remove via firebase
        this.$store.dispatch('deleteEvent', id)
      }
    },
    EditEvenement (id) {
      console.log(id)
      this.$router.push({ path: `/EditEvenement/${id}` })
    },
    formattedDate (dat) {
      return dat ? format(parseISO(dat), 'dd MMMM yyyy', { locale: nl }) : ''
    }
  }
}
</script>

<style scoped>
.voorbereiding {
  border-right: 4px solid orange;
}

.afgewerkt {
  border-right: 4px solid lightgreen;
}
.gepasseerd {
  border-right: 4px solid red;
}

.v-chip.voorbereiding {
  background: orange !important;
  width: 10em;
}

.v-chip.afgewerkt {
  background: lightgreen !important;
  width: 10em;
}
.v-chip.gepasseerd {
  background: red !important;
  width: 10em;
}
</style>
