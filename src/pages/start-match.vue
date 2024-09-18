<template>
  <v-toolbar density="compact" color="primary">
    <v-btn icon @click="$router.go(-1)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>Start Match</v-toolbar-title>
  </v-toolbar>

  <v-container class="d-flex flex-column ga-3">

    <p class="text-h5">Team 1</p>
    <v-autocomplete label="Player 1" v-model="player1" variant="outlined" :items="players1"
      :item-title="(item) => item.name" :item-value="(item) => item.id" />
    <v-autocomplete label="Player 2" v-model="player2" variant="outlined" :items="players2"
      :item-title="(item) => item.name" :item-value="(item) => item.id" />

    <p class="text-h5">Team 2</p>
    <v-autocomplete label="Player 3" v-model="player3" variant="outlined" :items="players3"
      :item-title="(item) => item.name" :item-value="(item) => item.id" />
    <v-autocomplete label="Player 4" v-model="player4" variant="outlined" :items="players4"
      :item-title="(item) => item.name" :item-value="(item) => item.id" />

    <!-- <v-btn block text="Team 1 Win" variant="outlined" @click="onStart"></v-btn> -->
    <!-- <v-btn block text="Team 2 Win" variant="outlined" @click="onStart"></v-btn> -->
    <v-spacer></v-spacer>
    <v-btn block color="primary" text="Start" variant="flat"
      :disabled="!player1 || !player2 || !player3 || !player4 || !mutation.isPending" @click="onCreate"></v-btn>
  </v-container>

</template>

<script setup>
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import { createMatch, getPlayers } from '@/api';
import { watch, watchEffect } from 'vue';

const router = useRouter()
const queryClient = useQueryClient()

const player1 = ref();
const player2 = ref();
const player3 = ref();
const player4 = ref();
const players1 = ref([]);
const players2 = ref([]);
const players3 = ref([]);
const players4 = ref([]);

const { isPending, isError, data: players, error } = useQuery({
  queryKey: ['getPlayers'],
  queryFn: getPlayers,
})

watchEffect(() => {
  if (players.value) {
    players1.value = players?.value
    players2.value = players?.value
    players3.value = players?.value
    players4.value = players?.value
  }
});



watch(player1, (newValue, oldValue) => {
  players2.value = players.value?.filter(e => ![newValue, player3.value, player4.value].includes(e.id))
  players3.value = players.value?.filter(e => ![newValue, player2.value, player4.value].includes(e.id))
  players4.value = players.value?.filter(e => ![newValue, player2.value, player3.value].includes(e.id))
})
watch(player2, (newValue, oldValue) => {
  players1.value = players.value?.filter(e => ![newValue, player3.value, player4.value].includes(e.id))
  players3.value = players.value?.filter(e => ![newValue, player1.value, player4.value].includes(e.id))
  players4.value = players.value?.filter(e => ![newValue, player1.value, player3.value].includes(e.id))
})
watch(player3, (newValue, oldValue) => {
  players1.value = players.value?.filter(e => ![newValue, player2.value, player4.value].includes(e.id))
  players2.value = players.value?.filter(e => ![newValue, player1.value, player4.value].includes(e.id))
  players4.value = players.value?.filter(e => ![newValue, player1.value, player2.value].includes(e.id))
})
watch(player4, (newValue, oldValue) => {
  players1.value = players.value?.filter(e => ![newValue, player2.value, player3.value].includes(e.id))
  players2.value = players.value?.filter(e => ![newValue, player1.value, player3.value].includes(e.id))
  players3.value = players.value?.filter(e => ![newValue, player1.value, player2.value].includes(e.id))
})

const mutation = useMutation({
  mutationFn: createMatch,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['getMatches'] })
    router.push({ path: '/matches', replace: true })
  },
})

const onCreate = async () => {
  mutation.mutate({ player_1: player1.value, player_2: player2.value, player_3: player3.value, player_4: player4.value })
}

</script>

<style lang="css" scoped></style>