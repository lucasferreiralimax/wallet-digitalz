<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet'
import Registers from '@/components/Registers/index.vue'

const wallet = useWalletStore()
</script>

<template>
   <template v-if="!wallet.registers.length">
      <h2>{{ $t('home.lets') }}</h2>
      <p>{{ $t('home.about') }}</p>
      <v-divider class="divider my-2" />
    </template>
    <Registers />
</template>
