<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <template v-for="(item, i) in items">
          <v-list-item
            v-if="$auth.user && item.admin.includes($auth.user.is_admin)"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="logout">
        {{ $auth.user ? $auth.user.display_nm : 'Belum Login!' }}
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <template>
          <nuxt />
        </template>
      </v-container> </v-main
  ></v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          admin: [0, 1],
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          admin: [0, 1],
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          admin: [0],
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/dashboard',
        },
        {
          admin: [1],
          icon: 'mdi-home',
          title: 'Dashboard-Adm',
          to: '/dashboard-adm',
        },
        {
          admin: [0, 1],
          icon: 'mdi-domain',
          title: 'Ruang',
          to: '/ruang',
        },
        {
          admin: [0, 1],
          icon: 'mdi-silverware-fork-knife',
          title: 'Snack',
          to: '/snack',
        },
        {
          admin: [0, 1],
          icon: 'mdi-flag',
          title: 'Rule',
          to: '/rule',
        },
        {
          admin: [0, 1],
          icon: 'mdi-help',
          title: 'About',
          to: '/about',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Meeting Room Booking',
    }
  },

  methods: {
    logout() {
      this.$auth
        .logout()
        .then(() => {
          alert('Logout success')
          this.$router.push('/login')
        })
        .catch(() => {
          alert('Logout failed, please try again.')
        })
    },
  },
}
</script>
