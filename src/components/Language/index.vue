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
  <div class="app-language mr-2">
    <v-select
      append-inner-icon=""
      v-model="locale"
      single-line
      :items="[...supportLocales]"
      density="compact"
      variant="underlined"
    />
  </div>
</template>

<style>
.app-language {
  width: 50px;
  height: 35px;
  transform: translateY(-10px);
}
</style>
