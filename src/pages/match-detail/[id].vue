<template>
    <v-toolbar density="compact" color="primary">
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Match Detail</v-toolbar-title>
    </v-toolbar>

    <v-container class="d-flex flex-column ga-3">

        <p class="text-subtitle-1">10:23, 8 September 2024</p>
        
        <p class="text-h5">Team 1</p>
        <p class="text-green font-weight-bold">WIN</p>
        <p>Tải</p>
        <p>Sơn</p>

        <p class="text-h5">Team 2</p>
        <p class="text-red font-weight-bold">LOSE</p>
        <p>Quang</p>
        <p>Thảo</p>


        <v-btn block text="Team 1 Win" variant="outlined" @click="onStart"></v-btn>
        <v-btn block text="Team 2 Win" variant="outlined" @click="onStart"></v-btn>

    </v-container>


</template>

<script setup>
const router = useRouter()

const onStart = () => {
    router.push({ path: '/matches', replace: true })
}
</script>

<style lang="css" scoped></style>