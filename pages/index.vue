<template>
  <v-main>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="teal">
      Evenement is verwijderd!
      <v-btn text color="white" class="ml-15" @click="snackbar=false">
        close
      </v-btn>
    </v-snackbar>
    <h1 class="subtitle-1 grey--text">
      VZW Fatima
    </h1>
    <span v-if="$nuxt.isOffline">Er is geen internet verbinding !!</span>
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
          <template v-slot:[`item.evenement`]="{ item }">
            <h3 :class="`${item.status} text--ligthen-1 grey--text`">
              {{ item.evenement }}
            </h3>
          </template>
          <template v-slot:[`item.datum`]="{ item }">
            <span>{{ new Date(item.datum).toLocaleString("nl-BE", {
              weekday: 'short',
              day: '2-digit',
              month: 'long',
              year: 'numeric' }) }}</span>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-chip small :class="`${item.status} white--text caption`">
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:expanded-item="{item }">
            <td :colspan="headers.length">
              {{ item.beschrijving }}
            </td>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
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
            <DialogBoxDelete :event="item" @eventDeleted="snackbar=true" />
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      dialog: false,
      snackbar: false,
      search: '',
      headers: [
        {
          text: 'Evenement',
          align: 'start',
          value: 'evenement',
          groupable: false
        },
        { text: 'Wat?', value: 'type' },
        { text: 'Organisator', value: 'organisator' },
        { text: 'Datum', value: 'datum', align: 'left', dataType: 'Date' },
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
        },
        { text: 'Locatie', value: 'locatie.name', align: 'center' },
        { text: 'Status', value: 'status' },
        { text: 'beschrijving', value: 'data-table-expand', groupable: false },
        { text: 'Acties', value: 'actions', sortable: false, groupable: false }
      ]
    }
  },
  computed: {
    ...mapState({
      evenementen: state => state.evenementen
    })
  },
  created () {
    this.$store.dispatch('bindEvenementen')
    if (this.$store.state.uiTdatabank.venues.length > 0) { return }
    this.$store.dispatch('uiTdatabank/getVenues')
  },
  methods: {
    EditEvenement (id) {
      this.$router.push({ path: `/EditEvenement/${id}` })
    }
  }
}
</script>

<style scoped>
.DRAFT {
  border-right: 4px solid orange;
}

.READY_FOR_VALIDATION {
  border-right: 4px solid lightgreen;
}
.APPROVED {
  border-right: 4px solid red;
}
.REJECTED {
  border-right: 4px solid grey;
}
.DELETED {
  border-right: 4px solid grey;
}

.v-chip.DRAFT {
  background: orange !important;
  width: 10em;
}

.v-chip.READY_FOR_VALIDATION {
  background: lightgreen !important;
  width: 10em;
}
.v-chip.APPROVED {
  background: red !important;
  width: 10em;
}
.v-chip.REJECTED {
  background: grey !important;
  width: 10em;
}
.v-chip.DELETED {
  background: grey !important;
  width: 10em;
}
</style>
