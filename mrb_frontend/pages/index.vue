<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <!-- <logo /> -->
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Selamat datang di Meeting Room Booking (MRB)
        </v-card-title>
        <v-card-text>
          <p>
            Meeting Room Booking (MRB) merupakan sebuah aplikasi yang digunakan
            untuk mencatat dan memproses aktivitas pesan ruang yang ada di PT
            Sarihusada Yogyakarta
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; Arvian Saputra</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    // Logo,
    VuetifyLogo,
  },
}
</script>
