<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderApp from './components/HeaderApp/index.vue'

const theme = ref('light')

function setTheme (value: string) {
  localStorage.setItem('theme', value)
  document.querySelector('body')?.classList.remove('light')
  document.querySelector('body')?.classList.remove('dark')
  document.querySelector('body')?.classList.add(value)
}

function toggleTheme () {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setTheme(theme.value)
}

onMounted(() => {
  theme.value = localStorage.getItem('theme') ? String(localStorage.getItem('theme')) : 'light';
  setTheme(theme.value)
})
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar>
      <HeaderApp class="header-app" title="Wallet Digital" />
      <v-spacer></v-spacer>
      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="toggleTheme"
      >{{ theme }}</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>This application for manager your money and investiments</v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.header-app {
  margin-left: 1rem;
}
</style>
