<script setup lang="ts">

import UserButton from "~/components/UserButton.vue";

const users = ref([])

onMounted(async () => {
  users.value = await $fetch('api/users')
})

const filter = ref("")

const mode = ref("add")

const filteredUser = computed(() => {
  return users.value.filter(user =>
      user.name.toLowerCase().includes(filter.value.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }))
})

async function adjustPoints(user: any, delta: number) {
  if (user.points + delta < 0) {
    return
  }

  user.points += delta

  await $fetch(`/api/users/${user.id}`, {
    method: 'PATCH',
    body: { delta }
  })
}

function getCurrentTimeAsNumber() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `${hours}${minutes}`
}

const pin = ref([])

const registered = computed(() => pin.value.join("") === getCurrentTimeAsNumber())

</script>

<template>
  <div class="p-2">
    <component v-if="registered">
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
    </component>
    <component class="flex items-center justify-center min-h-screen px-4" v-else>
      <UPinInput length="4" v-model="pin"></UPinInput>
    </component>
  </div>
</template>