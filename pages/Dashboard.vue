<template>
  <div>
    <h1 class="subtitle-1 grey--text">
      Dashboard
    </h1>
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
            <span>{{ new Date(item.datum).toLocaleString("nl-BE", {
              weekday: 'short',
              day: '2-digit',
              month: 'long',
              year: 'numeric' }) }}</span>
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
            <v-chip color="black" class="my-1" small @click="deleteItem(item.id, item.idUiTdatabank)">
              <span>verwijderen</span>
              <v-icon right small>
                mdi-delete
              </v-icon>
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'
import { mapState } from 'vuex' // , mapActions

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
  },
  methods: {
    // ...mapActions({
    //   deleteItem: 'deleteEventUiTdb/deleteItem'
    // }),
    // deleteItem (id, idUiTdabank) {
    //   console.log('ids zijn:', id, idUiTdabank)
    //   if (window.confirm('Ben je zeker dat je het evenement wil verwijderen?')) {
    //     console.log('ole')
    //     this.deleteItem(id, idUiTdabank)
    //   }
    // },
    deleteItem (id, idUiTdatabank) {
      if (window.confirm('Ben je zeker dat je het evenement wil verwijderen?')) {
        axios
          .delete(`/api/deleteEventAPI/?idUiTdatabank=${idUiTdatabank}`)
          .catch((error) => {
            console.log(`${error} + delete met axios in dashboard  met errors`)
          })
          .finally(() => console.log('delete met axios in dashboard is complete'))
        this.$store.dispatch('deleteEvent', id)
      }
    },
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
