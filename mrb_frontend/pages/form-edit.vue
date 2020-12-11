<template>
  <v-row justify="center">
    <v-col class="text-center">
      <v-form ref="form" lazy-validation>
        <v-select label="Pilih Ruang" :items="items" required></v-select>

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
              label="Pilih tanggal"
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

        <v-text-field label="Name" required></v-text-field>

        <v-text-field label="Email" required></v-text-field>

        <v-text-field label="Cost Center"></v-text-field>

        <v-btn color="success" class="mr-4">Save</v-btn>

        <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [
      'SGM Explor',
      'SGM Bunda',
      'Bebelac',
      'SGM Ananda',
      'SGM Soya',
      'Lactamil',
      'LLM',
      'Nutrilon Royal',
      'RWS',
      'Themis',
    ],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
  }),

  methods: {
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style type="css">
.col {
  max-width: 45%;
}
</style>
