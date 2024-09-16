<template>
    <v-toolbar density="compact" color="primary">
        <v-btn icon @click="$router.go(-1)">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Match Detail</v-toolbar-title>
    </v-toolbar>

    <v-container class="d-flex flex-column ga-3">

        <p class="text-subtitle-1">{{ convertToLocalTime(data?.[0]?.created_at) }}</p>

        <p class="text-h5">Team 1</p>
        <p v-if="data?.[0]?.win_team === 1" class="text-green font-weight-bold">WIN</p>
        <p v-if="data?.[0]?.win_team === 2" class="text-red font-weight-bold">LOSE</p>
        <p>{{ data?.[0]?.player1?.name }}</p>
        <p>{{ data?.[0]?.player2?.name }}</p>

        <v-divider></v-divider>

        <p class="text-h5">Team 2</p>
        <p v-if="data?.[0]?.win_team === 2" class="text-green font-weight-bold">WIN</p>
        <p v-if="data?.[0]?.win_team === 1" class="text-red font-weight-bold">LOSE</p>
        <p>{{ data?.[0]?.player3?.name }}</p>
        <p>{{ data?.[0]?.player4?.name }}</p>

        <v-spacer></v-spacer>
        <v-btn v-if="!data?.[0]?.win_team" block text="Team 1 Win" variant="outlined" @click="onTeam1Win"></v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="!data?.[0]?.win_team" block text="Team 2 Win" variant="outlined" @click="onTeam2Win"></v-btn>
        <v-spacer></v-spacer>
        <v-btn block text="Delete" variant="elevated" color="error" @click="onDelete"></v-btn>

    </v-container>


</template>

<script setup>
import { convertToLocalTime } from '@/plugins/utils';
import { getMatchDetail, updatePlayer, getSession, updateMatch, deleteMatch } from '@/api';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import { ref } from 'vue';

const router = useRouter()
const queryClient = useQueryClient()

const { isPending, isError, data, error } = useQuery({
    queryKey: ['getMatchDetail', router.currentRoute._value.params.id],
    queryFn: async () => await getMatchDetail(router.currentRoute._value.params.id),
})

const mutation = useMutation({
    mutationFn: updateMatch,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['getMatches'] })
        queryClient.invalidateQueries({ queryKey: ['getMatchDetail', router.currentRoute._value.params.id] })
        router.push({ path: '/matches' })
    },
})

const deleteMutation = useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['getMatches'] })
        router.push({ path: '/matches', replace: true })
    },
})

const onTeam1Win = () => {
    mutation.mutate({ id: router.currentRoute._value.params.id, winTeam: 1, data: data?.value?.[0] })
}

const onTeam2Win = () => {
    mutation.mutate({ id: router.currentRoute._value.params.id, winTeam: 2, data: data?.value?.[0] })
}

const onDelete = () => {
    deleteMutation.mutate(router.currentRoute._value.params.id)
}
</script>

<style lang="css" scoped></style>