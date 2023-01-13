<script setup lang="ts">
import { ref } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import NewRegister from '@/components/NewRegister/index.vue'

const wallet = useWalletStore()
const panel = ref<any[]>([])
const panelChangeView = ref<boolean>(false)

function changeView() {
  panel.value = !panelChangeView.value ? wallet.getIds : []
  panelChangeView.value = !panelChangeView.value;
}
</script>

<template>
  <div>
    <div class="text-center d-flex pb-4">
      <NewRegister />
      <v-btn v-if="wallet.registers.length" class="ma-2" @click="changeView">
        <template v-if="!panelChangeView">
          <v-icon class="icon" icon="mdi-arrow-expand-vertical" />
          Expand All
        </template>
        <template v-else>
          <v-icon class="icon" icon="mdi-arrow-collapse-vertical" />
          Compact All
        </template>
      </v-btn>
    </div>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel v-for="item of wallet.registers" :key="item.id" :value="item.id">
        <v-expansion-panel-title>
          {{ item.name }} <span class="text-green pl-2">${{ Number(item.value).toFixed(2) }}</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <NewRegister update :register="item" />
          <v-btn color="error" size="x-small" class="mr-2 float-right" icon="mdi-delete"
            @click="wallet.deleteRegister(item.id)" />
          <p class="pt-2">{{ item.description }}</p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-if="wallet.getTotal" class="d-flex pa-4">
      <h2>
        Total <b class="text-green">${{ Number(wallet.getTotal).toFixed(2) }}</b>
      </h2>
    </div>
  </div>
</template>

<style scoped>
.icon {
  margin-right: .5rem;
}
</style>
