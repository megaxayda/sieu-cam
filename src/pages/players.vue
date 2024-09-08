<template>

  <v-toolbar density="compact" color="primary" style="position: sticky; top: 0; z-index: 1">
    <v-toolbar-title>Players</v-toolbar-title>
  </v-toolbar>

  <v-list lines="two">

    <v-list-item v-for="(item, i) in players" :key="i" :value="item" color="primary" variant="text" :title="item.name"
      :subtitle="`Win ${item.win} - Lose ${item.lose}`">
      <template v-slot:prepend>
        <v-avatar color="surface-variant">{{ item.name[0] }}</v-avatar>
      </template>
    </v-list-item>

    <v-list-item>
      <v-btn block color="primary" variant="flat">
        Add New Member
      </v-btn>
    </v-list-item>

  </v-list>

</template>

<script setup>
const players = [
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Tải',
    win: 23,
    lose: 1
  },
  {
    name: 'Sơn',
    win: 23,
    lose: 1
  },
]
</script>

<style scoped lang="scss"></style>
