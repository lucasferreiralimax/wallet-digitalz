<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import Registers from '@/components/Registers/index.vue'
import Language from '@/components/Language/index.vue'

const wallet = useWalletStore()
const theme = ref('light')
const drawer = ref(false)

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
      <v-container class="max-width d-flex justify-space-between">
        <h1><v-icon class="mr-2" icon="mdi-wallet" />Wallet Digitalz</h1>
        <v-spacer></v-spacer>
        <v-btn @click.stop="drawer = !drawer" size="x-small" :icon="drawer ? 'mdi-close' : 'mdi-menu'" />
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="right"
      rail
      rail-width="150"
      temporary
    >
      <v-list-item>
        <Language />
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-btn
          block
          :prepend-icon="theme === 'light' ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off'"
          @click="toggleTheme"
        >{{ theme }}</v-btn>
      </v-list-item>
      <v-divider />
    </v-navigation-drawer>

    <v-main class="main">
      <v-container class="max-width">
        <template v-if="!wallet.registers.length">
          <h2>{{ $t('home.lets') }}</h2>
          <p>{{ $t('home.about') }}</p>
          <v-divider class="divider my-2" />
        </template>
        <Registers />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.max-width {
  max-width: 700px;
}
.main {
  background: rgba(var(--v-theme-main));
}
</style>
