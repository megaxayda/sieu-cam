<template>
  <v-toolbar density="compact" color="primary">
    <v-toolbar-title>Report</v-toolbar-title>
  </v-toolbar>

  <div class="d-flex flex-column mx-6 mt-4">
    <input type="date" v-model="selectedDate">
  </div>

  <v-list lines="two">
    <v-list-item v-for="(item, i) in data" :key="i" :value="item" color="primary" variant="text" :title="item.name"
      :subtitle="`Win ${item?.win} - Lose ${item?.lose}`" :to="`/player-detail/${item?.id}`"
      :disabled="!Boolean(item?.name?.[0])">
      <template v-slot:prepend>
        <v-avatar color="surface-variant">{{ item?.name?.[0] }}</v-avatar>
      </template>
    </v-list-item>

  </v-list>

  <v-progress-circular v-if="isFetching" class="d-block mx-auto" indeterminate></v-progress-circular>

</template>

<script setup>
import { getReportByDate } from '@/api';
import { useQuery } from '@tanstack/vue-query';
import { onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const selectedDate = ref()
const queryKey = computed(() => ['getReportByDate', selectedDate.value]);

const { isFetching, isError, data, error, } = useQuery({
  queryKey,
  queryFn: ({ queryKey }) => {
    console.log("Current value of query key:", queryKey[1]);
    return getReportByDate(queryKey[1])
  },
  enabled: () => Boolean(selectedDate.value),
})

// function addParam() {
//   const query = Object.assign({}, route.value.query, { newParam: 'newValue' })
//   router.push({ query })
// }

onMounted(() => {
  if (route.query.date) {
    selectedDate.value = route.query.date
  }
});

watchEffect(() => {
  if (selectedDate.value) {
    router.push({ query: { date: selectedDate.value } })
  }
});

</script>

<style lang="css" scoped></style>