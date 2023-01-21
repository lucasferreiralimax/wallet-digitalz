<script setup lang="ts">
defineProps<{
  title: string,
  value: string,
  type: string,
}>()

const typeColors: any = {
  investiment: 'info',
  expense: 'error',
  entry: 'success',
  liquid: 'warning',
}
</script>

<template>
  <v-card
    class="information d-flex flex-column text-uppercase pa-4 elevation-2"
    :class="type"
  >
    <span
      class="text-caption text-uppercase font-weight-bold"
      :class="[`text-${typeColors[type]}`]"
    >
      {{ title }}
    </span>
    <b class="mr-2">{{ value }}</b>
  </v-card>
</template>

<style>
.information.investiment {
  border-top: 4px solid rgba(var(--v-theme-info));
}
.information.expense {
  border-top: 4px solid rgba(var(--v-theme-error));
}
.information.entry {
  border-top: 4px solid rgba(var(--v-theme-success));
}
.information.liquid {
  border-top: 4px solid rgba(var(--v-theme-warning));
}
</style>
