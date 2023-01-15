<script setup lang="ts">
import { ref } from 'vue'
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
          {{ item.name }} {{ $t(`register.form.${item.type.value}`) }}
          <span class="pl-2" :class="[typeColors[item.type.value]]">
            ${{ Number(item.value).toFixed(2) }}
          </span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <pre class="pt-2 font-weight-regular">{{ item.description }}</pre>
          <v-col class="d-flex justify-end pa-0 mt-2" width="100%">
            <ModalDelete :register="item" />
            <ModalRegister update :register="item" />
          </v-col>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-if="wallet.getTotal" class="d-flex pa-4">
      <h2 class="mr-2">
        {{ $t('home.total') }} <b class="text-green">${{ Number(wallet.getTotal).toFixed(2) }}</b>
      </h2>
      <p class="mt-2" v-if="wallet.getExpensesTotal">
        {{ $t('home.totalExpense') }}: <b class="text-red">${{ Number(wallet.getExpensesTotal).toFixed(2) }}</b>
      </p>
    </div>
  </div>
</template>
