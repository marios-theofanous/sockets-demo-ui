<template>
  <v-container>
    <v-layout>
      <div class="welcome-card">
        <v-card style="height: 100%;">
          <div style="padding-top: 44px; text-align: center;">Welcome to cloud chat!</div>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .welcome-card {
    margin-left: auto;
    margin-right: auto;
    width: 200px;
    height: 100px;
  }
</style>
