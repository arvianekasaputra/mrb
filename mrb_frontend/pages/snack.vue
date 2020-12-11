<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in snack"
        :key="item.id_snack"
        col-md-3
        class="text-center"
        ><v-card height="200">
          {{ item.nm_snack }}
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
    ],
    snack: [],
  }),
  async mounted() {
    const apisnack = await this.$axios.get('/api/snack')
    this.snack = apisnack.data.values
  },
}
</script>

<style>
.farid {
  height: 200px;
}
</style>
