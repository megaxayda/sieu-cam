<template>
    <v-toolbar density="compact" color="primary">
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Create New Player</v-toolbar-title>
    </v-toolbar>

    <v-container class="d-flex flex-column ga-3">

        <v-text-field label="Name" variant="outlined" v-model="name" name="name"></v-text-field>
        <v-btn block color="primary" text="Create" variant="flat" @click="onCreate"></v-btn>

    </v-container>
</template>

<script setup>
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import { createPlayer } from '@/api';

const router = useRouter()
const queryClient = useQueryClient()

const name = ref('');

const mutation = useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['getPlayers'] })
        router.push({ path: '/players', replace: true })
    },
})

const onCreate = async () => {
    mutation.mutate({ name: name.value })
}
</script>

<style lang="css" scoped></style>