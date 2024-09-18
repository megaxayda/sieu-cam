<template>
  <v-toolbar density="compact" color="primary">
    <v-toolbar-title>Report</v-toolbar-title>
  </v-toolbar>

  <v-container>
    <v-text-field readonly variant="outlined" @click="dialog = true" append-inner-icon="mdi-calendar"
      placeholder="Select date" :value="formatDate(selectedDate)"></v-text-field>

    <v-dialog fullscreen v-model="dialog">
      <v-card>
        <v-card-title class="text-h5">
          Select Date
        </v-card-title>

        <v-card-text>
          <v-date-picker width="100%" color="primary" v-model="selectedDateTemp"></v-date-picker>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="onSave">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <v-list lines="two" class="pa-0">
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
const selectedDateTemp = ref()
const dialog = ref(false)
const queryKey = computed(() => ['getReportByDate', selectedDate.value]);

const { isFetching, isError, data, error, } = useQuery({
  queryKey,
  queryFn: ({ queryKey }) => {
    return getReportByDate(queryKey[1])
  },
  enabled: () => Boolean(selectedDate.value),
})

onMounted(() => {
  if (route.query.date) {
    selectedDate.value = new Date(route.query.date)
  }
});

watchEffect(() => {
  if (selectedDate.value) {
    router.push({ query: { date: selectedDate.value?.toISOString() } })
  }
});

const formatDate = (dateObj) => {
  if (!dateObj) return
  const date = new Date(dateObj);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const onSave = () => {
  selectedDate.value = selectedDateTemp.value
  dialog.value = false
}


</script>

<style lang="css" scoped></style>