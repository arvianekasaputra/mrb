<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="6" md="4">
          <v-form ref="form" class="text-center formku1" lazy-validation>
            <h2 class="title has-text-centered">Login</h2>
            <v-text-field
              v-model="name"
              label="Name"
              required
              filled
              rounded
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              filled
              rounded
            ></v-text-field>
            <v-btn class="mr-4" @click="login"> Login </v-btn>
            <v-btn class="mr-4" @click="clear"> Clear </v-btn>
            <v-dialog v-model="regist" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mr-4"
                  dark
                  v-bind="attrs"
                  @click="regist"
                  v-on="on"
                >
                  Register
                </v-btn>
              </template>
              <v-card v-if="editedItem">
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.user"
                          label="User"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.password"
                          label="Password"
                          type="password"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.display_nm"
                          label="Display Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.cost_center"
                          label="Cost Center"
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
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'login',
  validations: {
    name: {},
    password: {},
  },

  data: () => ({
    name: '',
    password: '',
    regist: false,
    editedItem: {
      id_user: '',
      user: '',
      password: '',
      is_admin: '',
      display_nm: '',
      email: '',
      cost_center: '',
    },
  }),

  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { username: this.name, password: this.password },
        })
        if (response) {
          alert('Login sukses')
        }
      } catch (err) {
        alert('Login gagal')
      }
    },
    clear() {
      this.name = ''
      this.password = ''
    },
    regist() {},
    async save() {
      try {
        const apicreateusers = await this.$axios.post('/api/users', {
          id_user: this.editedItem.id_user,
          user: this.editedItem.user,
          password: this.editedItem.password,
          is_admin: this.editedItem.is_admin,
          display_nm: this.editedItem.display_nm,
          email: this.editedItem.email,
          cost_center: this.editedItem.cost_center,
        })
        // window.alert(apiupdatetransaksi.data.values)
        if (apicreateusers.data.status === 200) {
          this.close()
        } else {
          alert('Gagal mendaftarkan user')
        }
      } catch (error) {
        alert('Gagal mendaftarkan user')
      }
    },
    close() {
      this.regist = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>

<style>
.formku1 {
  width: 400px;
  margin-top: 35% !important;
}
</style>
