<template>

  <v-toolbar density="compact" color="primary" style="position: sticky; top: 0; z-index: 1">
    <v-btn icon @click="$router.go(-1)">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>Player detail</v-toolbar-title>
  </v-toolbar>


  <v-sheet v-if="data" class="pa-4 d-flex flex-column ga-3 align-center">
    <v-avatar color="surface-variant">{{ data[0].name[0] }}</v-avatar>
    <p><span class="text-green">Win {{ data[0].win }}</span> - <span class="text-red">Lose {{ data[0].lose }}</span>
    </p>
    <v-text-field label="Name" variant="outlined" v-model="name" class="w-100" name="name"
      :readonly="!session?.session"></v-text-field>

    <v-btn block="" v-if="session?.session" variant="outlined" color="secondary" :disabled="!mutation.isPending"
      @click="onSave">Save</v-btn>
    <v-spacer></v-spacer>
    <v-btn block v-if="session?.session" variant="elevated" color="error" :disabled="!deleteMutation.isPending"
      @click="onDelete">Delete</v-btn>


    <v-snackbar v-model="snackbar" timeout="2000" variant="elevated" color="success">
      Saved
    </v-snackbar>
  </v-sheet>


</template>

<script setup>

import { getPlayerDetail, updatePlayer, deletePlayer, getSession } from '@/api';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import { ref } from 'vue';

const queryClient = useQueryClient()
const route = useRouter()

const name = ref('')
const snackbar = ref(false)

const { isPending, isError, data, error } = useQuery({
  queryKey: ['getPlayerDetail', route.currentRoute._value.params.id],
  queryFn: async () => await getPlayerDetail(route.currentRoute._value.params.id),
})

watchEffect(() => {
  if (data?.value?.[0]?.name) {
    name.value = data?.value?.[0]?.name;
  }
});

const mutation = useMutation({
  mutationFn: updatePlayer,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['getPlayers'] })
    queryClient.invalidateQueries({ queryKey: ['getPlayerDetail', route.currentRoute._value.params.id] })
    snackbar.value = true
    route.push({ path: '/players' })
  },
})

const deleteMutation = useMutation({
  mutationFn: deletePlayer,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['getPlayers'] })
    route.push({ path: '/players', replace: true })
  },
})

const onSave = () => {
  mutation.mutate({ id: route.currentRoute._value.params.id, name: name.value })
}

const onDelete = () => {
  deleteMutation.mutate(route.currentRoute._value.params.id)
}

const { data: session } = useQuery({
  queryKey: ['getSession'],
  queryFn: getSession,
})

</script>

<style scoped lang="scss"></style>
