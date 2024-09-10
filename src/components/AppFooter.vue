<template>
  <v-bottom-navigation class="position-fixed bottom-0" v-model="value" grow>
    <v-btn :to="'/players'">
      <v-icon>mdi-account-multiple</v-icon>
      Players
    </v-btn>

    <v-btn :to="'/matches'">
      <v-icon>mdi-badminton</v-icon>
      Matches
    </v-btn>

    <v-btn :to="'/report'">
      <v-icon>mdi-chart-line</v-icon>
      Report
    </v-btn>

    <v-btn :to="'/user'">
      <v-icon>mdi-account-circle</v-icon>
      User
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
const data = () => {
  return {
    value: 1
  }
}
</script>

<style scoped lang="sass">

</style>
