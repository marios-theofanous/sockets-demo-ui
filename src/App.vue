<template>
  <div>
    <v-toolbar>
      <v-icon class="pink--text">mdi-cloud</v-icon>
      <router-link class="v-toolbar__title cursor--pointer" to="/" tag="div">Cloud chat </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/chat">General Chat</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-toolbar-title></v-toolbar-title>
    <router-view/>
  </div>
</template>

<style lang="scss">
  .cursor--pointer {
    cursor: pointer;
  }
</style>
