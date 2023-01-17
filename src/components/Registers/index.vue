<script setup lang="ts">
import { ref, watch  } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import ModalRegister from '@/components/ModalRegister/index.vue'
import ModalDelete from '@/components/ModalDelete/index.vue'
import { RegisterIds } from '@/types'
import { parseMoney } from '@/utils'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n();

const wallet = useWalletStore()
const panel = ref<RegisterIds[]>([])
const panelChangeView = ref<boolean>(false)

function changeView() {
  panel.value = !panelChangeView.value ? wallet.getIds : []
  panelChangeView.value = !panelChangeView.value;
}

watch(panel, (newPanel) => {
  if (panelChangeView.value && !newPanel.length) panelChangeView.value = false
})

const typeColors: any = {
  investiment: 'info',
  expense: 'error',
  entry: 'success'
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
    <v-expansion-panels v-model="panel" :multiple="panelChangeView">
      <v-expansion-panel
        v-for="item of wallet.getRegisters"
        :key="item.id"
        :value="item.id"
        class="register"
        :class="[`${typeColors[item.type.value]}`]"
      >
        <v-expansion-panel-title class="pl-4 pr-2">
          <span
            class="d-none d-sm-flex mr-2 font-weight-bold"
            :class="[`text-${typeColors[item.type.value]}`]"
          >
            &#9670;
          </span>
          <span
            class="mr-2 font-weight-bold"
            :class="[`text-${typeColors[item.type.value]}`]"
          >
            {{ $t(`register.form.${item.type.value}`) }}
          </span>
          <span class="text-capitalize">{{ item.name }}</span>
          <span
            class="text-value pl-2 font-weight-bold"
            :class="[`text-${typeColors[item.type.value]}`]"
          >
            {{ parseMoney(item.value, locale) }}
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
        <b class="text-error mr-2">{{ parseMoney(wallet.getExpensesTotal, locale) }}</b>
        <span class="text-caption text-uppercase">{{ $t('register.form.expense') }}</span>
      </p>
      <p class="d-flex align-center justify-end text-uppercase" v-if="wallet.getEntryTotal">
        <b class="text-success mr-2">{{ parseMoney(wallet.getEntryTotal, locale) }}</b>
        <span class="text-caption text-uppercase">{{ $t('register.form.entry') }}</span>
      </p>
      <p class="d-flex align-center justify-end text-uppercase" v-if="wallet.getInvestimentTotal">
        <b class="text-info mr-2">{{ parseMoney(wallet.getInvestimentTotal, locale) }}</b>
        <span class="text-caption text-uppercase">{{ $t('register.form.investiment') }}</span>
      </p>
      <p class="d-flex align-center justify-end text-uppercase" v-if="wallet.getExpensesTotal">
        <b class="text-amber-darken-2 text-h5 mr-2">{{ parseMoney(wallet.getTotalLessExpense, locale) }}</b>
        {{ $t('home.liquid') }}
      </p>
      <p class="d-flex align-center justify-end text-uppercase">
        <b class="text-light-green text-h4 mr-2">{{ parseMoney(wallet.getTotal, locale) }}</b>
        {{ $t('home.money') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.text-value {
  position: absolute;
  right: 35px;
  transform: translateY(1px);
}
.register.info {
  box-shadow: inset 2px 0 0 rgba(var(--v-theme-info));
}
.register.error {
  box-shadow: inset 2px 0 0 rgba(var(--v-theme-error));
}
.register.success {
  box-shadow: inset 2px 0 0 rgba(var(--v-theme-success));
}
</style>
