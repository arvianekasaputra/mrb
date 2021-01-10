<template>
  <v-card>
    <v-card-title> </v-card-title>
    <v-data-table
      :headers="headers"
      :items="(transaksi, untukTanggal)"
      :search="search"
      sort-by="tgl"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mr. Booking</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Booking Ruangan
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="tgl"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.tgl"
                            label="Pilih Tanggal"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.tgl"
                          :min="currentDate"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(tgl)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.id_ruang"
                        label="Pilih Ruang"
                        :items="ruang"
                        item-text="nm_ruang"
                        item-value="id_ruang"
                        required
                        >}</v-select
                      >
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.activity"
                        label="Aktivitas"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.id_snack"
                        label="Pilih Snack"
                        :items="snack"
                        item-text="nm_snack"
                        item-value="id_snack"
                        required
                        >}</v-select
                      >
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.additional"
                        label="Keterangan"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    tangal: new Date().toISOString().substr(0, 10),
    menu: false,
    tgl: '',
    search: '',
    headers: [
      { text: 'Tanggal', value: 'tgl' },
      { text: 'Ruang', value: 'nm_ruang' },
      { text: 'Pengguna', value: 'display_nm' },
      { text: 'Aktivitas', value: 'activity' },
      { text: 'Snack', value: 'nm_snack' },
      { text: 'Keterangan', value: 'additional' },
    ],
    transaksi: [],
    ruang: [],
    snack: [],
    editedIndex: -1,
    editedItem: {
      id_transaksi: '',
      tgl: '',
      id_ruang: '',
      nm_ruang: '',
      display_nm: '',
      activity: '',
      id_snack: '',
      nm_snack: '',
      additional: '',
    },
    defaultItem: {
      id_transaksi: '',
      tgl: '',
      id_ruang: '',
      nm_ruang: '',
      display_nm: '',
      activity: '',
      id_snack: '',
      nm_snack: '',
      additional: '',
    },
  }),

  computed: {
    untukTanggal() {
      let i = 1
      return this.transaksi.map((v) => {
        v.tgl = this.$dateFns.format(new Date(v.tgl || null), 'yyyy-MM-dd')
        v.nomor = i++
        return v
      })
    },
    currentDate() {
      const date = new Date()
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return date.getFullYear() + '-' + month + '-' + date.getDate()
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async mounted() {
    const apiruang = await this.$axios.get('/api/ruang')
    this.ruang = apiruang.data.values

    const apisnack = await this.$axios.get('/api/snack')
    this.snack = apisnack.data.values

    this.loadTransaksi()
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.transaksi = [
        {
          id_transaksi: '',
          tgl: '',
          display_nm: '',
          activity: '',
          additional: '',
        },
      ]
      this.ruang = [{ nm_ruang: '' }]
      this.snack = [{ nm_snack: '' }]
    },

    async loadTransaksi() {
      const apitransaksi = await this.$axios.get('/api/transaksiuser')
      this.transaksi = apitransaksi.data.values
    },

    editItem(item) {
      this.editedIndex = this.transaksi.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.transaksi.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const apideletetransaksi = await this.$axios.post('/api/transaksiuser', {
        id_transaksi: this.editedItem.id_transaksi,
      })
      window.alert(apideletetransaksi.data.values)
      if (apideletetransaksi.data.status === 200) {
        this.loadTransaksi()
        this.closeDelete()
      }
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.transaksi[this.editedIndex], this.editedItem)
        const apiupdatetransaksi = await this.$axios.put('/api/transaksi', {
          tgl: this.editedItem.tgl,
          id_ruang: this.editedItem.id_ruang,
          id_user: this.$auth.user.id_user,
          activity: this.editedItem.activity,
          id_snack: this.editedItem.id_snack,
          additional: this.editedItem.additional,
          id_transaksi: this.editedItem.id_transaksi,
        })
        // window.alert(apiupdatetransaksi.data.values)
        if (apiupdatetransaksi.data.status === 200) {
          this.loadTransaksi()
          this.close()
        }
      } else {
        const apicreatetransaksi = await this.$axios.post('/api/transaksi', {
          tgl: this.editedItem.tgl,
          id_ruang: this.editedItem.id_ruang,
          id_user: this.$auth.user.id_user,
          activity: this.editedItem.activity,
          id_snack: this.editedItem.id_snack,
          additional: this.editedItem.additional,
          id_transaksi: this.editedItem.id_transaksi,
        })
        if (apicreatetransaksi.data.status === 200) {
          this.loadTransaksi()
          this.close()
        }
      }
    },
  },
}
</script>
