<template>

  <v-toolbar density="compact" color="primary" style="position: sticky; top: 0; z-index: 1">
    <v-toolbar-title>Players</v-toolbar-title>
  </v-toolbar>

  <div v-if="isPending">
    <v-skeleton-loader type="list-item-avatar-two-line"></v-skeleton-loader>
    <v-skeleton-loader type="list-item-avatar-two-line"></v-skeleton-loader>
    <v-skeleton-loader type="list-item-avatar-two-line"></v-skeleton-loader>
  </div>

  <v-list lines="two">
    <v-list-item v-for="(item, i) in data" :key="i" :value="item" color="primary" variant="text" :title="item.name"
      :subtitle="`Win ${item.win} - Lose ${item.lose}`" :to="`player-detail/${item.id}`">
      <template v-slot:prepend>
        <v-avatar color="surface-variant">{{ item.name[0] }}</v-avatar>
      </template>
    </v-list-item>

    <v-list-item v-if="session?.session">
      <v-btn block color="primary" variant="flat" to="/create-player">
        Add New Member
      </v-btn>
    </v-list-item>

  </v-list>

</template>

<script setup>
import { getPlayers, getSession } from '@/api';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'

const queryClient = useQueryClient()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['getPlayers'],
  queryFn: getPlayers,
})

const { data: session } = useQuery({
  queryKey: ['getSession'],
  queryFn: getSession,
})

</script>

<style scoped lang="scss"></style>
