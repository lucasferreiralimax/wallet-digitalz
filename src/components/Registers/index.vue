<script setup lang="ts">
import { ref, watch  } from 'vue'
import { useWalletStore } from '@/stores/wallet'
import ModalDelete from '@/components/ModalDelete/index.vue'
import ModalRegister from '@/components/ModalRegister/index.vue'
import InfoCards from '@/components/InfoCards/index.vue'
import { RegisterIds } from '@/types'
import { parseMoney } from '@/utils'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
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
  entry: 'success',
}
</script>

<template>
  <InfoCards v-if="wallet.getTotal" class="mb-4" />
  <div
    v-if="wallet.registers.length"
    class="d-flex align-start mb-4 mt-8"
  >
    <h3>{{ $t('home.list') }}</h3>
    <v-btn
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
          <v-icon v-if="item.type.value == 'entry'" icon="mdi-arrow-right" />
          <v-icon v-if="item.type.value == 'investiment'" icon="mdi-timelapse" />
          <v-icon v-if="item.type.value == 'expense'" icon="mdi-arrow-left" />
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
