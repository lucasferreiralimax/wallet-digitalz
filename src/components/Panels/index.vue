<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import NewRegister from '@/components/NewRegister/index.vue'

const wallet = useWalletStore()
const panel = ref<any[]>([])
const panelChangeView = ref<boolean>(false)
const walletPanels = ref(wallet.registers.map((item) => item.id))

watch(wallet, () => {
  walletPanels.value = wallet.registers.map((item) => item.id)
})

function changeView() {
  panel.value = !panelChangeView.value ? walletPanels.value : []
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
          {{ item.name }} - {{ item.value }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          {{ item.description }}
          <v-btn color="error" size="x-small" class="float-right" icon="mdi-delete"
            @click="wallet.deleteRegister(item.id)" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped>
.icon {
  margin-right: .5rem;
}
</style>
