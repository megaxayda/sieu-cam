<template>
  <v-toolbar density="compact" color="primary">
      <v-toolbar-title>User</v-toolbar-title>
  </v-toolbar>

  <v-container class="d-flex flex-column ga-3">

      <p class="text-h5">Login</p>
      

      
      
  </v-container>


</template>

<script setup>
const router = useRouter()

const onStart = () => {
  router.push({ path: '/matches', replace: true })
}
</script>

<style lang="css" scoped></style>