<script setup lang="ts">
import { useWalletStore } from '@/stores/wallet'
import { parseMoney } from '@/utils'
import { useI18n } from 'vue-i18n'
import Information from '@/components/Information/index.vue'

const { locale } = useI18n()
const wallet = useWalletStore()
</script>

<template>
  <v-row>
    <v-col v-if="wallet.getEntryTotal">
      <Information
        :title="$t('home.money')"
        :value="parseMoney(wallet.getTotal, locale)"
        type="entry"
      />
    </v-col>
    <v-col v-if="wallet.getExpensesTotal">
      <Information
        :title="$t('home.liquid')"
        :value="parseMoney(wallet.getTotalLessExpense, locale)"
        type="liquid"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="wallet.getEntryTotal">
      <Information
        :title="$t('register.form.entry')"
        :value="parseMoney(wallet.getEntryTotal, locale)"
        type="entry"
      />
    </v-col>
    <v-col v-if="wallet.getExpensesTotal">
      <Information
        :title="$t('register.form.expense')"
        :value="parseMoney(wallet.getExpensesTotal, locale)"
        type="expense"
      />
    </v-col>
    <v-col v-if="wallet.getInvestimentTotal">
      <Information
        :title="$t('register.form.investiment')"
        :value="parseMoney(wallet.getInvestimentTotal, locale)"
        type="investiment"
      />
    </v-col>
  </v-row>
</template>
