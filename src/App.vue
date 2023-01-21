<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Language from '@/components/Language/index.vue'
import Logo from '@/components/Logo/index.vue'
import ModalRegister from '@/components/ModalRegister/index.vue'
import Footer from '@/components/Footer/index.vue'
import { useDisplay } from 'vuetify'

const theme = ref('light')
const drawer = ref(true)
const { xs } = useDisplay()

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
  if (xs.value) drawer.value = false;
  theme.value = localStorage.getItem('theme') ? String(localStorage.getItem('theme')) : 'light';
  setTheme(theme.value)
})
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar>
      <v-btn
        v-if="xs"
        role="button"
        aria-label="Button menu drawer"
        @click.stop="drawer = !drawer"
        size="x-xsall"
        :icon="drawer ? 'mdi-close' : 'mdi-menu'"
      />
      <router-link to="/" class="logo ml-4">
        <h1 class="d-flex"><Logo  class="mr-2"/>Wallet Digitalz</h1>
      </router-link>
      <v-spacer />
      <ModalRegister />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      class="elevation-5"
      location="left"
      rail
      rail-width="220"
      :floating="!xs"
      :permanent="!xs"
      :temporary="xs"
    >
      <v-list class="pa-0">
        <v-list-item router-link to="/" prepend-icon="mdi-home">
          {{ $t('nav.home') }}
        </v-list-item>
        <v-divider />
        <v-list-item router-link to="/about" prepend-icon="mdi-information-variant">
          {{ $t('nav.about') }}
        </v-list-item>
        <v-divider />
        <v-list-item router-link to="/contact" prepend-icon="mdi-earth">
          {{ $t('nav.contact') }}
        </v-list-item>
        <v-divider />
      </v-list>
      <template v-slot:append>
        <v-list-item class="mb-4">
          <Language />
        </v-list-item>
        <v-divider />
        <v-list-item
          class="mb-4"
          @click="toggleTheme"
          :prepend-icon="theme === 'light' ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off'"
        >
          <span class="text-capitalize">{{ theme }}</span>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-main class="main">
      <div class="pa-sm-10 pa-4 pt-6">
        <router-view />
      </div>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<style scoped>
.logo {
  text-decoration: none;
  color: rgba(var(--v-theme-on-surface));
}
.logo.router-link-exact-active {
  pointer-events: none;
}
.main {
  background: rgba(var(--v-theme-main));
}
</style>
