<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transaksi"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tangal: new Date().toISOString().substr(0, 10),
      dashboard: [],
      menu: false,
      search: '',
      transaksi: [
        {
          tgl: '',
          nm_ruang: '',
          display_nm: '',
          activity: '',
          nm_snack: '',
        },
      ],
      date: [],
      headers: [
        { text: 'Tanggal', value: 'tgl' },
        { text: 'Ruang', value: 'nm_ruang' },
        { text: 'Pengguna', value: 'display_nm' },
        { text: 'Aktivitas', value: 'activity' },
        { text: 'Snack', value: 'nm_snack' },
      ],
    }
  },
  async mounted() {
    const apitransaksi = await this.$axios.get('/api/transaksi')
    this.transaksi = apitransaksi.data.values
  },
}
</script>
