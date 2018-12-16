<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm2 md4 lg5>

      </v-flex>
      <v-flex xs12 sm8 md6 lg2>
        <h1>Login to chat</h1>
        <v-card>
          <v-card-text>
            <v-form v-model="isFormValid">
              <v-text-field
                label="Username"
                v-model="username"
                :rules="notEmpty"
                browser-autocomplete="username"
              />
              <v-text-field
                type="password"
                label="Password"
                v-model="password"
                :rules="notEmpty"
                browser-autocomplete="password"
              />
              <v-text-field
                v-if="isRegistration"
                label="First name"
                v-model="firstName"
                :rules="notEmpty"
                browser-autocomplete="first-name"
              />
              <v-text-field
                v-if="isRegistration"
                label="Last name"
                v-model="lastName"
                :rules="notEmpty"
                browser-autocomplete="last-name"
              />
              <v-btn type="button" @click="isRegistration = !isRegistration">{{registerButtonText}}</v-btn>
              <v-btn type="submit" @click.prevent="handleCredentials" :disabled="!isFormValid">{{loginButtonText}}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPanel',
  data () {
    return {
      isFormValid: false,
      isRegistration: false,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      notEmpty: [
        v => !!v || 'Field is required'
      ]
    }
  },
  methods: {
    ...mapActions(['login', 'register']),
    handleCredentials () {
      let user = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      }
      this.isRegistration ? this.register(user) : this.login(user)
    }
  },
  computed: {
    registerButtonText() {
      return this.isRegistration ? 'Back' : 'New account'
    },
    loginButtonText() {
      return this.isRegistration ? 'Register' : 'Login'
    }
  }
}
</script>

<style scoped>

</style>
