<template>
        <v-layout row align-center style="height: 90vh;">
              <!-- <v-flex xs12 md4 sm3  class="hidden-s-and-down"></v-flex> -->
              <v-spacer></v-spacer>
              <v-flex xs12 md4 sm6  >
                  <v-card class="pa-4  ozi-box">
                  <v-form v-model="valid">
                    <div class="text-xs-center">
                      <v-icon 
                        size="50px"
                        >edit</v-icon>
                    </div>
                        <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        :counter="10"
                        label="Логин"
                        required
                        ></v-text-field>
                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Пароль"
                        required
                        ></v-text-field>
                    </v-form>
                  <v-btn color="error">Вход</v-btn>
                </v-card>
              </v-flex>
              <v-spacer></v-spacer>
        </v-layout>
</template>
<script>
export default {
     data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }),
    layout: 'particle',
}
</script>
<style>
.ozi-box{
  border-radius: 10px;
  box-shadow: 11px 10px 16px 1px rgba(0, 0, 0, 0.16);
}
</style>