<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Registers from '@/components/Registers/index.vue'
import Language from '@/components/Language/index.vue'

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
      <v-container class="d-flex justify-space-between">
        <h1><v-icon class="mr-2" icon="mdi-wallet" />Wallet Digitalz</h1>
        <v-spacer></v-spacer>
        <Language />
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="toggleTheme"
        >{{ theme }}</v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <h2>{{ $t('home.lets') }}</h2>
        <p>{{ $t('home.about') }}</p>
        <v-divider class="divider my-2"></v-divider>
        <Registers />
      </v-container>
    </v-main>
  </v-app>
</template>
