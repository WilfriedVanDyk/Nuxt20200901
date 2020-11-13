<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">
      developement Team
    </h1>
    <v-container class="my-5">
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
  </div>
</template>

<script>
import image4 from '@/assets/pictures/Jelke.jpg'
import image3 from '@/assets/pictures/Bram.jpg'
import image2 from '@/assets/pictures/Corneel.jpg'

export default {
  name: 'Team',
  components: {},
  data () {
    return {
      team: [
        {
          name: 'Wilfried',
          role: 'Web developer',
          picture: '/_nuxt/assets/pictures/VanDykWilfried.jpg'
        },

        {
          name: 'Corneel',
          role: 'project leader',
          picture: image2
        },

        {
          name: 'Bram',
          role: 'Web zen master',
          picture: image3
        },

        {
          name: 'Jelke',
          role: 'Sales guru',
          picture: image4
        }
      ]
    }
  },
  methods: {
    getImgUrl (picture) {
      return require(picture)
    }
  }
}
</script>
