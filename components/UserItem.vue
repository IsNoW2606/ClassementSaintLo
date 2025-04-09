<script setup lang="ts">

const props = defineProps<{ rank: number, user: User }>()

</script>

<template>
  <div class="text-xl flex justify-between items-center rounded-sm text-white p-2" :class="[ rank % 2 === 0 ? 'bg-amber-950' : 'bg-emerald-600' ]">
    <div class="flex gap-2 items-center">
      <span>{{ rank }}.</span>
      <img class="aspect-square object-cover h-[48px]" :src="useStorageFile(user)" alt="User avatar">
      <h3>{{ user.name }}</h3>
    </div>
    <span>{{ user.points }} tickets</span>
  </div>
</template>

<style scoped>

</style>