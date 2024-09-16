<template>
  <v-toolbar density="compact" color="primary" style="position: sticky; top: 0; z-index: 1">
    <v-toolbar-title>Matches</v-toolbar-title>
  </v-toolbar>




  <v-container class="d-flex flex-column">

    <v-btn v-if="session?.session" block class="mb-2" color="primary" text="Start new match" variant="flat"
      :to="'/start-match'"></v-btn>

    <span v-for="(page, i) in data?.pages" :key="i">
      <v-card v-for="(item, j) in page" :key="j" variant="outlined" class="my-2" :to="`match-detail/${item.id}`">
        <p class="text-subtitle-2 pa-1 text-center">{{ convertToLocalTime(item.created_at) }}</p>
        <div class="d-flex flex-row align-center pb-2 ">
          <div class="d-flex flex-column text-center" style="width: calc(100% / 3);">
            <p>{{ item?.player1?.name }}</p>
            <p>{{ item?.player2?.name }}</p>
            <p v-if="item?.win_team === 1" class="text-green font-weight-bold">WIN</p>
            <p v-if="item?.win_team === 2" class="text-red font-weight-bold">LOSE</p>
          </div>
          <p class="text-h4 text-grey text-center" style="width: calc(100% / 3);">VS</p>
          <div class="d-flex flex-column text-center" style="width: calc(100% / 3);">
            <p>{{ item?.player3?.name }}</p>
            <p>{{ item?.player4?.name }}</p>
            <p v-if="item?.win_team === 2" class="text-green font-weight-bold">WIN</p>
            <p v-if="item?.win_team === 1" class="text-red font-weight-bold">LOSE</p>
          </div>
        </div>
        <v-progress-linear v-if="!item?.win_team" color="green" height="10" model-value="100"
          striped></v-progress-linear>
      </v-card>

    </span>

    <v-progress-circular indeterminate class="mx-auto" v-if="isFetching"></v-progress-circular>


  </v-container>


</template>

<script setup>
import { getPlayers, getMatches, getSession } from '@/api';
import { useQueryClient, useQuery, useMutation, useInfiniteQuery } from '@tanstack/vue-query'
import { convertToLocalTime } from '@/plugins/utils';

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError,
} = useInfiniteQuery({
  queryKey: ['getMatches'],
  queryFn: getMatches,
  initialPageParam: 0,
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    if (lastPage.length === 0) {
      return undefined
    }
    return lastPageParam + 10
  },
})

const handleScroll = () => {
  const element = document.documentElement || document.body
  const scrollPosition = element.scrollTop + element.clientHeight
  const totalHeight = element.scrollHeight

  if (scrollPosition >= totalHeight * 1) { // Trigger at 90% of the total height
    fetchNextPage()
  } else {
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const loadMoreData = () => {
  // Your function to load more data or perform actions when scrolled to bottom
  console.log('Reached the bottom, loading more data...')
}


const { data: session } = useQuery({
  queryKey: ['getSession'],
  queryFn: getSession,
})

</script>

<style lang="css" scoped></style>