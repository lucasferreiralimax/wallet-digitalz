<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet'
import Registers from '@/components/Registers/index.vue'

const wallet = useWalletStore()
</script>

<template>
  <Registers v-if="wallet.registers.length" />
  <template v-else>
    <h2>{{ $t('home.lets') }}</h2>
    <p>{{ $t('home.about') }}</p>
    <v-divider class="divider my-2" />
  </template>
</template>
