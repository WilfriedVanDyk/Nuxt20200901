<template>
  <v-main class="team">
    <h1 class="subtitle-1 grey--text">
      Team VZW Fatima
    </h1>
    <v-container fluid class="my-5">
      <v-row>
        <v-col
          v-for="member in team"
          :key="member.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="text-center ma-3">
            <v-avatar size="100" class="grey lighten-1">
              <img :src="member.picture" :alt="member.name">
            </v-avatar>
            <v-card-text>
              <div class="subtitle-1">
                {{ member.name }}
              </div>
              <div class="grey--text">
                {{ member.role }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>
                  message
                </v-icon>
                <span>message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import image4 from '~/assets/pictures/Jelke.jpg'
import image3 from '~/assets/pictures/Bram.jpg'
import image2 from '~/assets/pictures/Corneel.jpg'
import image1 from '~/assets/pictures/VanDykWilfried.jpg'

export default {
  name: 'Team',
  components: {},
  data () {
    return {
      team: [
        {
          name: 'Wilfried',
          role: 'Secretaris',
          picture: image1
        },

        {
          name: 'Corneel',
          role: 'Voorzitter',
          picture: image2
        },

        {
          name: 'Bram',
          role: 'Techniek',
          picture: image3
        },

        {
          name: 'Jelke',
          role: 'Promotie',
          picture: image4
        }
      ]
    }
  },
  head: {
    title: 'Jouw team'
  }
}
</script>
