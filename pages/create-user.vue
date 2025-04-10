<script setup lang="ts">

const success = ref(false)

const name = ref("")
const avatar = ref()

const inSubmit = ref(false);

async function onSubmit() {
  if (inSubmit.value) {
    return
  }

  inSubmit.value = true;
  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('avatar', avatar.value)

    await $fetch('api/users/create', {
      method: 'POST',
      body: formData
    })

    navigateTo("/")
  } catch (error) {
    alert('❌ Erreur lors de la création de votre compte')
  }

  inSubmit.value = false;
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div v-if="success">
      <h2 class="text-2xl font-bold text-center mb-4">Bien joué frère t'as réussi à te créer un compte, maintenant viens au bar pour voir ton gros crane sur le tableau des scores</h2>
    </div>
    <div v-else
          class="flex flex-col gap-4 rounded-xl p-6 w-full max-w-md"
    >
      <h2 class="text-2xl font-bold text-center mb-4">Créer un utilisateur</h2>

      <UInput
          v-model="name"
          type="text"
          placeholder="Nom"
          class="w-full"
      />

      <AvatarInput v-model="avatar"/>

      <UButton
          class="justify-center"
          @click="onSubmit"
      >Créer</UButton>
    </div>
  </div>
</template>

<style scoped>

</style>