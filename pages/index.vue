<script setup lang="ts">

import {useRealtimeUsers} from "~/composables/useRealtimeUsers";

const { users } = await useRealtimeUsers()

</script>

<template>
  <div class="p-4 flex flex-col items-center h-screen overflow-clip">
  <section class="flex flex-col gap-2  max-w-screen-lg w-full">
    <h1 class="mb-2">Classement actuel</h1>
    <TransitionGroup tag="div" name="fade" v-for="(user, rank) in users"
               :key="user.id">
      <UserItem
        :rank="rank + 1"
        :user="user"
      />
    </TransitionGroup>
  </section>
  </div>
</template>

<style scoped>

.fade-move {
  transition: transform 0.6s ease;
}
</style>