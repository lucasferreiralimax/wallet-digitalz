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
    <v-col>
      <Information
        v-if="wallet.getEntryTotal"
        :title="$t('home.money')"
        :value="parseMoney(wallet.getTotal, locale)"
        type="entry"
      />
    </v-col>
    <v-col>
      <Information
        v-if="wallet.getExpensesTotal"
        :title="$t('home.liquid')"
        :value="parseMoney(wallet.getTotalLessExpense, locale)"
        type="liquid"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <Information
        v-if="wallet.getEntryTotal"
        :title="$t('register.form.entry')"
        :value="parseMoney(wallet.getEntryTotal, locale)"
        type="entry"
      />
    </v-col>
    <v-col>
      <Information
        v-if="wallet.getExpensesTotal"
        :title="$t('register.form.expense')"
        :value="parseMoney(wallet.getExpensesTotal, locale)"
        type="expense"
      />
    </v-col>
    <v-col>
      <Information
        v-if="wallet.getInvestimentTotal"
        :title="$t('register.form.investiment')"
        :value="parseMoney(wallet.getInvestimentTotal, locale)"
        type="investiment"
      />
    </v-col>
  </v-row>
</template>
