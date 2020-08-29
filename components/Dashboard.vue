<template>
  <div class="dashboard">
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
          <v-col cols="12" sm="3">
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
          <template v-slot:item.actions="{ item }">
            <v-chip
              text
              color="black"
              class="my-1"
              small
              router
              :to="{name:'EditEvenement', params:{id:item.id}}"
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
import db from '@/plugins/fb'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { nl } from 'date-fns/locale'
// import axios from "axios";
// import vuexProbeersel from "@/components/vuexProbeersel";

export default {
  name: 'Dashboard',
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
      // evenementen: []
    }
  }, // vuexProbeersel
  computed: {
    evenementen () {
      return this.$store.state.evenementen // return this.$store.dispatch("bindEvenementen");
    }
  },
  created () {
    this.$store.dispatch('bindEvenementen')
    // als ik wil werken met parameters:  this.$store.dispatch('evenementen', { id: this.$route.params.assetId });

    // VOORLOPIG LATEN STAAN VOOR DE CODE TE BEHOUDEN INDIEN NODIG!!!!!
    // db.collection('evenementen')
    //   .orderBy('evenement')
    //   .onSnapshot((snapShot) => {
    //     const changes = snapShot.docChanges()
    //     changes.forEach((change) => {
    //       // console.log(change.doc.data());
    //       if (change.type === 'added') {
    //         this.evenementen.push({
    //           ...change.doc.data(),
    //           id: change.doc.id
    //         })
    // console.log(
    //   `de toegevoegde id is: ${change.doc.id} de naam is ${
    //     change.doc.data().evenement
    //   }  en de lengte vd tabel is ${this.evenementen.length} id van ${
    //     this.evenementen[this.evenementen.length - 1].evenement
    //   } is ${this.evenementen.length - 1}`
    // );
    // } else if (change.type === "removed") {
    //   let Id = change.doc.id;
    //   this.evenementen = this.evenementen.filter((evenement) => {
    //     return evenement.id != Id;
    //   });
    // }
    //   })
    // })
  },
  methods: {
    deleteItem (id) {
      // console.log("het deleted item id is:  " + id);
      // hier deleten van het evenement in uitdatabank
      // axios
      //   .delete("https://jsonplaceholder.typicode.com/posts/1")
      //   .then((response) => {
      //     console.log(response.data);
      //     console.log(`delete met axios succesfull`);
      //   })
      //   .catch((error) => {
      //     console.log(`${error} delete met axios met errors`);
      //   })
      //   .finally(() => console.log("delete met axios complete"));
      //
      db.collection('evenementen')
        .doc(id)
        .delete()
        .then(() => {
          // zonder vuex maar met array evenementen in de data
          this.evenementen = this.evenementen.filter((evenement) => {
            return evenement.id !== id
          })
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
      this.dialog = false
    },
    formattedDate (dat) {
      return dat ? format(parseISO(dat), 'dd MMMM yyyy', { locale: nl }) : ''
    }
  },
  head () {
    return {
      title: 'InvoerApp van Wilfried'
      // meta: [
      //   { name: 'twitter:title', content: this.$store.state.evenementen }
      // ]
    }
  }
  // updated: function () {
  //   this.$nextTick(function () {});
  // },

  // GETTING DATA
  // db.collection('evenementen').get().then((snapshot) =>
  // {
  //   snapshot.forEach(doc =>{
  // hierin een functie die de data aan een array of zo toevoegd vb:
  // this.evenementen.push({...doc.data(), doc.id});
  //   });
  // }
  // );
  //
  // SAVING DATA
  // db.collection('evenementen').add(
  // { object with properties hierin}
  // );

  // querying data
  // db.collection('evenementen').where('organisator', '==', 'this.ingelogdeGebruiker').get().then((snapshot) =>
  // {
  //   snapshot.docs.forEach(doc =>{
  // hierin een functie die de data aan een array of zo toevoegd vb:
  // this.evenementen.push(doc.data);
  //   });
  // }
  // );

  // ordering data
  // // db.collection('evenementen').orderBy('organisator').get().then((snapshot) =>
  // {
  //   snapshot.docs.forEach(doc =>{
  // hierin een functie die de data aan een array of zo toevoegd vb:
  // this.evenementen.push(doc.data);
  //   });
  // }
  // );

  // updating
  // db.collection("evenementen").doc(index).update({
  //       evenement: this.evenement,
  //       //....
  //     });
  // setting: is volledig overschrijven van het object
  // gewoon set gebruiken ipv update
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
