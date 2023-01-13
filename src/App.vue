<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderApp from '@/components/HeaderApp/index.vue'
import Panels from '@/components/Panels/index.vue'

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
      <v-container
        class="d-flex justify-space-between"
        max-width="1200"
      >
        <HeaderApp title="Wallet Digital" />
        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="toggleTheme"
        >{{ theme }}</v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <h2>Let's go</h2>
        <p>This application for manager your money and investiments</p>
        <v-divider class="divider"></v-divider>
        <Panels />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.divider {
  margin: 1rem 0;
}
</style>
