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
  if (xs.value) {
    drawer.value = false;
  }

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
      :rail-width="xs ? '150' : '220'"
      :floating="!xs"
      :permanent="!xs"
      :temporary="xs"
    >
      <v-list class="py-0">
        <router-link class="nav-item" to="/">{{ $t('nav.home') }}</router-link>
        <v-divider />
        <router-link class="nav-item" to="/about">{{ $t('nav.about') }}</router-link>
        <v-divider />
        <router-link class="nav-item" to="/contact">{{ $t('nav.contact') }}</router-link>
        <v-divider />
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
      </v-list>
      <v-divider />
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
.nav-item {
  text-decoration: none;
  width: 100%;
  display: flex;
  padding: .8rem .5rem;
  color: rgba(var(--v-theme-on-surface));
  justify-content: center;
}
.nav-item.router-link-exact-active {
  background: rgba(var(--v-theme-main));
  color: rgba(var(--v-theme-success));
}
.main {
  background: rgba(var(--v-theme-main));
}
</style>
