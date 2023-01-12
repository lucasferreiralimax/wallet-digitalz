<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <h1><v-icon class="icon" icon="mdi-wallet" />{{ title }}</h1>
</template>

<style scoped>
.icon {
  margin-right: .5rem;
}
</style>
