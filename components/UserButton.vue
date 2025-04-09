<script setup lang="ts">

const props = defineProps<{ user: User }>()

defineEmits(['add', 'remove'])

</script>

<template>
  <div class="relative rounded-md overflow-clip">
      <img class="aspect-square object-cover brightness-50" :src="useStorageFile(user)" alt="User avatar">
    <div class="font-bold text-white text-xl items-center flex flex-col gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <span>{{ user.name }}</span>
      <span class="text-center">{{ user.points }} tickets</span>
    </div>
    <div @click="$emit('remove')" class="absolute bg-gradient-to-r from-red-500 opacity-20 w-5/12 left-0 top-0 h-full"/>
    <div @click="$emit('add')" class="absolute bg-gradient-to-l from-green-500 opacity-20 w-5/12 right-0 top-0 h-full"/>
  </div>
</template>
<style scoped>

</style>