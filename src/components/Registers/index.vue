<script setup lang="ts">
import { ref } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import ModalRegister from '@/components/ModalRegister/index.vue'
import ModalDelete from '@/components/ModalDelete/index.vue'

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
      <ModalRegister />
      <v-btn v-if="wallet.registers.length" class="ma-2" @click="changeView">
        <template v-if="!panelChangeView">
          <v-icon class="mr-2" icon="mdi-arrow-expand-vertical" />
          Expand All
        </template>
        <template v-else>
          <v-icon class="mr-2" icon="mdi-arrow-collapse-vertical" />
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
          <pre class="pt-2">{{ item.description }}</pre>
          <v-col class="d-flex justify-end pa-0 mt-2" width="100%">
            <ModalDelete :register="item" />
            <ModalRegister update :register="item" />
          </v-col>
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
