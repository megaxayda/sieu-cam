<template>
  <v-toolbar density="compact" color="primary">
    <v-toolbar-title>User</v-toolbar-title>
  </v-toolbar>

  <v-container class="d-flex flex-column ga-3">

    <div v-if="data && data.session">
      {{ data.session.user.email }}

      <v-btn block class="mt-4" color="error" text="Logout" variant="elevated" @click="mutationLogout.mutate()"></v-btn>
    </div>

    <div v-else>
      <p class="text-h5 mb-4">Login</p>

      <v-text-field v-model="email" label="Email" name="email" clearable variant="outlined"></v-text-field>

      <v-text-field v-model="password" label="Password" name="password" placeholder="Enter your password"
        variant="outlined" clearable></v-text-field>

      <v-btn :disabled="!email || !password" color="success" size="large" type="submit" variant="elevated" block
        @click="onSubmit">
        Sign In
      </v-btn>
    </div>
  </v-container>


</template>

<script setup>
import { getSession, signIn, signOut } from '@/api';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'

const queryClient = useQueryClient()

const email = ref('')
const password = ref('')

const { isPending, isError, data, error } = useQuery({
  queryKey: ['getSession'],
  queryFn: getSession,
})

const mutation = useMutation({
  mutationFn: signIn,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['getSession'] })
  },
})

const mutationLogout = useMutation({
  mutationFn: signOut,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['getSession'] })
  },
})

const onSubmit = async () => {
  mutation.mutate({ email: email.value, password: password.value })
}
</script>

<style lang="css" scoped></style>