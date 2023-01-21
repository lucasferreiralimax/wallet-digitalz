<script setup lang="ts">
import { ref, watch  } from 'vue'
import { useWalletStore } from '@/stores/wallet'
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
    <div v-if="wallet.getTotal" class="mb-4">
      <v-row>
        <v-col>
          <v-card class="information money d-flex flex-column text-uppercase pa-4" v-if="wallet.getEntryTotal">
            <span class="text-success text-caption text-uppercase font-weight-bold">{{ $t('home.money') }}</span>
            <b class="mr-2 text-h5">{{ parseMoney(wallet.getTotal, locale) }}</b>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="information liquid d-flex flex-column text-uppercase pa-4" v-if="wallet.getExpensesTotal">
            <span class="text-warning text-caption text-uppercase font-weight-bold">{{ $t('home.liquid') }}</span>
            <b class="text-h5 mr-2">{{ parseMoney(wallet.getTotalLessExpense, locale) }}</b>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="information money d-flex flex-column text-uppercase pa-4">
            <span class="text-light-green text-caption text-uppercase font-weight-bold">{{ $t('register.form.entry') }}</span>
            <b class="text-h6 mr-2">{{ parseMoney(wallet.getEntryTotal, locale) }}</b>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="information expense d-flex flex-column text-uppercase pa-4" v-if="wallet.getExpensesTotal">
            <span class="text-error text-caption text-uppercase font-weight-bold">{{ $t('register.form.expense') }}</span>
            <b class="mr-2 text-h6">{{ parseMoney(wallet.getExpensesTotal, locale) }}</b>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="information investiment d-flex flex-column text-uppercase pa-4" v-if="wallet.getInvestimentTotal">
            <span class="text-info text-caption text-uppercase font-weight-bold">{{ $t('register.form.investiment') }}</span>
            <b class="mr-2 text-h6">{{ parseMoney(wallet.getInvestimentTotal, locale) }}</b>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-divider />
    <div class="d-flex align-start mb-4 mt-2">
      <h3>Listagem de registros</h3>
      <v-btn
        v-if="wallet.registers.length"
        class="ml-auto"
        @click="changeView"
        size="x-small"
        icon
        :aria-label="!panelChangeView ? $t('actions.expand') : $t('actions.compact')"
      >
        <v-tooltip
          activator="parent"
          location="left"
        >
          {{ !panelChangeView ? $t('actions.expand') : $t('actions.compact') }}
        </v-tooltip>
        <v-icon :icon="!panelChangeView ? 'mdi-arrow-expand-vertical' : 'mdi-arrow-collapse-vertical'"/>
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
  </div>
</template>

<style scoped>
.text-value {
  position: absolute;
  right: 35px;
  transform: translateY(1px);
}
.register.info, .information.investiment {
  box-shadow: inset 2px 0 0 rgba(var(--v-theme-info));
}
.register.error, .information.expense {
  box-shadow: inset 2px 0 0 rgba(var(--v-theme-error));
}
.register.success, .information.money {
  box-shadow: inset 2px 0 0 rgba(var(--v-theme-success));
}
.information.liquid {
  box-shadow: inset 2px 0 0 rgba(var(--v-theme-warning));
}
</style>
