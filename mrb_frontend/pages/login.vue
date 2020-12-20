<template>
  <v-row justify="center">
    <form class="text-center formku1">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="password" label="Password" required></v-text-field>
      <v-btn class="mr-4" @click="login"> Login </v-btn>
      <v-btn @click="clear"> Clear </v-btn>
    </form>
  </v-row>
</template>

<script>
export default {
  validations: {
    name: {},
    password: {},
  },

  data: () => ({
    name: '',
    password: '',
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
  },
}
</script>

<style>
.formku1 {
  width: 400px;
}
</style>
