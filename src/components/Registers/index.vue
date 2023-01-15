<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import ModalRegister from '@/components/ModalRegister/index.vue'
import ModalDelete from '@/components/ModalDelete/index.vue'
import { RegisterIds } from '@/types'

const wallet = useWalletStore()
const panel = ref<RegisterIds[]>([])
const panelChangeView = ref<boolean>(false)

function changeView() {
  panel.value = !panelChangeView.value ? wallet.getIds : []
  panelChangeView.value = !panelChangeView.value;
}

watch(panel, (newPanel) => {
  if (newPanel == undefined) panelChangeView.value = false
})

const typeColors: any = {
  'investiment': 'text-green',
  'expense': 'text-red',
  'entry': 'text-blue'
}
</script>

<template>
  <div>
    <div class="text-center d-flex pb-4">
      <ModalRegister />
      <v-btn v-if="wallet.registers.length" class="ma-2" @click="changeView">
        <template v-if="!panelChangeView">
          <v-icon class="mr-2" icon="mdi-arrow-expand-vertical" />
          {{ $t('actions.expand') }}
        </template>
        <template v-else>
          <v-icon class="mr-2" icon="mdi-arrow-collapse-vertical" />
          {{ $t('actions.compact') }}
        </template>
      </v-btn>
    </div>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel v-for="item of wallet.registers" :key="item.id" :value="item.id">
        <v-expansion-panel-title>
          <span class="mr-4 font-weight-bold" :class="[typeColors[item.type.value]]">&#9670;</span>
          {{ $t(`register.form.${item.type.value}`) }} &#x2022; {{ item.name }}
          <span class="text-value pl-2 font-weight-bold" :class="[typeColors[item.type.value]]">
            ${{ Number(item.value).toFixed(2) }}
          </span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <pre class="pt-2 font-weight-regular text-body-1 overflow-x-auto">{{ item.description }}</pre>
          <v-col class="d-flex justify-end pa-0 mt-2" width="100%">
            <ModalDelete :register="item" />
            <ModalRegister update :register="item" />
          </v-col>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-if="wallet.getTotal" class="d-flex pa-4 justify-end flex-column">
      <p class="d-flex align-center justify-end text-uppercase" v-if="wallet.getExpensesTotal">
        <b class="text-red mr-2">${{ Number(wallet.getExpensesTotal).toFixed(2) }}</b> <span class="text-caption text-uppercase">{{ $t('home.expense') }}</span>
      </p>
      <p class="d-flex align-center justify-end text-uppercase">
        <b class="text-green text-h4 mr-2">${{ Number(wallet.getTotal).toFixed(2) }}</b> {{ $t('home.money') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.text-value {
  position: absolute;
  right: 60px;
}
</style>
