<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SUPPORT_LOCALES as supportLocales, setI18nLanguage } from '@/i18n'

const { locale } = useI18n({ useScope: 'global' });

watch(locale, (val) => {
  setI18nLanguage(val)
})
</script>

<template>
  <v-select
    label="Language"
    class="ma-0"
    v-model="locale"
    single-line
    :items="[...supportLocales]"
    density="compact"
    variant="solo"
    hide-details="auto"
  />
</template>
