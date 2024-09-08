<template>
    <div >
    </div>
  </template>
  
  <script setup>
  // force navigate to /players
  const router = useRouter()
  router.replace({ path: '/players', replace: true })
  </script>
  