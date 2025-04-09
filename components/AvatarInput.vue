<script setup lang="ts">

import {useBase64} from "@vueuse/core";

const inputId = useId();

const currentAvatarImage = ref<string | null>(null);

const model = defineModel()

async function onAvatarChange(files: any) {
  if (!files || files.length === 0) {
    currentAvatarImage.value = null;
    return;
  }
  const file = files[0];
  model.value = file
  const {execute} = useBase64(file);
  currentAvatarImage.value = await execute();
}

</script>

<template>
  <label :for="inputId" class="justify-center">
    <div
        class="relative flex items-center aspect-square justify-center overflow-hidden rounded-sm border-1 border-white border-opacity-50 bg-muted shadow-sm shadow-black/10"
    >
      <img
          v-if="currentAvatarImage"
          :src="currentAvatarImage"
          class="h-full w-full object-cover"
          alt="Profile image"
      />

      <div
          class="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"
          aria-label="Change profile picture"
      >
        <Icon name="ic:twotone-add-photo-alternate" class="size-4"/>
      </div>
    </div>
  </label>
  <div class="relative hidden">
    <input
        :id="inputId"
        type="file"
        :name="name"
        v-bind="$attrs"
        @change="
          onAvatarChange($event.target.files);
        "
    />
  </div>
</template>

<style scoped>

</style>