<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in ruang"
        :key="item.id_ruang"
        cols="sm"
        class="text-center"
        ><v-card class="pa-3" height="200">{{ item.nm_ruang }}</v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ruang: [],
    }
  },
  computed: {
    cols() {
      const { lg, sm } = this.$vuetify.breakpoint
      return lg ? [3, 9] : sm ? [9, 3] : [6, 6]
    },
  },
  async mounted() {
    const apiruang = await this.$axios.get('/api/ruang')
    this.ruang = apiruang.data.values
  },
}
</script>
