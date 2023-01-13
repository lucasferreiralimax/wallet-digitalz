<script setup lang="ts">
import { ref } from 'vue'
import { useWalletStore } from '@/stores/wallet'

const props = defineProps<{ register?: any }>()
const dialog = ref<boolean>(false)
const wallet = useWalletStore()
</script>

<template>
  <v-dialog
    v-model="dialog"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        color="error"
        size="x-small"
        class="mr-2"
        icon="mdi-delete"
        v-bind="props"
      />
    </template>
    <v-card class="mx-auto pa-4" max-width="600" width="100%">
      <v-card-title>
        <span class="text-h5">Delete register</span>
      </v-card-title>
      <v-card-text>
        Do you want delete this {{ register.name }} register?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          variant="text"
          @click="dialog = false"
        >
          <v-icon class="mr-2" icon="mdi-cancel" />
          Cancel
        </v-btn>
        <v-btn
          color="success"
          variant="flat"
          @click="wallet.deleteRegister(register.id)"
        >
          <v-icon class="mr-2" icon="mdi-check" />
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
