<template>
  <v-toolbar density="compact" color="primary" style="position: sticky; top: 0; z-index: 1">
    <v-toolbar-title>Matches</v-toolbar-title>
  </v-toolbar>

  <v-container class="d-flex flex-column ga-2">
    <v-btn block="" color="primary" text="Start new match" variant="flat" :to="'/start-match'"></v-btn>
  

    <v-spacer></v-spacer>

    <v-card variant="outlined" :subtitle="'8 September 2024'">
      <div class="d-flex flex-row justify-space-around align-center pb-2">
        <div class="d-flex flex-column">
          <p>Tải</p>
          <p>Sơn</p>
          <p class="text-green font-weight-bold">WIN</p>
        </div>
        <p class="text-h4 text-grey">VS</p>
        <div class="d-flex flex-column">
          <p>Thảo</p>
          <p>Quang</p>
          <p class="text-red font-weight-bold">LOSE</p>
        </div>

      </div>

    </v-card>

    <v-card variant="outlined" :subtitle="'10:23, 8 September 2024'" to="/match-detail/1">
      <div class="d-flex flex-row justify-space-around align-center pb-2">
        <div class="d-flex flex-column">
          <p>Tải</p>
          <p>Sơn</p>
        </div>
        <p class="text-h4 text-grey">VS</p>
        <div class="d-flex flex-column">
          <p>Thảo</p>
          <p>Quang</p>
        </div>

      </div>
      <v-progress-linear color="red" height="20" model-value="100" striped></v-progress-linear>

    </v-card>


  </v-container>


</template>

<script setup>
//
</script>

<style lang="css" scoped>

</style>