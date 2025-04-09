<script setup lang="ts">

import {useRealtimeUsers} from "~/composables/useRealtimeUsers";
import UserButton from "~/components/UserButton.vue";

const { users } = await useRealtimeUsers()

const filter = ref("")

const mode = ref("add")

const filteredUser = computed(() => {
  return users.value.filter(user =>
      user.name.toLowerCase().includes(filter.value.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }))
})

async function adjustPoints(user: any, delta: number) {
  await $fetch(`/api/users/${user.id}`, {
    method: 'PATCH',
    body: { delta }
  })
}

</script>

<template>
  <div class="p-2">
    <header class="mb-2">
      <UInput icon="i-lucide-search" size="md" class="w-full" type="text" v-model="filter" variant="outline" placeholder="Search..." />
    </header>
    <section class="grid grid-cols-2 gap-2">
      <component v-for="user in filteredUser"
                 :key="user.id">
        <UserButton
            :user="user"
            @add="adjustPoints(user, +1)"
            @remove="adjustPoints(user, -1)"/>
      </component>
    </section>
  </div>
</template>